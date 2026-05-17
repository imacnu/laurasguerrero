'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { X, Upload } from 'lucide-react'
import toast from 'react-hot-toast'

const MAX_FILES = 5
const MAX_MB = 2
const MAX_BYTES = MAX_MB * 1024 * 1024
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp']

interface ImageUploaderProps {
  images: string[]
  onChange: (urls: string[]) => void
  productSlug: string
}

export default function ImageUploader({ images, onChange, productSlug }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return

    const remaining = MAX_FILES - images.length
    if (remaining <= 0) {
      toast.error(`Máximo ${MAX_FILES} imágenes por producto`)
      return
    }

    const toUpload = Array.from(files).slice(0, remaining)

    for (const file of toUpload) {
      if (!ACCEPTED.includes(file.type)) {
        toast.error(`${file.name}: formato no permitido (usa JPG, PNG o WebP)`)
        continue
      }
      if (file.size > MAX_BYTES) {
        toast.error(`${file.name}: supera el límite de ${MAX_MB} MB`)
        continue
      }

      setUploading(true)
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()

        const ext = file.name.split('.').pop()
        const path = `${productSlug}/${Date.now()}.${ext}`

        const { error } = await supabase.storage
          .from('products')
          .upload(path, file, { upsert: false })

        if (error) {
          toast.error(`Error al subir ${file.name}`)
          continue
        }

        const { data: urlData } = supabase.storage
          .from('products')
          .getPublicUrl(path)

        onChange([...images, urlData.publicUrl])
        toast.success('Imagen subida')
      } catch {
        toast.error('Error inesperado al subir la imagen')
      } finally {
        setUploading(false)
      }
    }

    if (inputRef.current) inputRef.current.value = ''
  }

  async function removeImage(url: string, index: number) {
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      // Extract path from URL (everything after /products/)
      const marker = '/object/public/products/'
      const path = url.includes(marker) ? url.split(marker)[1] : null

      if (path) {
        await supabase.storage.from('products').remove([path])
      }
    } catch {
      // continue even if storage delete fails
    }

    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-xs tracking-widest uppercase text-charcoal/70">
          Imágenes ({images.length}/{MAX_FILES})
        </label>
        <p className="text-[11px] text-charcoal/40">
          JPG · PNG · WebP · Máx {MAX_MB} MB · Recomendado: 800×1067px (3:4)
        </p>
      </div>

      {/* Previews */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={url} className="relative h-24 w-[72px] flex-shrink-0 group">
              <Image
                src={url}
                alt={`Imagen ${i + 1}`}
                fill
                className="object-cover"
                sizes="72px"
              />
              <button
                type="button"
                onClick={() => removeImage(url, i)}
                className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Eliminar imagen"
              >
                <X className="h-3 w-3" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-charcoal/70 text-cream text-[9px] text-center py-0.5 tracking-wider">
                  PRINCIPAL
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {images.length < MAX_FILES && (
        <div>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(',')}
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 border border-dashed border-charcoal/30 px-4 py-3 text-xs tracking-widest uppercase text-charcoal/50 hover:border-charcoal hover:text-charcoal transition-colors disabled:opacity-50"
          >
            <Upload className="h-3.5 w-3.5" />
            {uploading ? 'Subiendo…' : 'Añadir imagen'}
          </button>
        </div>
      )}

      <p className="text-[11px] text-charcoal/40 leading-relaxed">
        La primera imagen es la principal. Arrastra las miniaturas para reordenar (próximamente).
        Asegúrate de crear el bucket <strong>products</strong> en Supabase Storage con acceso público.
      </p>
    </div>
  )
}
