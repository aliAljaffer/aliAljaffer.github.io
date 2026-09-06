"use client";

import { useState } from "react";
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

  // Convert src to string, handling undefined and Blob cases
  const imageSrc =
    src instanceof Blob ? URL.createObjectURL(src) : src || "/placeholder.svg";
  const imageAlt = alt || caption || "Figure";

  const imageWidth =
    typeof width === "string" ? parseInt(width) || 600 : width || 600;
  const imageHeight =
    typeof height === "string" ? parseInt(height) || 400 : height || 400;

  if (!caption || caption.length === 0) caption = alt;

  return (
    <>
      <figure className={`my-7 max-w-full ${className}`}>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-block max-w-full border border-terminal-accent hover:opacity-90 transition-opacity p-0 bg-transparent"
          aria-label={imageAlt ? `Enlarge image: ${imageAlt}` : "Enlarge image"}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="block w-auto h-auto max-w-full object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
            priority={priority}
            style={{
              maxHeight: "60vh",
              objectFit: "contain",
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
          <div className="border border-neutral-50/40 p-1 min-h-0">
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
            <p className="text-neutral-300 text-xs text-center max-w-[88vw] break-words border-t border-neutral-50/20 pt-2">
              {caption}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}
