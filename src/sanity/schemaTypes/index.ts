import { type SchemaTypeDefinition } from 'sanity'
import { lawn } from "./lawn"
import { embroided } from './embroided'
import { chickenKari } from './chickenKari'
import { khaddar } from './Khaddar'
import { linen } from './linen'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [lawn, embroided, linen, chickenKari, khaddar],
}
