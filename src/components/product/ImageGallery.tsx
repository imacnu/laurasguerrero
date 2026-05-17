'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface ImageGalleryProps {
  images: string[]
  productName: string
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index)
    setLightboxOpen(true)
  }, [])

  const slides = images.map((src) => ({ src }))

  return (
    <div className="space-y-3">
      {/* Main image */}
      <button
        className="relative aspect-square w-full overflow-hidden bg-cream-dark cursor-zoom-in"
        onClick={() => openLightbox(selectedIndex)}
        aria-label="Ampliar imagen"
      >
        {images[selectedIndex] ? (
          <Image
            src={images[selectedIndex]}
            alt={`${productName} — imagen ${selectedIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-6xl text-charcoal/20">LG</span>
          </div>
        )}
      </button>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden border-2 transition-colors ${
                idx === selectedIndex ? 'border-charcoal' : 'border-transparent'
              }`}
            >
              <Image
                src={src}
                alt={`${productName} — miniatura ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={selectedIndex}
        on={{ view: ({ index }) => setSelectedIndex(index) }}
        styles={{ root: { '--yarl__color_backdrop': 'rgba(26, 26, 26, 0.95)' } }}
      />
    </div>
  )
}
