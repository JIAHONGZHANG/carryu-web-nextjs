// "use client";
import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { Shadows, Colors } from "../../styles/variables";
import { P, H3 } from "../Typography";
import { IconWrapper } from "../Icons/styles";
import { SuccessIcon } from "../Icons";

const StyledCard = styled.article`
  box-shadow: ${Shadows.Medium};
  width: 100%;
  height: 100%;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px 4px 0 0;
  gap: 16px;
  background-color: ${(props) => props.titleBackgroundColor};
`;

const CardTitleTextContainer = styled(H3)`
  margin: 0;
  //NOTE: try use 4px based number
  padding: 20px 0;
  font-size: ${(props) => props.fontSize};
`;

const TextContainer = styled(P)`
  background-color: ${Colors.White};
  padding: 1rem;
  width: 100%;
  border-radius: 0 0 4px 4px;
  height: ${(props) => (props.width <= 850 ? "120px" : "90px")};
  overflow: hidden;
`;

export default function Card({
  width,
  title,
  content,
  titleBackgroundColor = Colors.GreyPrimary,
}) {
  const fontSize = width <= 850 ? "18px" : "";
  const iconWidth = width <= 850 ? "36px" : "66px";
  return (
    <StyledCard>
      <StyledTitleContainer titleBackgroundColor={titleBackgroundColor}>
        <IconWrapper iconWidth={iconWidth}>
          {/* NOTE: third party icon will not support this */}
          {/* <img src={AcUnitIcon} alt="success icon" width={"80%"} /> */}
          <SuccessIcon />
        </IconWrapper>
        <CardTitleTextContainer fontSize={fontSize}>
          {title}
        </CardTitleTextContainer>
      </StyledTitleContainer>
      <TextContainer width={width}>{content}</TextContainer>
    </StyledCard>
  );
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
