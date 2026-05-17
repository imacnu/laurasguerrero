'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'
import { productSchema, type ProductInput } from '@/lib/validations/product'
import { slugify } from '@/lib/utils'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import type { Product, Category, Collection } from '@/types/product'

interface ProductFormProps {
  product?: Product
  categories: Category[]
  collections: Collection[]
}

export default function ProductForm({ product, categories, collections }: ProductFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const isEdit = !!product

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          description: product.description ?? '',
          price: product.price,
          images: product.images,
          stock: product.stock,
          category_id: product.category_id,
          material: product.material ?? '',
          collection_id: product.collection_id,
          featured: product.featured,
        }
      : {
          name: '',
          slug: '',
          description: '',
          price: 0,
          images: [] as string[],
          stock: 0,
          featured: false,
          material: '',
          category_id: null as string | null,
          collection_id: null as string | null,
        },
  })

  const name = watch('name')

  function autoSlug() {
    if (!isEdit && name) {
      setValue('slug', slugify(name))
    }
  }

  async function onSubmit(data: ProductInput) {
    if (isEdit) {
      const { error } = await supabase
        .from('products')
        .update(data)
        .eq('id', product!.id)

      if (error) { toast.error('Error al actualizar'); return }
      toast.success('Producto actualizado')
    } else {
      const { error } = await supabase.from('products').insert(data)
      if (error) { toast.error('Error al crear el producto'); return }
      toast.success('Producto creado')
    }

    router.push('/admin/products')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        {...register('name')}
        id="name"
        label="Nombre"
        onBlur={autoSlug}
        error={errors.name?.message}
      />
      <Input
        {...register('slug')}
        id="slug"
        label="Slug"
        error={errors.slug?.message}
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-xs tracking-widest uppercase text-charcoal/70">
          Descripción
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={4}
          className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:border-charcoal focus:outline-none resize-none"
        />
      </div>
      <Input
        {...register('price', { valueAsNumber: true })}
        id="price"
        type="number"
        step="0.01"
        label="Precio (€)"
        error={errors.price?.message}
      />
      <Input
        {...register('stock', { valueAsNumber: true })}
        id="stock"
        type="number"
        label="Stock"
        error={errors.stock?.message}
      />
      <Input
        {...register('material')}
        id="material"
        label="Material"
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-charcoal/70">Categoría</label>
        <select
          {...register('category_id')}
          className="border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal"
        >
          <option value="">Sin categoría</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-charcoal/70">Colección</label>
        <select
          {...register('collection_id')}
          className="border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-charcoal"
        >
          <option value="">Sin colección</option>
          {collections.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input {...register('featured')} type="checkbox" className="h-4 w-4" />
        <span className="text-sm">Destacado</span>
      </label>

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={isSubmitting}>
          {isEdit ? 'Guardar cambios' : 'Crear producto'}
        </Button>
      </div>
    </form>
  )
}
