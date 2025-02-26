// Convert time format (HH:MM:SS.ms) to seconds
export const timeToSeconds = (timeString) => {
  if (!timeString) return 0;
  
  // Handle different formats (HH:MM:SS.ms or MM:SS.ms)
  const parts = timeString.split(':');
  
  if (parts.length === 3) {
    // HH:MM:SS.ms format
    const [hours, minutes, seconds] = parts.map(parseFloat);
    return (hours * 3600) + (minutes * 60) + seconds;
  } else if (parts.length === 2) {
    // MM:SS.ms format
    const [minutes, seconds] = parts.map(parseFloat);
    return (minutes * 60) + seconds;
  }
  
  return 0;
};

// Convert seconds to time format (HH:MM:SS.0)
export const secondsToTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = (seconds % 60).toFixed(1);
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(4, '0')}`;
  } else {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(4, '0')}`;
  }
};