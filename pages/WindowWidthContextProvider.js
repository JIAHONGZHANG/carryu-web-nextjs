import React from "react";
import { createContext } from "react";
import PropTypes from "prop-types";

export const WindowWidthContext = createContext(0);

export default function WindowWidthContextProvider({ value, children }) {
  return (
    <WindowWidthContext.Provider value={value}>
      {children}
    </WindowWidthContext.Provider>
  );
}

// HomePageContextProvider.propTypes = {
//   width: PropTypes.string.isRequired,
// };
