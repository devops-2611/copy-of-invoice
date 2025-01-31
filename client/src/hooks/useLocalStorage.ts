import { useState } from "react";

// Define a generic type for the hook to handle any data type
export const useLocalStorage = <T>(
  keyName: string,
  defaultValue: T,
): [T, (newValue: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get the stored value from localStorage
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        // If not found, set the default value in localStorage and return it
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error("Error reading localStorage", err);
      return defaultValue;
    }
  });

  const setValue = (newValue: T): void => {
    try {
      // Set the new value in localStorage
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.error("Error setting localStorage", err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
