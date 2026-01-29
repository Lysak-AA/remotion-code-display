import React from "react";
import { codeDisplayConfig } from "./config";

const { syntax } = codeDisplayConfig.theme;

// Token types for syntax highlighting
type TokenType =
  | "keyword"
  | "string"
  | "number"
  | "comment"
  | "function"
  | "className"
  | "property"
  | "operator"
  | "punctuation"
  | "type"
  | "variable"
  | "text";

interface Token {
  type: TokenType;
  value: string;
}

// Keywords for various languages
const keywords = new Set([
  "import",
  "export",
  "from",
  "default",
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "try",
  "catch",
  "finally",
  "throw",
  "new",
  "class",
  "extends",
  "implements",
  "interface",
  "type",
  "enum",
  "public",
  "private",
  "protected",
  "static",
  "async",
  "await",
  "yield",
  "of",
  "in",
  "typeof",
  "instanceof",
  "true",
  "false",
  "null",
  "undefined",
  "this",
  "super",
  "void",
]);

// Built-in types
const types = new Set([
  "string",
  "number",
  "boolean",
  "object",
  "any",
  "never",
  "unknown",
  "void",
  "null",
  "undefined",
  "Array",
  "Object",
  "String",
  "Number",
  "Boolean",
  "Function",
  "Promise",
  "Map",
  "Set",
  "React",
  "FC",
]);

// Operators and punctuation
const operators = /^(=>|===|!==|==|!=|<=|>=|&&|\|\||[+\-*/%=<>!&|^~?:])/;
const punctuation = /^[{}[\]();,.:]/;

// Tokenize a line of code
export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    const remaining = line.slice(i);

    // Whitespace
    const whitespaceMatch = remaining.match(/^(\s+)/);
    if (whitespaceMatch) {
      tokens.push({ type: "text", value: whitespaceMatch[1] });
      i += whitespaceMatch[1].length;
      continue;
    }

    // Single-line comment
    if (remaining.startsWith("//")) {
      tokens.push({ type: "comment", value: remaining });
      break;
    }

    // String (double quotes)
    if (remaining[0] === '"') {
      const match = remaining.match(/^"(?:[^"\\]|\\.)*"/);
      if (match) {
        tokens.push({ type: "string", value: match[0] });
        i += match[0].length;
        continue;
      }
    }

    // String (single quotes)
    if (remaining[0] === "'") {
      const match = remaining.match(/^'(?:[^'\\]|\\.)*'/);
      if (match) {
        tokens.push({ type: "string", value: match[0] });
        i += match[0].length;
        continue;
      }
    }

    // Template literal
    if (remaining[0] === "`") {
      const match = remaining.match(/^`(?:[^`\\]|\\.)*`/);
      if (match) {
        tokens.push({ type: "string", value: match[0] });
        i += match[0].length;
        continue;
      }
    }

    // JSX string attribute
    if (remaining[0] === "{") {
      tokens.push({ type: "punctuation", value: "{" });
      i += 1;
      continue;
    }

    // Number
    const numberMatch = remaining.match(/^(\d+\.?\d*)/);
    if (numberMatch) {
      tokens.push({ type: "number", value: numberMatch[1] });
      i += numberMatch[1].length;
      continue;
    }

    // Operators
    const operatorMatch = remaining.match(operators);
    if (operatorMatch) {
      tokens.push({ type: "operator", value: operatorMatch[0] });
      i += operatorMatch[0].length;
      continue;
    }

    // Punctuation
    const punctuationMatch = remaining.match(punctuation);
    if (punctuationMatch) {
      tokens.push({ type: "punctuation", value: punctuationMatch[0] });
      i += punctuationMatch[0].length;
      continue;
    }

    // Identifier (word)
    const identifierMatch = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)/);
    if (identifierMatch) {
      const word = identifierMatch[1];
      let type: TokenType = "variable";

      if (keywords.has(word)) {
        type = "keyword";
      } else if (types.has(word)) {
        type = "type";
      } else if (remaining[word.length] === "(") {
        type = "function";
      } else if (
        word[0] === word[0].toUpperCase() &&
        word[0] !== word[0].toLowerCase()
      ) {
        type = "className";
      }

      tokens.push({ type, value: word });
      i += word.length;
      continue;
    }

    // JSX tags
    if (remaining[0] === "<") {
      const tagMatch = remaining.match(/^<\/?([a-zA-Z][a-zA-Z0-9]*)?/);
      if (tagMatch) {
        tokens.push({ type: "punctuation", value: "<" });
        i += 1;
        if (remaining[1] === "/") {
          tokens.push({ type: "punctuation", value: "/" });
          i += 1;
        }
        if (tagMatch[1]) {
          const tagType =
            tagMatch[1][0] === tagMatch[1][0].toUpperCase()
              ? "className"
              : "keyword";
          tokens.push({ type: tagType, value: tagMatch[1] });
          i += tagMatch[1].length;
        }
        continue;
      }
    }

    if (remaining[0] === ">") {
      tokens.push({ type: "punctuation", value: ">" });
      i += 1;
      continue;
    }

    // Default: single character
    tokens.push({ type: "text", value: remaining[0] });
    i += 1;
  }

  return tokens;
}

// Get color for token type
export function getTokenColor(type: TokenType): string {
  switch (type) {
    case "keyword":
      return syntax.keyword;
    case "string":
      return syntax.string;
    case "number":
      return syntax.number;
    case "comment":
      return syntax.comment;
    case "function":
      return syntax.function;
    case "className":
      return syntax.className;
    case "property":
      return syntax.property;
    case "operator":
      return syntax.operator;
    case "punctuation":
      return syntax.punctuation;
    case "type":
      return syntax.type;
    case "variable":
      return syntax.variable;
    default:
      return codeDisplayConfig.theme.text;
  }
}

interface HighlightedCodeProps {
  code: string;
}

// Component to render highlighted code
export const HighlightedCode: React.FC<HighlightedCodeProps> = ({ code }) => {
  const lines = code.split("\n");

  return (
    <>
      {lines.map((line, lineIndex) => {
        const tokens = tokenizeLine(line);
        return (
          <div key={lineIndex} style={{ minHeight: "1.6em" }}>
            {tokens.length === 0 ? (
              <span>&nbsp;</span>
            ) : (
              tokens.map((token, tokenIndex) => (
                <span
                  key={tokenIndex}
                  style={{
                    color: getTokenColor(token.type),
                    whiteSpace: "pre",
                  }}
                >
                  {token.value}
                </span>
              ))
            )}
          </div>
        );
      })}
    </>
  );
};
