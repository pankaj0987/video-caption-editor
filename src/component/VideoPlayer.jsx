import { useRef, useEffect } from "react";
import { secondsToTime } from "../utils/timeUtils";

const VideoPlayer = ({
  videoUrl,
  currentlyDisplayedCaption,
  isPlaying,
  setIsPlaying,
  updateDisplayedCaption,
  currentTime,
}) => {
  const videoRef = useRef(null);

  // Function to handle video time updates
  useEffect(() => {
    const updateTime = () => {
      if (videoRef.current) {
        updateDisplayedCaption(videoRef.current.currentTime);
      }
    };

    const intervalId = setInterval(updateTime, 100);
    return () => clearInterval(intervalId);
  }, [updateDisplayedCaption]);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="mb-6 relative">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full rounded"
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Caption Overlay */}
      {currentlyDisplayedCaption && (
        <div className="absolute bottom-16 left-0 right-0 text-center">
          <div className="inline-block bg-black bg-opacity-50 text-white p-2 rounded text-lg max-w-lg mx-auto">
            {currentlyDisplayedCaption}
          </div>
        </div>
      )}

      {/* Custom Controls */}
      <div className="flex justify-center gap-4 mt-2">
        <button onClick={togglePlayPause} className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-800 cursor-pointer">
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="text-sm px-2 py-1 bg-gray-200 rounded">Current Time: {secondsToTime(currentTime)}</div>
      </div>
    </div>
  );
};

export default VideoPlayer;
