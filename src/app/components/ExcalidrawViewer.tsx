"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "@excalidraw/excalidraw/index.css";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false },
);

interface ExcalidrawViewerProps {
  src?: string;
  height?: string | number;
}

type SceneData = {
  elements?: unknown[];
  appState?: Record<string, unknown>;
  files?: Record<string, unknown>;
};

type ExcalidrawAPI = {
  getAppState: () => { width: number; scrollX: number; zoom: { value: number } };
  updateScene: (scene: { appState: Record<string, unknown> }) => void;
};

export default function ExcalidrawViewer({
  src,
  height = 500,
}: ExcalidrawViewerProps) {
  const [data, setData] = useState<SceneData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [api, setApi] = useState<ExcalidrawAPI | null>(null);

  useEffect(() => {
    if (!api || !data) return;
    let cancelled = false;
    const id = window.setTimeout(() => {
      if (cancelled) return;
      const s = api.getAppState();
      api.updateScene({
        appState: {
          scrollX: s.scrollX + (s.width * 3) / s.zoom.value,
        },
      });
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [api, data]);

  useEffect(() => {
    if (!src) {
      setError("No src provided");
      return;
    }
    let cancelled = false;
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: SceneData) => {
        if (!cancelled) setData(json);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (error) {
    return (
      <div className="text-terminal-red font-mono text-sm p-4 border border-terminal-red rounded">
        Failed to load drawing: {error}
      </div>
    );
  }

  return (
    <div
      style={{ height: typeof height === "number" ? `${height}px` : height }}
      className="my-6 rounded overflow-hidden border border-terminal-comment"
    >
      {data && (
        <Excalidraw
          excalidrawAPI={(a) => setApi(a as unknown as ExcalidrawAPI)}
          initialData={{
            elements: (data.elements ?? []) as never,
            appState: {
              ...(data.appState ?? {}),
              viewModeEnabled: true,
              zenModeEnabled: true,
              zoom: { value: 0.2 },
            } as never,
            files: (data.files ?? {}) as never,
            scrollToContent: true,
          }}
          viewModeEnabled
          zenModeEnabled
        />
      )}
    </div>
  );
}
