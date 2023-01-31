import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Colors } from "../../styles/variables";

const Button = styled.button`
  padding: 6px 8px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 4px;
  cursor: pointer;
`;
// NOTE:
export const ButtonCom = ({
  onClick,
  color,
  label,
  backgroundColor = Colors.White,
  className,
}) => (
  <Button
    onClick={onClick}
    color={color}
    backgroundColor={backgroundColor}
    className={className}
  >
    {label}
  </Button>
);

export default ButtonCom;
Button.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  backgroundColor: PropTypes.string,
};
