import {
  MediaController,
  MediaControlBar,
  MediaPlayButton,
  MediaMuteButton,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaFullscreenButton,
} from "media-chrome/dist/react";
import { useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";

export const VideoPlayer = () => {
  const [pipIsForceClosed, setPipIsForceClosed] = useState(false);
  const mediaControllerRef = useRef<HTMLElement>(null);
  const { ref, inView, entry } = useInView({
    threshold: [0, 0.9, 1],
  });

  const isFloating = useMemo(() => {
    const isIntersecting = entry?.isIntersecting;
    const intersectionRatio = entry?.intersectionRatio || 0;

    if (isIntersecting && intersectionRatio >= 0.9) {
      setPipIsForceClosed(false);
      return false;
    }

    if (pipIsForceClosed) {
      return false;
    }

    if (mediaControllerRef.current?.hasAttribute("mediapaused")) {
      return false;
    }

    return true;
  }, [inView, entry, pipIsForceClosed]);

  const closePip = () => {
    setPipIsForceClosed(true);
    mediaControllerRef.current?.querySelector('video')?.pause();
  };

  return (
    <div
      ref={ref}
      className="relative flex aspect-video rounded-xl bg-[#201726]"
    >
      <MediaController
        ref={mediaControllerRef}
        className={twMerge(
          "z-10 aspect-video w-full overflow-clip rounded-xl",
          isFloating
            ? "animate-videoSticky is-floating fixed bottom-6 right-6 w-[300px]"
            : "animate-videoInline relative",
        )}
      >
        <button
          onClick={closePip}
          className="absolute right-2 top-2 hidden h-8 w-8 rounded-md bg-black px-2 [.is-floating_&]:block"
        >
          <svg viewBox="0 0 512 512" className="h-4 w-4 fill-white">
            <path d="M443.6 387.1 312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L256 197.8 124.9 68.3c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L68.4 387.1c-2.6 2.6-4.1 6.1-4.1 9.8 0 3.7 1.4 7.2 4.1 9.8l37.4 37.6c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1L256 313.1l130.7 131.1c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l37.4-37.6c2.6-2.6 4.1-6.1 4.1-9.8-.1-3.6-1.6-7.1-4.2-9.7z" />
          </svg>
          <span className="sr-only">Close picture in picture</span>
        </button>
        <video
          slot="media"
          src="https://archive.org/download/archive-video-files/test.mp4"
        />
        <MediaControlBar>
          <MediaPlayButton />
          <MediaMuteButton />
          <MediaTimeRange />
          <MediaTimeDisplay />
          <MediaFullscreenButton />
        </MediaControlBar>
      </MediaController>
    </div>
  );
};
