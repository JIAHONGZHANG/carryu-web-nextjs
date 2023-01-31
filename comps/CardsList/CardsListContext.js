import React from "react";
import PropTypes from "prop-types";

export const CardsListContext = React.createContext(null);

export const CardsListContextProvider = (props) => {
  return (
    <CardsListContext.Provider value={props.value}>
      {props.children}
    </CardsListContext.Provider>
  );
};
