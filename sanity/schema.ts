import { type SchemaTypeDefinition } from 'sanity'
import { product } from "./Product"
import { category } from './category'
import { brand } from './brand'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, brand],
}
