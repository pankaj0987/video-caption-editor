const CaptionsList = ({ captions, removeCaption, exportCaptions }) => {
  // Validating that captions is an array, if not using an empty array
  const validCaptions = Array.isArray(captions) ? captions : [];

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Captions List</h2>
        <button
          onClick={exportCaptions}
          className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600 text-sm cursor-pointer"
          disabled={validCaptions.length === 0}
        >
          Export as VTT
        </button>
      </div>

      {validCaptions.length === 0 ? (
        <p className="text-gray-500 italic">No captions added yet.</p>
      ) : (
        <ul className="divide-y">
          {validCaptions.map((caption) => (
            <li key={caption?.id || Math.random()} className="py-3 flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  {caption?.startTime || "00:00.0"} → {caption?.endTime || "00:00.0"}
                </div>
                <div>{caption?.text || "No caption text"}</div>
              </div>
              <button onClick={() => removeCaption(caption?.id)} className="text-red-500 hover:text-red-700 cursor-pointer">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CaptionsList;
