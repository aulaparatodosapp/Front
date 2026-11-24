"use client";

import { useState } from "react";

/**
 * Portada del curso: usa las mismas imágenes que la sección pública (`/images/courses/...`).
 * Si la imagen falla, muestra un degradado slate. `encodeURI` cubre tildes y «ñ».
 */
export default function CourseCover({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-slate-600 to-slate-900">
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={encodeURI(src)} alt={alt} loading="lazy" onError={() => setFailed(true)} className="absolute inset-0 block h-full w-full object-cover" />
      )}
    </div>
  );
}
