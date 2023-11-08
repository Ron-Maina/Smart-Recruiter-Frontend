import {useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse and return stored json or, if undefined, return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error, return initialValue
        console.error("Error getting data from local storage:", error);
        return initialValue;
      }
    });
  
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        // Update state
        setStoredValue(valueToStore);
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.error("Error setting data in local storage:", error);
      }
    };
  
    return [storedValue, setValue];
}

export default useLocalStorage;

