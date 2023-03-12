import { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Colors } from "../../styles/variables";
import { WindowWidthContext } from "../WindowWidthContextProvider";
import Link from "next/link";
const FooterContainer = styled.footer`
  > p {
    color: ${Colors.Black};
  }
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  padding: 3rem 0;
  color: ${Colors.White};
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  background-color: ${Colors.YellowPrimary};
`;
const FooterWrapper = styled.div`
  color: ${Colors.Black};
  display: ${(props) => (props.width <= 850 ? "grid" : "flex")};
  gap: 8px;
  @media screen and (min-width: 300px) and (max-width: 850px) {
    display: grid;
  }
`;
const FooterLink = styled.a`
  text-decoration: none;
  color: ${Colors.Black};
  :visited {
    color: inherit;
  }
  :hover {
    color: ${Colors.SecondaryColor};
  }
`;

const FooterInternalLink = styled(Link)`
  text-decoration: none;
  color: ${Colors.Black};
  :visited {
    color: inherit;
  }
  :hover {
    color: ${Colors.SecondaryColor};
  }
`;

export default function Footer({ footerData }) {
  const width = useContext(WindowWidthContext);

  return (
    <FooterContainer>
      <p>@2022 CarryU留学移民教育 All Rights Reserved</p>
      {footerData && (
        <FooterWrapper width={width}>
          <span>友情链接:</span>
          {footerData.map(({ Url, text, InternalUrl }, i) =>
            InternalUrl ? (
              <FooterInternalLink
                key={i}
                href={`/posts/${InternalUrl}`}
                target={"_blank"}
              >
                {text}
              </FooterInternalLink>
            ) : (
              <FooterLink key={i} href={Url} target={"_blank"}>
                {text}
              </FooterLink>
            )
          )}
        </FooterWrapper>
      )}
    </FooterContainer>
  );
}
Footer.propTypes = {
  footerData: PropTypes.array.isRequired,
};
