import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useScrollLock } from "./utils/useScrollLock";
import "./styles/ArtworkViewer.css";

const noop = () => {};

export interface Artwork { src: string; title: string }

export default function ArtworkViewer({ artworks, index, onClose }: {
  artworks: Artwork[]; index: number; onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const start = useRef<number | null>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useScrollLock(true, noop, noop);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close.current();
      if (event.key === "ArrowRight") setCurrent(value => (value + 1) % artworks.length);
      if (event.key === "ArrowLeft") setCurrent(value => (value - 1 + artworks.length) % artworks.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [artworks.length]);
  const move = (step: number) => { setFailed(false); setLoading(true); setCurrent(value => (value + step + artworks.length) % artworks.length); };
  return createPortal(
    <div className="artwork-viewer" role="dialog" aria-modal="true" aria-label="Project artwork viewer"
      onTouchStart={event => { start.current = event.touches[0].clientX; }}
      onTouchEnd={event => { if (start.current !== null) { const delta = event.changedTouches[0].clientX - start.current; if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1); } start.current = null; }}>
      <div className="artwork-viewer-bar"><span>{artworks[current].title} · {current + 1} / {artworks.length}</span><button onClick={onClose} aria-label="Close artwork viewer" autoFocus>Close ×</button></div>
      <div className="artwork-viewer-stage">
        <button onClick={() => move(-1)} aria-label="Previous artwork">←</button>
        {failed ? <p>Artwork unavailable</p> : <div className="artwork-image-wrap">{loading && <p role="status">Loading artwork…</p>}<img key={current} src={artworks[current].src} alt={artworks[current].title} style={{ visibility: loading ? "hidden" : "visible" }} onLoad={() => setLoading(false)} onError={() => { setLoading(false); setFailed(true); }} /></div>}
        <button onClick={() => move(1)} aria-label="Next artwork">→</button>
      </div>
    </div>, document.body
  );
}
