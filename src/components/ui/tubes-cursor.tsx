import { useEffect, useRef } from "react";

const CDN_URL =
  "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

type TubesCursorProps = {
  title?: string;
  subtitle?: string;
  caption?: string;
  initialColors?: string[];
  lightColors?: string[];
  lightIntensity?: number;
  titleSize?: string;
  subtitleSize?: string;
  captionSize?: string;
  enableRandomizeOnClick?: boolean;
  className?: string;
};

export const TubesCursor = ({
  title = "Tubes",
  subtitle = "Interactive",
  caption = "WebGPU / WebGL Boxed Demo",
  initialColors = ["#f967fb", "#53bc28", "#6958d5"],
  lightColors = ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
  lightIntensity = 200,
  titleSize = "text-[60px] md:text-[80px]",
  subtitleSize = "text-[40px] md:text-[60px]",
  captionSize = "text-base",
  enableRandomizeOnClick = true,
  className = "",
}: TubesCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let removeClick: (() => void) | null = null;
    let destroyed = false;

    const loadScript = (): Promise<void> =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${CDN_URL}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = CDN_URL;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });

    (async () => {
      try {
        await loadScript();
      } catch {
        console.warn("TubesCursor: failed to load CDN script");
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const TubesCursorCtor = (window as any).TubesCursor;
      if (!TubesCursorCtor || !canvasRef.current || destroyed) return;

      const app = TubesCursorCtor(canvasRef.current, {
        tubes: {
          colors: initialColors,
          lights: {
            intensity: lightIntensity,
            colors: lightColors,
          },
        },
      });

      appRef.current = app;

      if (enableRandomizeOnClick && containerRef.current) {
        const handler = () => {
          const colors = randomColors(initialColors.length);
          const lights = randomColors(lightColors.length);
          app.tubes.setColors(colors);
          app.tubes.setLightsColors(lights);
        };
        containerRef.current.addEventListener("click", handler);
        removeClick = () =>
          containerRef.current?.removeEventListener("click", handler);
      }
    })();

    return () => {
      destroyed = true;
      if (removeClick) removeClick();
      try {
        appRef.current?.dispose?.();
        appRef.current = null;
      } catch {
        // ignore
      }
    };
  }, [initialColors, lightColors, lightIntensity, enableRandomizeOnClick]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center h-[500px] w-full overflow-hidden rounded-3xl cursor-pointer ${className}`}
    >
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full pointer-events-none"
      />

      {/* Hero text */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 select-none pointer-events-none">
        <h1
          className={`m-0 p-0 text-white font-bold uppercase leading-none drop-shadow-[0_0_20px_rgba(0,0,0,1)] ${titleSize}`}
        >
          {title}
        </h1>
        <h2
          className={`m-0 p-0 text-white font-medium uppercase leading-none drop-shadow-[0_0_20px_rgba(0,0,0,1)] ${subtitleSize}`}
        >
          {subtitle}
        </h2>
        <p
          className={`m-0 p-0 text-white leading-none drop-shadow-[0_0_20px_rgba(0,0,0,1)] ${captionSize}`}
        >
          {caption}
        </p>
      </div>
    </div>
  );
};

function randomColors(count: number) {
  return new Array(count).fill(0).map(
    () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
  );
}
