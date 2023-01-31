import Card from "./Card";
import { PrimaryColor } from "../../styles/variables";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Card",
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "恭喜李同学",
  titleBackgroundColor: Colors.GreyPrimary,
  color: "#fff",
  // label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  //👇 The args you need here will depend on your component
  // label: "Button",
  title: "恭喜李同学",
  titleBackgroundColor: PrimaryColor,
  color: "#000",
};
