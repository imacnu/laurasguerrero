import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(2, 'Nombre muy corto').max(200),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Slug solo puede contener letras minúsculas, números y guiones'),
  description: z.string().optional(),
  price: z.number().positive('El precio debe ser mayor que 0'),
  images: z.array(z.string().url()).min(1, 'Al menos una imagen es requerida'),
  stock: z.number().int().min(0),
  category_id: z.string().uuid().nullable(),
  material: z.string().optional(),
  collection_id: z.string().uuid().nullable(),
  featured: z.boolean(),
})

export type ProductInput = z.infer<typeof productSchema>
