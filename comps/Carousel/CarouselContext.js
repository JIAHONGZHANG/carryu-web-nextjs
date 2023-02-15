import React from "react";
import PropTypes from "prop-types";
import Carousel from "./Carousel";
export const CarouselContext = React.createContext({
  sliderImageSrcs: [],
  sliderAlts: [],
  isPost: null,
});

export const CarouselContextProvider = ({ value, children }) => {
  return (
    <CarouselContext.Provider value={value}>
      {children}
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
