import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import { productSchema } from './product2'
import { categorySchema } from './categories'

// productSchema
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,productSchema,categorySchema],
}
