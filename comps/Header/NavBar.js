import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Colors } from "../../styles/variables";
import useResizeObserver from "use-resize-observer";
import { HeaderIcon } from "../Icons";

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  /* max-width: 960px; */
  /* margin: 0 auto; */
`;
const Logo = styled.a`
  > img {
    width: 200px;
  }
  text-decoration: none;
`;

const LinkContainer = styled.ul`
  display: flex;
  gap: 20px;
`;

const LinkBtn = styled(Link)`
  color: ${Colors.Black};
  text-decoration: none;
  :hover {
    color: ${Colors.SecondaryColor};
  }
`;

const Navbar = () => {
  const { ref, width } = useResizeObserver();
  return (
    <Nav ref={ref}>
      <Logo href="/">
        <img src="/logo.png" alt="CarryU Logo" />
      </Logo>
      {width > 850 ? (
        <LinkContainer>
          <LinkBtn href="/">首页</LinkBtn>
          <LinkBtn href="/events">留学申请</LinkBtn>
          <LinkBtn href="/annual">澳洲移民</LinkBtn>
          <LinkBtn href="/team">澳洲签证</LinkBtn>
          <LinkBtn href="/posts">新闻快递</LinkBtn>
          <LinkBtn href="/sign-up">往期活动</LinkBtn>
          <LinkBtn href="/sign-up">关于我们</LinkBtn>
        </LinkContainer>
      ) : (
        <HeaderIcon />
      )}

      {/* Second Nav */}
      {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
    </Nav>
  );
};
export default Navbar;
