import React from "react";
import { Composition } from "remotion";
import { CodeDisplay } from "./index";
import { sampleCode, codeSamples } from "./codeLoader";
import { codeDisplayConfig } from "./config";

// Demo composition component
export const CodeDisplayDemo: React.FC<{
  codeType?: keyof typeof codeSamples;
  customCode?: string;
}> = ({ codeType = "typescript", customCode }) => {
  const code = customCode || codeSamples[codeType] || sampleCode;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0f",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CodeDisplay
        code={code}
        filename={`example.${codeType === "typescript" ? "tsx" : codeType === "python" ? "py" : codeType === "css" ? "css" : "js"}`}
        typingSpeed={codeDisplayConfig.typingSpeed}
        showCursor={true}
      />
    </div>
  );
};

// Register composition for Remotion
export const CodeDisplayComposition: React.FC = () => {
  return (
    <>
      <Composition
        id="CodeDisplay"
        component={CodeDisplayDemo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          codeType: "typescript" as keyof typeof codeSamples,
        }}
      />
      <Composition
        id="CodeDisplayPython"
        component={CodeDisplayDemo}
        durationInFrames={400}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          codeType: "python" as keyof typeof codeSamples,
        }}
      />
      <Composition
        id="CodeDisplayJS"
        component={CodeDisplayDemo}
        durationInFrames={400}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          codeType: "javascript" as keyof typeof codeSamples,
        }}
      />
    </>
  );
};

export default CodeDisplayDemo;
