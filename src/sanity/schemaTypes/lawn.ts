import { defineType } from "sanity"

export const lawn = defineType({
    name: "lawn",
    type: "document",
    title: "Lawn",
    fields: [
        {
            name: "id",
            type: "string",
            title: "ID (Must be Unique)",
        },
        {
            name: "title",
            type: "string",
            title: "Title",
        },
        {
            name: "isNew",
            type: "boolean",
            title: "Is New",
        },
        {
            name: "isTrending",
            type: "boolean",
            title: "Is Trending",
        },
        {
            name: "oldPrice",
            type: "number",
            title: "Old Price",
        },
        {
            name: "price",
            type: "number",
            title: "Product Price",
        },
        {
            name: "brand",
            type: "string",
            title: "Product Brand",
        },
        {
            name: "rating",
            type: "number",
            title: "Rating",
        },
        {
            name: "quantity",
            type: "number",
            title: "Quantity",
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [
                {
                    type: 'block',
                    marks: {
                        decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
                    },
                    styles: [{ title: 'Normal', value: 'normal' }],
                },
            ],
        },
        {
            name: "image",
            type: "image",
            title: "Product Image",
        },
    ]
})