# Sample Code

```typescript
// Example: React Component with TypeScript
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

export default UserProfile;
```
