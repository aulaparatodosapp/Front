"use client";

import { useState } from "react";

/**
 * Portada del curso. Si la imagen no existe o falla, muestra un degradado índigo.
 * `encodeURI` evita problemas con caracteres como la «ñ» (ej. diseño-digital.jpg).
 */
export default function CourseCover({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative h-24 w-full overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={encodeURI(src)} alt={alt} loading="lazy" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
      )}
    </div>
  );
}
