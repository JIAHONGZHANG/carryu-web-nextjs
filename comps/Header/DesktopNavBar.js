import React, { useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Colors } from "../../styles/variables";
import Link from "next/link";
import SiteSettingsContext from "../../contexts/siteSettings";
import { urlFor } from "../../utils/sanity-utils";
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
  &.active {
    color: ${Colors.SecondaryColor};
  }
  :hover {
    color: ${Colors.SecondaryColor};
  }
`;

const navItems = [
  {
    name: "首页",
    href: "/",
  },
  {
    name: "留学申请",
    href: "/study-application",
  },
  {
    name: "澳洲移民",
    href: "/immigration",
  },
  {
    name: "澳洲签证",
    href: "/au-visa",
  },
  {
    name: "新闻快递",
    href: "/posts",
  },
  {
    name: "往期活动",
    href: "/events",
  },
  {
    name: "关于我们",
    href: "/about-us",
  },
];

export default function DesktopNavBar() {
  const router = useRouter();
  const siteSettingsContext = useContext(SiteSettingsContext);

  return (
    <Nav>
      <Logo href="/">
        {/* urlFor(asset).width(300).height(200).url() */}
        <img
          src={urlFor(siteSettingsContext.logoAsset).width(200).url()}
          alt="logo"
        />
      </Logo>
      <LinkContainer>
        {navItems.map((ele, idx) => (
          <LinkBtn
            href={ele.href}
            key={idx}
            className={router.pathname === ele.href ? "active" : ""}
          >
            {ele.name}
          </LinkBtn>
        ))}
      </LinkContainer>
    </Nav>
  );
}
