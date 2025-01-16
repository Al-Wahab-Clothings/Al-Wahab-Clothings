import { defineType, defineField } from "sanity"

export const brand = defineType({
    name: "brand",
    type: "document",
    title: "Brand",
    fields: [
        defineField(
        {
            name: "name",
            type: "string",
            title: "Brand Name",
        })
    ]
})