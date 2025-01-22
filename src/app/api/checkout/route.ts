import { NextResponse, NextRequest } from "next/server";
import { Product } from "../../../type";
import Stripe from "stripe";
import { urlForImage } from "@/sanity/lib/image";

export const POST = async (request: NextRequest) => {
    // @ts-ignore
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    try {
        const reqBody = await request.json();
        const { items, email } = await reqBody;

        const extractingItems = await items.map((item: Product) => ({
            quantity: item.quantity,
            price_data: {
                currency: "PKR",
                unit_amount: item.price * 100,
                product_data: {
                    name: item.title,
                    images: [urlForImage(item.image).url()],
                },
            },
        }));

        // Add shipping cost as a separate line item
        const shippingLineItem = {
            quantity: 1,
            price_data: {
                currency: "PKR",
                unit_amount: 200 * 100, // Shipping cost in cents
                product_data: {
                    name: "Shipping",
                    description: "Standard shipping cost",
                },
            },
        };

        // Combine the product line items and shipping line item
        const allLineItems = [...extractingItems, shippingLineItem];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: allLineItems,
            mode: "payment",
            success_url: `${process.env.NEXTAUTH_URL}/success`,
            cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
            metadata: {
                email,
            },
        });

        return NextResponse.json({
            message: "Connection is Active!",
            success: true,
            id: session.id,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};