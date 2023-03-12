import Carousel from "../Carousel";
import { faker } from "@faker-js/faker";

const imgSrcs = Array(10)
  .fill(null)
  .map((_) => faker.image.animals());

export default {
  title: "Carousel",
  component: Carousel,
};

const Template = (args) => <Carousel {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  sliderImageSrcs: imgSrcs,
  sliderAlts: [],
  isLoading: false,
};
