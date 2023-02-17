import { HeaderOpenIcon, HeaderCloseIcon } from "../Icons";
import styled from "styled-components";
import { Nav, LinkBtn, Logo } from "./DesktopNavBar";

const MobileHeader = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  background-color: #fff;
  position: fixed;
  > p {
    text-align: center;
    margin-top: auto;
  }
`;

const ModalControlBtn = styled.span`
  cursor: pointer;
`;

const MobileLinkContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 2rem;
`;

export default function MobileNavBar({ isModalOpen, setIsModalOpen }) {
  const handleClick = (e) => {
    e.preventDefault();
    setIsModalOpen(!isModalOpen);
  };

  const clearModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen ? (
        <MobileHeader>
          <Nav>
            <Logo href="/">
              <img src="/logo.png" alt="CarryU Logo" />
            </Logo>
            <ModalControlBtn onClick={handleClick}>
              <HeaderCloseIcon />
            </ModalControlBtn>
          </Nav>
          <MobileLinkContainer>
            <LinkBtn href="/" onClick={clearModal}>
              首页
            </LinkBtn>
            <LinkBtn href="/posts" onClick={clearModal}>
              留学申请
            </LinkBtn>
            <LinkBtn href="/immigrant" onClick={clearModal}>
              澳洲移民
            </LinkBtn>
            <LinkBtn href="/posts" onClick={clearModal}>
              澳洲签证
            </LinkBtn>
            <LinkBtn href="/posts" onClick={clearModal}>
              新闻快递
            </LinkBtn>
            <LinkBtn href="/posts" onClick={clearModal}>
              往期活动
            </LinkBtn>
            <LinkBtn href="/sign-up" onClick={clearModal}>
              关于我们
            </LinkBtn>
          </MobileLinkContainer>
          <p>@2022 CarryU留学移民教育 All Rights Reserved</p>
        </MobileHeader>
      ) : (
        <Nav>
          <Logo href="/">
            <img src="/logo.png" alt="CarryU Logo" />
          </Logo>
          <ModalControlBtn onClick={handleClick}>
            <HeaderOpenIcon />
          </ModalControlBtn>
        </Nav>
      )}
    </>
  );
}
