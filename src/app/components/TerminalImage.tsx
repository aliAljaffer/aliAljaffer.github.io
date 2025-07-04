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

  const imageWidth =
    typeof width === "string" ? parseInt(width) || 600 : width || 600;
  const imageHeight =
    typeof height === "string" ? parseInt(height) || 400 : height || 400;

  if (!caption || caption.length === 0) caption = alt;

  return (
    <>
      <figure className={`my-6 ${className}`}>
        <div
          className="inline-block border border-terminal-border bg-terminal-border p-2 cursor-pointer hover:border-terminal-accent transition-colors max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
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
              style={{
                maxHeight: "60vh",
                objectFit: "contain",
              }}
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
        <div className="flex flex-col max-w-[90vw] max-h-[90vh]">
          <div className="border border-terminal-border bg-terminal-border p-2 flex-1 min-h-0">
            <div className="bg-terminal-bg p-1 h-full">
              <div className="relative flex justify-center items-center h-full">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={0}
                  height={0}
                  sizes="90vw"
                  className="max-w-full w-auto h-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "90vw",
                    maxHeight: caption ? "75vh" : "85vh", // Reserve space for caption
                  }}
                  onClick={() => window.open(imageSrc, "_blank")}
                  title="Click to open full size in new tab"
                />
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 pt-2 pb-2 min-h-[2rem]">
            {caption && (
              <p className="text-terminal-comment text-sm text-center max-w-[90vw] break-words px-4 bg-terminal-bg border border-terminal-accent py-1 place-self-center w-fit shadow-lg">
                {caption}
              </p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
