import "./index.css";
import { Composition } from "remotion";
import { CodeDisplay } from "./CodeDisplay";
import { CodeDisplayDemo } from "./CodeDisplay/Demo";
import { CodeDisplayDemoPage } from "./CodeDisplay/DemoPage";
import { sampleCode, codeSamples } from "./CodeDisplay/codeLoader";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Basic CodeDisplay - TypeScript sample */}
      <Composition
        id="CodeDisplay"
        component={CodeDisplay}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          code: sampleCode,
          filename: "example.tsx",
          showCursor: true,
        }}
      />

      {/* TypeScript Demo */}
      <Composition
        id="CodeDisplayTS"
        component={CodeDisplayDemo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          codeType: "typescript" as keyof typeof codeSamples,
        }}
      />

      {/* Python Demo */}
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

      {/* JavaScript Demo */}
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

      {/* CSS Demo */}
      <Composition
        id="CodeDisplayCSS"
        component={CodeDisplayDemo}
        durationInFrames={350}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          codeType: "css" as keyof typeof codeSamples,
        }}
      />

      {/* Full Demo Page with all scenes */}
      <Composition
        id="CodeDisplayFullDemo"
        component={CodeDisplayDemoPage}
        durationInFrames={1290}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
