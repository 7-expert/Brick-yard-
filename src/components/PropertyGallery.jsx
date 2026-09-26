"use client";

import { useState } from "react";
import Image from "next/image";

export default function PropertyGallery({ images, title }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="w-full">
      <div className="relative h-[50vh] min-h-[400px] w-full mb-4 rounded-xl overflow-hidden bg-cream-dark">
        <Image src={mainImage} alt={title} fill className="object-cover" />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button 
            key={idx} 
            onClick={() => setMainImage(img)}
            className={`relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? 'border-gold-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
          >
            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
