import { useState, useRef } from "react";
import { secondsToTime, timeToSeconds } from "../utils/timeUtils";
import { VALID_COMPLETE_TIME_FORMAT, VALID_TIME_INPUT_PATTERN } from "../constants/timeRegex";

const CaptionForm = ({ addCaption, currentTime, error, setError }) => {
  const [currentCaption, setCurrentCaption] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const captionInputRef = useRef(null);

  // Handle adding a new caption
  const handleAddCaption = (e) => {
    e.preventDefault();

    if (!currentCaption || !startTime || !endTime) {
      setError("Please fill in all caption fields");
      return;
    }

    if (timeToSeconds(startTime) >= timeToSeconds(endTime)) {
      setError("End time must be after start time");
      return;
    }

    addCaption({
      text: currentCaption,
      startTime,
      endTime,
    });

    setCurrentCaption("");
    setError("");

    // Focus back on the caption input for better UX
    if (captionInputRef.current) {
      captionInputRef.current.focus();
    }
  };

  // Capture current video time for start/end timestamps
  const captureCurrentTime = (field) => {
    const timeStr = secondsToTime(currentTime);

    if (field === "start") {
      setStartTime(timeStr);
    } else {
      setEndTime(timeStr);
    }
  };

// Then in the handleTimeInput function:
const handleTimeInput = (e, field) => {
    const { value } = e.target;
  
    // Allow intermediate typing with both HH:MM:SS.ms and MM:SS.ms formats
    if (VALID_TIME_INPUT_PATTERN.test(value)) {
      // Allow the partial input
      if (field === "start") {
        setStartTime(value);
      } else {
        setEndTime(value);
      }
  
      // Clear error if we have a valid format or empty string
      if (value === "" || VALID_COMPLETE_TIME_FORMAT.test(value)) {
        setError("");
      }
    } else {
      // Invalid format - don't update the field
      setError("Please use the format MM:SS.0 or HH:MM:SS.0");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Caption</h2>
      <form onSubmit={handleAddCaption}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Caption Text</label>
          <textarea
            ref={captionInputRef}
            value={currentCaption}
            onChange={(e) => setCurrentCaption(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="2"
            placeholder="Enter caption text"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={startTime}
                onChange={(e) => handleTimeInput(e, "start")}
                placeholder="HH:MM:SS.0 or MM:SS.0"
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => captureCurrentTime("start")}
                className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 text-sm cursor-pointer"
              >
                Current Time
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1">Format: MM:SS.0 or HH:MM:SS.0</div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">End Time</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={endTime}
                onChange={(e) => handleTimeInput(e, "end")}
                placeholder="HH:MM:SS.0 or MM:SS.0"
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => captureCurrentTime("end")}
                className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 text-sm cursor-pointer"
              >
                Current Time
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1">Format: MM:SS.0 or HH:MM:SS.0</div>
          </div>
        </div>

        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">
          Add Caption
        </button>
      </form>
    </div>
  );
};

export default CaptionForm;
