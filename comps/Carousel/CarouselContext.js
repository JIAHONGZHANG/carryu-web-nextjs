import React from "react";
import PropTypes from "prop-types";

export const CarouselContext = React.createContext(null);

export const CarouselContextProvider = (props) => {
  return (
    <CarouselContext.Provider value={props.value}>
      {props.children}
    </CarouselContext.Provider>
  );
};
// NOTE: An object taking on a particular shape
CarouselContextProvider.propTypes = {
  optionalObjectWithShape: PropTypes.shape({
    sliderImageSrcs: PropTypes.array.isRequired,
    sliderAlts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }),
};
