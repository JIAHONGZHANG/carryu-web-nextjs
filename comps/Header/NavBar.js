import { useContext, useState } from "react";
import styled from "styled-components/macro";
import { WindowWidthContext } from "../../pages/WindowWidthContextProvider";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

const NavBarContainer = styled.header`
  position: relative;
`;

const Navbar = () => {
  const width = useContext(WindowWidthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <NavBarContainer>
      {width > 850 ? (
        <DesktopNavBar />
      ) : (
        <MobileNavBar
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </NavBarContainer>
  );
};
export default Navbar;
