import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { CodeDisplay } from "./index";
import { codeSamples } from "./codeLoader";

// Title component with animation
const AnimatedTitle: React.FC<{ text: string; subtitle?: string }> = ({
  text,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const titleY = interpolate(titleOpacity, [0, 1], [30, 0]);

  const subtitleOpacity = spring({
    frame: frame - 10,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 10,
      }}
    >
      <h1
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: "#ffffff",
          margin: 0,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          textShadow: "0 4px 20px rgba(0, 217, 255, 0.3)",
        }}
      >
        {text}
      </h1>
      {subtitle && (
        <p
          style={{
            fontSize: 24,
            color: "#00D9FF",
            marginTop: 12,
            opacity: Math.max(0, subtitleOpacity),
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

// Feature badge component
const FeatureBadge: React.FC<{
  text: string;
  delay: number;
  position: { x: number; y: number };
}> = ({ text, delay, position }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const opacity = Math.max(0, progress);
  const scale = interpolate(progress, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        backgroundColor: "rgba(0, 217, 255, 0.15)",
        border: "1px solid rgba(0, 217, 255, 0.4)",
        borderRadius: 8,
        padding: "8px 16px",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <span
        style={{
          color: "#00D9FF",
          fontSize: 14,
          fontWeight: 500,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Background grid pattern
const BackgroundGrid: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 217, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        transform: `translateY(${(frame * 0.2) % 50}px)`,
      }}
    />
  );
};

// Scene 1: Introduction with TypeScript
const IntroScene: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundGrid />
      <AnimatedTitle
        text="CodeDisplay Module"
        subtitle="IDE-style code animation for Remotion"
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -45%)",
        }}
      >
        <CodeDisplay
          code={codeSamples.typescript}
          filename="UserProfile.tsx"
          typingSpeed={3}
          width={1000}
          height={550}
          showCursor={true}
        />
      </div>

      <FeatureBadge
        text="✨ Syntax Highlighting"
        delay={30}
        position={{ x: 120, y: 900 }}
      />
      <FeatureBadge
        text="⌨️ Typewriter Effect"
        delay={45}
        position={{ x: 420, y: 900 }}
      />
      <FeatureBadge
        text="🎯 Z-Axis Animation"
        delay={60}
        position={{ x: 720, y: 900 }}
      />
      <FeatureBadge
        text="🎨 VS Code Theme"
        delay={75}
        position={{ x: 1020, y: 900 }}
      />
      <FeatureBadge
        text="⚡ Configurable Speed"
        delay={90}
        position={{ x: 1320, y: 900 }}
      />
      <FeatureBadge
        text="📦 Reusable"
        delay={105}
        position={{ x: 1600, y: 900 }}
      />
    </div>
  );
};

// Scene 2: Python Demo
const PythonScene: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundGrid />
      <AnimatedTitle text="Multi-Language Support" subtitle="Python Example" />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -45%)",
        }}
      >
        <CodeDisplay
          code={codeSamples.python}
          filename="data_processor.py"
          typingSpeed={2.5}
          width={900}
          height={520}
          showCursor={true}
        />
      </div>
    </div>
  );
};

// Scene 3: JavaScript Demo
const JavaScriptScene: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundGrid />
      <AnimatedTitle
        text="Clean & Professional"
        subtitle="JavaScript Module Pattern"
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -45%)",
        }}
      >
        <CodeDisplay
          code={codeSamples.javascript}
          filename="calculator.js"
          typingSpeed={2}
          width={900}
          height={520}
          showCursor={true}
        />
      </div>
    </div>
  );
};

// Scene 4: CSS Demo
const CSSScene: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundGrid />
      <AnimatedTitle text="Styling Support" subtitle="Modern CSS" />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -45%)",
        }}
      >
        <CodeDisplay
          code={codeSamples.css}
          filename="styles.css"
          typingSpeed={2}
          width={800}
          height={480}
          showCursor={true}
        />
      </div>
    </div>
  );
};

// Scene 5: Side by side comparison
const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftEntry = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const rightEntry = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const leftX = interpolate(leftEntry, [0, 1], [-100, 0]);
  const rightX = interpolate(rightEntry, [0, 1], [100, 0]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundGrid />
      <AnimatedTitle text="Side by Side" subtitle="Multiple instances" />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          height: "100%",
          paddingTop: 100,
        }}
      >
        <div
          style={{
            opacity: leftEntry,
            transform: `translateX(${leftX}px)`,
          }}
        >
          <CodeDisplay
            code={`const greet = (name) => {
  return \`Hello, \${name}!\`;
};

console.log(greet("World"));`}
            filename="greet.js"
            typingSpeed={1.5}
            width={550}
            height={320}
            showCursor={true}
          />
        </div>

        <div
          style={{
            opacity: Math.max(0, rightEntry),
            transform: `translateX(${rightX}px)`,
          }}
        >
          <CodeDisplay
            code={`def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("World"))`}
            filename="greet.py"
            typingSpeed={1.5}
            width={550}
            height={320}
            startFrame={15}
            showCursor={true}
          />
        </div>
      </div>
    </div>
  );
};

// Scene 6: Outro with features recap
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const features = [
    "Letter-by-letter typing animation",
    "VS Code Dark+ inspired theme",
    "Syntax highlighting for multiple languages",
    "Z-axis depth animation",
    "Fully configurable via config.ts",
    "Reusable component architecture",
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0f",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BackgroundGrid />

      <h1
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: 60,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          textShadow: "0 4px 20px rgba(0, 217, 255, 0.3)",
        }}
      >
        Features
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {features.map((feature, index) => {
          const featureProgress = spring({
            frame: frame - index * 8,
            fps,
            config: { damping: 15, stiffness: 100 },
          });

          const opacity = Math.max(0, featureProgress);
          const x = interpolate(featureProgress, [0, 1], [-50, 0]);

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity,
                transform: `translateX(${x}px)`,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#00D9FF",
                  boxShadow: "0 0 10px rgba(0, 217, 255, 0.5)",
                }}
              />
              <span
                style={{
                  fontSize: 28,
                  color: "#e0e0e0",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                {feature}
              </span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          fontSize: 20,
          color: "#666",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        Import from <span style={{ color: "#00D9FF" }}>./CodeDisplay</span> to
        get started
      </div>
    </div>
  );
};

// Main Demo Page composition
export const CodeDisplayDemoPage: React.FC = () => {
  return (
    <>
      {/* Scene 1: Intro with TypeScript - 10 seconds */}
      <Sequence durationInFrames={300}>
        <IntroScene />
      </Sequence>

      {/* Scene 2: Python - 8 seconds */}
      <Sequence from={300} durationInFrames={240}>
        <PythonScene />
      </Sequence>

      {/* Scene 3: JavaScript - 8 seconds */}
      <Sequence from={540} durationInFrames={240}>
        <JavaScriptScene />
      </Sequence>

      {/* Scene 4: CSS - 6 seconds */}
      <Sequence from={780} durationInFrames={180}>
        <CSSScene />
      </Sequence>

      {/* Scene 5: Side by side comparison - 6 seconds */}
      <Sequence from={960} durationInFrames={180}>
        <ComparisonScene />
      </Sequence>

      {/* Scene 6: Outro - 5 seconds */}
      <Sequence from={1140} durationInFrames={150}>
        <OutroScene />
      </Sequence>
    </>
  );
};

export default CodeDisplayDemoPage;
