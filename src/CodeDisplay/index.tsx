import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { codeDisplayConfig, CodeDisplayConfig } from "./config";
import { HighlightedCode } from "./SyntaxHighlighter";

// Parse code from markdown content
export function parseCodeFromMarkdown(markdown: string): string {
  const codeBlockRegex = /```[\w]*\n([\s\S]*?)```/;
  const match = markdown.match(codeBlockRegex);
  return match ? match[1].trim() : markdown;
}

// Window control buttons component
const WindowControls: React.FC = () => {
  const { controls } = codeDisplayConfig.theme;

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: controls.close,
        }}
      />
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: controls.minimize,
        }}
      />
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: controls.maximize,
        }}
      />
    </div>
  );
};

// Line numbers component
const LineNumbers: React.FC<{ count: number }> = ({ count }) => {
  const { lineNumbers } = codeDisplayConfig.theme;
  const { fontSize, lineHeight } = codeDisplayConfig.window;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingRight: 16,
        borderRight: "1px solid #404040",
        marginRight: 16,
        userSelect: "none",
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            color: lineNumbers,
            fontSize,
            lineHeight,
            fontFamily: codeDisplayConfig.window.fontFamily,
            textAlign: "right",
            minWidth: 30,
          }}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

// Typing cursor component
const Cursor: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.sin(frame * 0.2) > 0 ? 1 : 0;

  return (
    <span
      style={{
        display: "inline-block",
        width: 2,
        height: "1.2em",
        backgroundColor: "#ffffff",
        opacity,
        marginLeft: 1,
        verticalAlign: "text-bottom",
      }}
    />
  );
};

export interface CodeDisplayProps {
  // The code to display (can be markdown with code block or plain code)
  code: string;

  // Optional: Override the filename shown in title bar
  filename?: string;

  // Optional: Override typing speed from config
  typingSpeed?: number;

  // Optional: Start frame for the typing animation
  startFrame?: number;

  // Optional: Override window dimensions
  width?: number;
  height?: number;

  // Optional: Custom config overrides
  config?: Partial<CodeDisplayConfig>;

  // Optional: Show cursor at the end
  showCursor?: boolean;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({
  code,
  filename = "code.tsx",
  typingSpeed,
  startFrame = 0,
  width,
  height,
  config: customConfig,
  showCursor = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Merge custom config with default
  const config = { ...codeDisplayConfig, ...customConfig };
  const speed = typingSpeed ?? config.typingSpeed;

  // Parse code if it's markdown
  const parsedCode = code.includes("```") ? parseCodeFromMarkdown(code) : code;

  // Calculate visible characters based on frame
  const adjustedFrame = Math.max(0, frame - startFrame);
  const visibleCharCount = Math.floor(adjustedFrame * speed);
  const visibleCode = parsedCode.slice(0, visibleCharCount);
  const isTypingComplete = visibleCharCount >= parsedCode.length;

  // Count lines in visible code
  const lineCount = Math.max(parsedCode.split("\n").length, 1);

  // Z-axis animation
  const { zAnimation } = config;
  let zTransform = 0;
  if (zAnimation.enabled) {
    zTransform = interpolate(
      frame % zAnimation.cycleDuration,
      [0, zAnimation.cycleDuration / 2, zAnimation.cycleDuration],
      [-zAnimation.depth, zAnimation.depth, -zAnimation.depth],
      {
        easing: Easing.inOut(Easing.ease),
      },
    );
  }

  // Entrance animation
  const entranceProgress = spring({
    frame,
    fps,
    config: {
      damping: 15,
      stiffness: 80,
    },
  });

  const scale = interpolate(entranceProgress, [0, 1], [0.9, 1]);
  const opacity = interpolate(entranceProgress, [0, 1], [0, 1]);

  const windowWidth = width ?? config.window.width;
  const windowHeight = height ?? config.window.height;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        perspective: 1000,
      }}
    >
      <div
        style={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: config.theme.background,
          borderRadius: config.window.borderRadius,
          overflow: "hidden",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          transform: `translateZ(${zTransform}px) scale(${scale})`,
          opacity,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: config.window.titleBarHeight,
            backgroundColor: config.theme.titleBar,
            display: "flex",
            alignItems: "center",
            paddingLeft: 16,
            paddingRight: 16,
            gap: 16,
          }}
        >
          <WindowControls />
          <div
            style={{
              flex: 1,
              textAlign: "center",
              color: config.theme.titleBarText,
              fontSize: 13,
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {filename}
          </div>
          <div style={{ width: 52 }} /> {/* Spacer for symmetry */}
        </div>

        {/* Code area */}
        <div
          style={{
            flex: 1,
            padding: config.window.codePadding,
            overflow: "hidden",
            display: "flex",
          }}
        >
          {/* Line numbers */}
          <LineNumbers count={lineCount} />

          {/* Code content */}
          <div
            style={{
              flex: 1,
              fontFamily: config.window.fontFamily,
              fontSize: config.window.fontSize,
              lineHeight: config.window.lineHeight,
              color: config.theme.text,
              overflow: "hidden",
            }}
          >
            <HighlightedCode code={visibleCode} />
            {showCursor && !isTypingComplete && <Cursor />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export config for external use
export { codeDisplayConfig } from "./config";
export type { CodeDisplayConfig } from "./config";

export default CodeDisplay;
