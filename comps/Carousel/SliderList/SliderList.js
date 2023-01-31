import React from "react";
import { useContext } from "react";
import Slider from "../Slider/Slider";
import { CarouselContext } from "../CarouselContext";

export default function SliderList() {
  const { sliderImageSrcs, sliderAlts, isPost } = useContext(CarouselContext);

  //GOOGLE: skeleton
  return sliderImageSrcs.map((sliderImageSrc, i) => (
    <Slider key={i} src={sliderImageSrc} alt={sliderAlts[i]} isPost={isPost} />
  ));
}
