import React from "react";
import { useContext } from "react";
import Slider from "../Slider/Slider";
import { CarouselContext } from "../CarouselContext";

export default function SliderList() {
  const { sliderImageSrcs, sliderAlts, isPost, sliderLinks } =
    useContext(CarouselContext);

  if (!sliderImageSrcs) {
    return null;
  }

  return sliderImageSrcs.map((sliderImageSrc, i) => (
    <Slider
      key={i}
      src={sliderImageSrc}
      alt={sliderAlts[i]}
      isPost={isPost}
      link={sliderLinks[i]}
    />
  ));
}
