import styled from "styled-components";
import { Colors } from "../../styles/variables";
//NOTE: naming here usually some big container we use name container, some small ones we use wrapper is fine

export const IconWrapper = styled.span`
  margin: 1rem 0 12px 1rem;
  // can use props to pass width or height
  width: ${(props) => props.iconWidth};
  /* NOTE:  */
  > svg {
    width: 100%;
    height: 100%;
  }
`;

export const PostIconWrapper = styled.span`
  display: inline-block;
  text-align: center;
  font-size: 16px;
  padding: 2px;
  vertical-align: middle;
  cursor: pointer;
  padding-left: 4px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const HeaderIconWrapper = styled.span`
  display: inline-block;
  text-align: center;
  font-size: 16px;
  padding: 2px;
  vertical-align: middle;
  cursor: pointer;
  padding-left: 4px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

// 1st
// word-break: normal;

//2st
// align icon text
// 3 properties check Jonas
// vertical-align: middle;
// line-height
// margin-top

//3st
// margin-top: -1px;
// margin-left: 4px;
