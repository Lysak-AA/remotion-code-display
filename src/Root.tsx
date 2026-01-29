import "./index.css";
import { Composition } from "remotion";
import { CodeDisplay } from "./CodeDisplay";

// Sample code for demo
const sampleCode = `const greeting = "Hello, World!";

function sayHello(name: string) {
  console.log(\`Hello, \${name}!\`);
  return name.toUpperCase();
}

// Call the function
sayHello(greeting);`;

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render CodeDisplay
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
    </>
  );
};
