import { type SchemaTypeDefinition } from 'sanity'
import { lawn } from "./lawn"
import { embroided } from './embroided'
import { chickenKari } from './chickenKari'
import { khaddar } from './Khaddar'
import { linen } from './linen'
import { cotton } from './cotton'
import { bedsheet } from './Bedsheet'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [lawn, cotton, khaddar, embroided, chickenKari, linen, bedsheet],
}
