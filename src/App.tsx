import "./index.css";
import { VideoPlayer } from "./video-player";

function App() {
  return (
    <main className="bg-[#120918] py-12 px-5">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="mb-8 text-5xl text-white">
          Let's make our own Picture in Picture!
        </h1>
        <p className="mb-8 text-white opacity-80">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          scelerisque, nisi nec malesuada tincidunt, nunc libero elementum
          ligula, id sollicitudin purus nunc id libero.
        </p>

        <VideoPlayer />

        <div className="space-y-3 pt-8 text-lg leading-relaxed text-white opacity-70">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={
                "w-full rounded-md bg-[#201726] " +
                // No this is not how you should make random classes <3
                (Math.random() > 0.5 ? "h-20" : "h-48")
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
