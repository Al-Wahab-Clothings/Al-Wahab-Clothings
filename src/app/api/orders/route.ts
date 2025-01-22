import { ordersTable, db } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

// GET API to fetch orders (optionally filtered by user_id)
export async function GET(req: NextRequest) {
    let url = req.nextUrl.searchParams;

    try {
        if (url.has("user_id")) {
            const allOrdersData = await db.select().from(ordersTable).where(eq(ordersTable.user_id, url.get("user_id") as string));
            return NextResponse.json({ allOrdersData });
        } else {
            // If no filter, return all orders
            const allOrdersData = await db.select().from(ordersTable);
            return NextResponse.json({ allOrdersData });
        }
    } catch (error) {
        console.log("error:", (error as { message: string }).message);
        return NextResponse.json({ error });
    }
}

// POST API to create or update an order
export async function POST(request: NextRequest) {
    const req = await request.json();

    try {
        let res;
        if (req.status === "pending") {
            // Handle order creation when status is 'pending'
            const existingOrder = await db.select()
                .from(ordersTable)
                .where(and(
                    eq(ordersTable.user_id, req.user_id),
                    eq(ordersTable.product_id, req.product_id),
                    eq(ordersTable.status, req.status)
                ))
                .then(result => result[0]); // Get the first item from the result array

            if (existingOrder) {
                // Update the quantity if the product already exists in the pending order
                res = await db.update(ordersTable)
                    .set({ quantity: existingOrder.quantity + (req.quantity || 1) })
                    .where(and(
                        eq(ordersTable.user_id, req.user_id),
                        eq(ordersTable.product_id, req.product_id),
                        eq(ordersTable.status, req.status)
                    ))
                    .returning();
            } else {
                // Insert a new order entry with 'pending' status
                res = await db.insert(ordersTable).values({
                    product_id: req.product_id,
                    quantity: req.quantity || 1,
                    user_id: req.user_id,
                    username: req.username,
                    status: req.status || "pending" // Default status for new orders
                }).returning();
            }
        } else if (req.status === "paid") {
            // Handle updating the status to 'paid'
            res = await db.update(ordersTable)
                .set({ status: "paid" })
                .where(eq(ordersTable.id, req.orderId))
                .returning();
        }

        return NextResponse.json({ res });
    } catch (error) {
        console.log("error:", (error as { message: string }).message);
        return NextResponse.json({ error });
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

// PUT API to update the order details (like quantity or status)
export async function PUT(request: NextRequest) {
    const req = await request.json();

    try {
        let updateData: any = {};

        if (req.quantity) {
            updateData.quantity = req.quantity;
        }

        if (req.status) {
            updateData.status = req.status;
        }

        // Update the order based on user_id and product_id (can also include order_id for more specific updates)
        const response = await db.update(ordersTable)
            .set(updateData)
            .where(and(
                eq(ordersTable.user_id, req.user_id),
                eq(ordersTable.product_id, req.product_id)
            ))
            .returning();

        return NextResponse.json({ response });

    } catch (error) {
        console.log("Error during PUT operation:", (error as { message: string }).message);
        return NextResponse.json({ error: (error as { message: string }).message }, { status: 500 });
    }
}