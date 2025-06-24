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
}

export default function TerminalImage({
  src,
  alt,
  caption,
  width = 600,
  height = 400,
  className = "",
}: TerminalImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert src to string, handling undefined and Blob cases
  const imageSrc =
    src instanceof Blob ? URL.createObjectURL(src) : src || "/placeholder.svg";
  const imageAlt = alt || "Image";

  // Convert width and height to numbers, with defaults
  const imageWidth =
    typeof width === "string" ? parseInt(width) || 600 : width || 600;
  const imageHeight =
    typeof height === "string" ? parseInt(height) || 400 : height || 400;

  if (!caption || caption.length === 0) caption = alt;
  return (
    <>
      <figure className={`my-6 ${className}`}>
        <div
          className="border border-terminal-border bg-terminal-border p-2 cursor-pointer hover:border-terminal-accent transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="bg-terminal-bg p-1">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="w-full h-auto"
            />
          </div>
        </div>
        {caption && (
          <figcaption className="text-terminal-comment text-sm mt-2 ml-6 before:content-['['] after:content-[']'] after:pl-2 before:pr-2">
            {caption}
          </figcaption>
        )}
      </figure>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="border border-terminal-border bg-terminal-border p-2">
          <div className="bg-terminal-bg p-1">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth * 2}
              height={imageHeight * 2}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
        {caption && (
          <p className="text-terminal-comment text-sm mt-2 text-center">
            {caption}
          </p>
        )}
      </Modal>
    </>
  );
}
