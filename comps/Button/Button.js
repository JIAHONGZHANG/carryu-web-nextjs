import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Colors } from "../../styles/variables";

const Button = styled.button`
  padding: 6px 8px;
  color: ${(props) => props.color};
  /* NOTE:  || returns the first truthy value, while ?? returns the first non-null and non-undefined value. */
  background-color: ${(props) => props.backgroundColor ?? Colors.White};
  border-radius: 4px;
  cursor: pointer;
`;
// NOTE:
export const ButtonCom = (props) => <Button {...props} />;

export default ButtonCom;
Button.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};
