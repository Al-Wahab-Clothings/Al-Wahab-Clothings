import { defineType, defineField } from "sanity"

export const product = defineType({
    name: "product",
    type: "document",
    title: "Product",
    fields: [
        {
            name: "id",
            type: "number",
            title: "ID",
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
        defineField({
            name: "category",
            type: "reference",
            title: "Product Category",
            to: [{ type: "category" }],
          }),
        defineField({
            name: "brand",
            type: "reference",
            title: "Product Brand",
            to: [{ type: "brand" }],
          }),
    ]
})