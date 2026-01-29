// Configuration for CodeDisplay module

export const codeDisplayConfig = {
  // Characters per frame (higher = faster typing)
  typingSpeed: 2,

  // Frames per second (used for calculation)
  fps: 30,

  // Z-axis animation settings
  zAnimation: {
    // Enable/disable z-axis movement
    enabled: false,
    // Maximum depth offset (in pixels)
    depth: 30,
    // Animation duration in frames
    cycleDuration: 60,
  },

  // IDE window styling
  window: {
    // Window dimensions
    width: 900,
    height: 600,

    // Border radius
    borderRadius: 12,

    // Title bar height
    titleBarHeight: 40,

    // Padding inside code area
    codePadding: 20,

    // Font settings
    fontSize: 16,
    fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
    lineHeight: 1.6,
  },

  // Color theme (VS Code Dark+ inspired)
  theme: {
    background: "#1e1e1e",
    titleBar: "#323233",
    titleBarText: "#cccccc",
    text: "#d4d4d4",
    lineNumbers: "#858585",

    // Syntax highlighting colors
    syntax: {
      keyword: "#569cd6", // blue - for, if, return, const, let, etc.
      string: "#ce9178", // orange - strings
      number: "#b5cea8", // light green - numbers
      comment: "#6a9955", // green - comments
      function: "#dcdcaa", // yellow - function names
      className: "#4ec9b0", // cyan - class names
      property: "#9cdcfe", // light blue - properties
      operator: "#d4d4d4", // white - operators
      punctuation: "#d4d4d4", // white - brackets, etc.
      type: "#4ec9b0", // cyan - types
      variable: "#9cdcfe", // light blue - variables
    },

    // Window control buttons
    controls: {
      close: "#ff5f56",
      minimize: "#ffbd2e",
      maximize: "#27ca40",
    },
  },
};

export type CodeDisplayConfig = typeof codeDisplayConfig;
