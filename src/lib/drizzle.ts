import { pgTable, varchar, integer, serial } from "drizzle-orm/pg-core"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless";

export const cartTable = pgTable("cart", {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", {
        length: 255
    }).notNull(),
    username: varchar("username", {
        length: 255
    }),
    product_id: varchar("product_id", {
        length: 255
    }).notNull(),
    quantity: integer("quantity").notNull()
})

// Define the orders table
export const ordersTable = pgTable("orders", {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", {
        length: 255
    }).notNull(),
    username: varchar("username", {
        length: 255
    }),
    product_id: varchar("product_id", {
        length: 255
    }).notNull(), // Product ID
    quantity: integer("quantity").notNull(),
    status: varchar("status", {
        length: 50
    }).default("pending").notNull() // Order status: "pending" or "paid"
});

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql)

export const getExampleTable = async () => {
    const selectResult = await db.select().from(cartTable)
    console.log("Results", selectResult)
}

// Example function to fetch all orders
export const getOrders = async () => {
    const selectResult = await db.select().from(ordersTable);
    console.log("Orders:", selectResult);
};

// // Example of database interaction function
// export const updateOrderStatus = async (orderId: string, status: string) => {
//     try {
//       // Assuming you are using Neon HTTP database client
//       const db = new NeonHttpDatabase<Record<string, never>>(); // Ensure the proper initialization here
  
//       // Query the 'orders' table to update the status
//       const response = await db
//         .table("orders")
//         .update({ status }) 
//         .where("orderId", orderId) 
//         .execute(); 
  
//       return response;
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       throw new Error("Unable to update order status.");
//     }
//   };