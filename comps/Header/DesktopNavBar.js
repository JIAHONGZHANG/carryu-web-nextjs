import React from "react";
import styled from "styled-components/macro";
import { Colors } from "../../styles/variables";
import Link from "next/link";
const LinkContainer = styled.ul`
  display: flex;
  gap: 20px;
`;

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;
export const Logo = styled.a`
  > img {
    width: 200px;
  }
`;

export const LinkBtn = styled(Link)`
  color: ${Colors.Black};
  text-decoration: none;
  :hover {
    color: ${Colors.SecondaryColor};
  }
`;

export default function DesktopNavBar() {
  return (
    <Nav>
      <Logo href="/">
        <img src="/logo.png" alt="CarryU Logo" />
      </Logo>
      <LinkContainer>
        <LinkBtn href="/">首页</LinkBtn>
        <LinkBtn href="/posts">留学申请</LinkBtn>
        <LinkBtn href="/immigration">澳洲移民</LinkBtn>
        <LinkBtn href="/posts">澳洲签证</LinkBtn>
        <LinkBtn href="/posts">新闻快递</LinkBtn>
        <LinkBtn href="/posts">往期活动</LinkBtn>
        <LinkBtn href="/sign-up">关于我们</LinkBtn>
      </LinkContainer>
    </Nav>
  );
}
