// Regex for validating partial time inputs during typing
export const VALID_TIME_INPUT_PATTERN = /^$|^\d{0,2}$|^\d{1,2}:$|^\d{1,2}:\d{0,2}$|^\d{1,2}:\d{1,2}\.$|^\d{1,2}:\d{1,2}\.\d$|^\d{1,2}:\d{1,2}:\d{0,2}$|^\d{1,2}:\d{1,2}:\d{1,2}\.$|^\d{1,2}:\d{1,2}:\d{1,2}\.\d$/;

// Regex for validating complete time formats
export const VALID_MM_SS_FORMAT = /^\d{1,2}:\d{1,2}\.\d$/;
export const VALID_HH_MM_SS_FORMAT = /^\d{1,2}:\d{1,2}:\d{1,2}\.\d$/;

// Combined pattern for checking if either format is valid
export const VALID_COMPLETE_TIME_FORMAT = new RegExp(
  `${VALID_MM_SS_FORMAT.source}|${VALID_HH_MM_SS_FORMAT.source}`
);