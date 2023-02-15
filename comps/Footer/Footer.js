import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer";
import { Colors, PrimaryColor } from "../../styles/variables";
const FooterContainer = styled.footer`
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  padding: 3rem 0;
  color: ${Colors.White};
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  background-color: ${PrimaryColor};
`;
const FooterWrapper = styled.div`
  display: ${(props) => (props.width <= 850 ? "grid" : "flex")};
  gap: 8px;
  @media screen and (min-width: 300px) and (max-width: 850px) {
    display: grid;
  }
`;
const FooterLink = styled.a`
  text-decoration: none;
  color: ${Colors.White};
  :visited {
    color: inherit;
  }
  :hover {
    color: inherit;
  }
`;

export default function Footer({ footerData }) {
  const { ref, width } = useResizeObserver();
  return (
    <FooterContainer ref={ref}>
      <p>@2022 CarryU留学移民教育 All Rights Reserved</p>
      <FooterWrapper width={width}>
        <span>友情链接:</span>
        {footerData.map((data, i) => (
          <FooterLink key={i} href={data.Url} target={"_blank"}>
            {data.text}
          </FooterLink>
        ))}
      </FooterWrapper>
    </FooterContainer>
  );
}
Footer.propTypes = {
  footerData: PropTypes.array.isRequired,
};
