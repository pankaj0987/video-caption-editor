import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import CaptionForm from "./CaptionForm";
import CaptionList from "./CaptionList";
import { timeToSeconds } from "../utils/timeUtils";

const VideoCaptionEditor = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentlyDisplayedCaption, setCurrentlyDisplayedCaption] = useState("");
  const [error, setError] = useState("");

  // Handle video URL submission
  const handleVideoSubmit = (e) => {
    e.preventDefault();
    if (!videoUrl) {
      setError("Please enter a valid video URL");
      return;
    }
    setError("");
  };

  // Update the displayed caption based on current video time
  const updateDisplayedCaption = (time) => {
    setCurrentTime(time);

    const visibleCaption = captions.find(
      (caption) => time >= timeToSeconds(caption.startTime) && time <= timeToSeconds(caption.endTime)
    );

    setCurrentlyDisplayedCaption(visibleCaption ? visibleCaption.text : "");
  };

  //Function to Add a new caption
  const addCaption = (newCaption) => {
    setCaptions([...captions, { ...newCaption, id: Date.now() }]);
  };

  //Function to Remove a caption
  const removeCaption = (id) => {
    setCaptions(captions.filter((caption) => caption.id !== id));
  };

  //Function for Exporting captions
  const exportCaptions = () => {
    if (captions.length === 0) {
      setError("No captions to export");
      return;
    }

    let vttContent = "WEBVTT\n\n";

    captions.forEach((caption, index) => {
      vttContent += `${index + 1}\n`;

      // Formating timestamps for WebVTT
      const formatTimestamp = (timeStr) => {
        const parts = timeStr.split(":");

        // Convert to WebVTT format (HH:MM:SS.mmm)
        if (parts.length === 2) {
          // Add hour component for MM:SS format
          return `00:${parts[0]}:${parts[1].replace(".", ",")}0`;
        } else if (parts.length === 3) {
          // Already has hour component
          return `${parts[0]}:${parts[1]}:${parts[2].replace(".", ",")}0`;
        }

        return timeStr;
      };

      vttContent += `${formatTimestamp(caption.startTime)} --> ${formatTimestamp(caption.endTime)}\n`;
      vttContent += `${caption.text}\n\n`;
    });

    const blob = new Blob([vttContent], { type: "text/vtt" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "captions.vtt";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Video Caption Editor</h1>

      {/* Video URL Input */}
      <form onSubmit={handleVideoSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter video URL (mp4, webm, etc.)"
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
            Load Video
          </button>
        </div>
      </form>

      {/* Video Player Component */}
      {videoUrl && (
        <VideoPlayer
          videoUrl={videoUrl}
          currentlyDisplayedCaption={currentlyDisplayedCaption}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          updateDisplayedCaption={updateDisplayedCaption}
          currentTime={currentTime}
        />
      )}

      {/* Caption Input Form Component */}
      <CaptionForm addCaption={addCaption} currentTime={currentTime} error={error} setError={setError} />

      {/* Captions List Component */}
      <CaptionList captions={captions} removeCaption={removeCaption} exportCaptions={exportCaptions} />
    </div>
  );
};

export default VideoCaptionEditor;
