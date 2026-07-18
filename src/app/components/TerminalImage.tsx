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
  const imageAlt = alt || "Image";

  const imageWidth =
    typeof width === "string" ? parseInt(width) || 600 : width || 600;
  const imageHeight =
    typeof height === "string" ? parseInt(height) || 400 : height || 400;

  if (!caption || caption.length === 0) caption = alt;

  return (
    <>
      <figure
        className={`my-6 w-fit max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl ${className}`}
      >
        <div
          className="inline-block border border-terminal-border bg-terminal-border p-2 cursor-pointer hover:border-terminal-accent transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="bg-terminal-bg p-1">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="w-full h-auto object-contain p-1"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw"
              priority={priority}
              style={{
                maxHeight: "60vh",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        {caption && (
          <figcaption className="text-terminal-comment text-xs mt-2 pt-2 border-t border-terminal-border">
            {caption}
          </figcaption>
        )}
      </figure>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center gap-3 max-w-[92vw] max-h-[90vh]">
          <div className="border border-neutral-50/40 p-1 min-h-0">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={0}
              height={0}
              sizes="92vw"
              className="max-w-full w-auto h-auto object-contain cursor-pointer"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "88vw",
                maxHeight: caption ? "78vh" : "86vh",
              }}
              onClick={() => window.open(imageSrc, "_blank")}
              title="Click to open full size in new tab"
            />
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
