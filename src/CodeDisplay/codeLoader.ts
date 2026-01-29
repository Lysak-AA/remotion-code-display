// Utility to load code from markdown files
// In Remotion, you can import markdown files as static assets

// Sample code content (used as fallback or for testing)
export const sampleCode = `// Example: React Component with TypeScript
import React, { useState, useEffect } from 'react';

interface UserProps {
  name: string;
  age: number;
  isActive: boolean;
}

const UserProfile: React.FC<UserProps> = ({ name, age, isActive }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Component mounted!');
    return () => {
      console.log('Cleanup...');
    };
  }, []);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="user-profile">
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <button onClick={handleClick}>
        Clicked {count} times
      </button>
    </div>
  );
};

export default UserProfile;`;

// Helper function to fetch markdown content at runtime
export async function loadCodeFromMarkdown(url: string): Promise<string> {
  const response = await fetch(url);
  const text = await response.text();

  // Extract code from markdown code block
  const codeBlockRegex = /```[\w]*\n([\s\S]*?)```/;
  const match = text.match(codeBlockRegex);
  return match ? match[1].trim() : text;
}

// Predefined code samples for different scenarios
export const codeSamples = {
  typescript: sampleCode,

  python: `# Python Example
import asyncio
from typing import List, Optional

class DataProcessor:
    def __init__(self, name: str):
        self.name = name
        self.data: List[int] = []
    
    async def process(self, items: List[int]) -> Optional[int]:
        """Process items and return sum."""
        if not items:
            return None
        
        self.data = items
        await asyncio.sleep(0.1)
        
        return sum(self.data)

# Usage
processor = DataProcessor("main")
result = asyncio.run(processor.process([1, 2, 3]))
print(f"Result: {result}")`,

  javascript: `// JavaScript Module Pattern
const Calculator = (function() {
  // Private variables
  let history = [];
  
  // Private function
  function logOperation(op, a, b, result) {
    history.push({ op, a, b, result });
  }
  
  // Public API
  return {
    add(a, b) {
      const result = a + b;
      logOperation('add', a, b, result);
      return result;
    },
    
    subtract(a, b) {
      const result = a - b;
      logOperation('subtract', a, b, result);
      return result;
    },
    
    getHistory() {
      return [...history];
    }
  };
})();

console.log(Calculator.add(5, 3));
console.log(Calculator.getHistory());`,

  css: `/* Modern CSS with Custom Properties */
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --background: #0f0f23;
  --text: #e0e0e0;
  --radius: 12px;
}

.card {
  background: linear-gradient(
    135deg,
    var(--primary),
    var(--secondary)
  );
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: translateY(-4px);
    transition: transform 0.3s ease;
  }
}`,
};
