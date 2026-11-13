"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Modal from "./Modal";

interface TerminalImageProps {
  src?: string | Blob;
  alt?: string;
  caption?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  priority?: boolean;
}

export default function TerminalImage({
  src,
  alt,
  caption,
  width = 600,
  height = 400,
  className = "",
  priority = false,
}: TerminalImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );
  const imgRef = useRef<HTMLImageElement>(null);

  // Convert src to string, handling undefined and Blob cases
  const imageSrc =
    src instanceof Blob ? URL.createObjectURL(src) : src || "/placeholder.svg";
  const imageAlt = alt || caption || "Figure";

  const imageWidth =
    typeof width === "string" ? parseInt(width) || 600 : width || 600;
  const imageHeight =
    typeof height === "string" ? parseInt(height) || 400 : height || 400;

  if (!caption || caption.length === 0) caption = alt;

  // An image that settled before hydration never fires onLoad or onError, so read its state once mounted.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "error");
  }, [imageSrc]);

  if (status === "error") {
    return (
      <figure className={`my-7 max-w-full ${className}`}>
        <div
          role="img"
          aria-label={imageAlt}
          className="img-placeholder w-full "
          style={{
            aspectRatio: `${imageWidth} / ${imageHeight}`,
            maxHeight: "60vh",
          }}
        >
          <span>Image unavailable · {imageSrc.split("/").pop()}</span>
        </div>
        {caption && (
          <figcaption className="text-terminal-comment text-xs mt-2">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <>
      <figure className={`my-7 max-w-full ${className}`}>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={`max-w-full hover:opacity-90 motion-safe:transition-opacity p-0 ${status === "loading" ? "img-stripes block w-full" : "inline-block bg-transparent"}`}
          aria-label={imageAlt ? `Enlarge image: ${imageAlt}` : "Enlarge image"}
        >
          <Image
            ref={imgRef}
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
            className={`block max-w-full object-contain ${status === "loading" ? "w-full" : "w-auto h-auto"}`}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
            priority={priority}
            style={{
              maxHeight: "60vh",
              objectFit: "contain",
              ...(status === "loading" && {
                aspectRatio: `${imageWidth} / ${imageHeight}`,
                height: "auto",
              }),
            }}
          />
        </button>
        {caption && (
          <figcaption className="text-terminal-comment text-xs mt-2">
            {caption}
          </figcaption>
        )}
      </figure>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center gap-3 max-w-[92vw] max-h-[90vh]">
          <div className=" p-1 min-h-0">
            <a
              href={imageSrc}
              target="_blank"
              rel="noreferrer"
              title="Open full size in new tab"
              className="block"
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={0}
                height={0}
                sizes="92vw"
                className="max-w-full w-auto h-auto object-contain"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "88vw",
                  maxHeight: caption ? "78vh" : "86vh",
                }}
              />
            </a>
          </div>

          {caption && (
            <p className="text-neutral-300 text-xs text-center max-w-[88vw] break-words  pt-2">
              {caption}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}
