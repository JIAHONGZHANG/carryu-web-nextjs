import React from "react";
import { createContext } from "react";

export const WindowWidthContext = createContext(0);

export default function WindowWidthContextProvider({ value, children }) {
  return (
    <WindowWidthContext.Provider value={value}>
      {children}
    </WindowWidthContext.Provider>
  );
}
