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

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql)

export const getExampleTable = async () => {
    const selectResult = await db.select().from(cartTable)
    console.log ("Results", selectResult)
}