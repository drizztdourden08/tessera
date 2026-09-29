/* @layer stories @kind component */
import { useEffect, useRef } from 'react';
import { Video } from '../../../src/primitives';
import { ownerDocumentOf } from '../../../src/primitives/dom/owner-document';
import { ownerWindowOf } from '../../../src/primitives/dom/owner-window';

const WIDTH = 320;
const HEIGHT = 180;

const tokenColor = (el: Element, name: string, fallback: string) =>
  ownerWindowOf(el).getComputedStyle(el).getPropertyValue(name).trim() || fallback;

const LiveCanvasVideo = ({ controls }: { controls: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = ownerDocumentOf(video).createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!video || !ctx) return undefined;

    const background = tokenColor(video, '--c-sunken', 'black');
    const accent = tokenColor(video, '--c-primary', 'goldenrod');
    const ink = tokenColor(video, '--c-text', 'white');
    let frame = 0;
    let raf = 0;

    const draw = () => {
      const progress = (frame % 240) / 240;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(16 + (WIDTH - 32) * progress, 80, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ink;
      ctx.font = '14px monospace';
      ctx.fillText(`Live frame ${frame}`, 16, 28);
      frame += 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    const stream = canvas.captureStream(30);
    video.srcObject = stream;
    video.play().catch(() => undefined);

    return () => {
      cancelAnimationFrame(raf);
      stream.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    };
  }, []);

  return <Video ref={videoRef} className="video-demo" label="Live stream" muted playsInline controls={controls} />;
};

export { LiveCanvasVideo };
