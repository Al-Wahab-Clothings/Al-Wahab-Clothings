import { ordersTable, db } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

// GET API to fetch orders (optionally filtered by user_id)
export async function GET(req: NextRequest) {
    let url = req.nextUrl.searchParams;

    try {
        if (url.has("user_id")) {
            const userId = url.get("user_id");
            console.log("Fetching orders for user_id:", userId);

            const allOrdersData = await db.select()
                .from(ordersTable)
                .where(eq(ordersTable.user_id, userId as string));

            console.log("Fetched orders:", allOrdersData); // Log the data

            return NextResponse.json({ allOrdersData });
        } else {
            // Fetch all orders if no filter
            const allOrdersData = await db.select().from(ordersTable);
            console.log("Fetched all orders:", allOrdersData); // Log the data
            return NextResponse.json({ allOrdersData });
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders." }, { status: 500 });
    }
}

// POST API to create or update an order
export async function POST(request: NextRequest) {
    const req = await request.json();

    console.log("Received request data:", req); // Log the request to see the incoming data

    try {
        const results = [];

        for (const item of req.items) {
            const existingOrder = await db.select()
                .from(ordersTable)
                .where(and(
                    eq(ordersTable.user_id, req.user_id),
                    eq(ordersTable.product_id, item.product_id) // Use only user_id and product_id to identify the order
                ))
                .then(result => result[0]); // Get the first item from the result array

            let res;

            if (existingOrder) {
                // Update the quantity for the existing product in the order
                res = await db.update(ordersTable)
                    .set({
                        quantity: existingOrder.quantity + (item.quantity || 1), // Increment quantity
                    })
                    .where(and(
                        eq(ordersTable.user_id, req.user_id),
                        eq(ordersTable.product_id, item.product_id) // Update based on user_id and product_id
                    ))
                    .returning();
            } else {
                // Insert a new order entry
                res = await db.insert(ordersTable).values({
                    product_id: item.product_id,
                    title: item.title || "Untitled", // Ensure a default title if none is provided
                    quantity: item.quantity || 1, // Default quantity to 1
                    unit_price: item.price, // Use the price from the request
                    user_id: req.user_id,
                    username: req.username,
                    payment: req.payment || "COD" // Default to Cash on Delivery (COD)
                }).returning();
            }

            results.push(res);
        }

        return NextResponse.json({ results });
    } catch (error) {
        console.error("Error in POST API:", error);
        return NextResponse.json({ error: "error"}, { status: 500 });
    }
}



// DELETE API to delete an order (specific or all by user_id)
export async function DELETE(request: NextRequest) {
    const req = await request.json();

    try {
        let response;
        if (req.order_id) {
            // Delete a specific order by order_id
            response = await db.delete(ordersTable)
                .where(and(
                    eq(ordersTable.id, req.order_id),
                    eq(ordersTable.user_id, req.user_id)
                ))
                .returning();
        } else {
            // Delete all orders for the user
            response = await db.delete(ordersTable)
                .where(eq(ordersTable.user_id, req.user_id))
                .returning();
        }

        return NextResponse.json({ response });

    } catch (error) {
        console.log("error:", (error as { message: string }).message);
        return NextResponse.json({ error: (error as { message: string }).message }, { status: 500 });
    }
}
