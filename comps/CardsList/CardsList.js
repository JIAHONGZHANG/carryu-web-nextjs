// "use client";
import { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
import Card from "../Card/Card";
import styled from "styled-components";
import { WindowWidthContext } from "../../pages/WindowWidthContextProvider";
const CardsListsContainer = styled.div`
  overflow: hidden;
  position: relative;
  // NOTE: need to give some dimensions so they don’t collapse (container or the cards).
  width: 100%;
  height: 250px;
`;
const CardsListsWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 0;
`;
const CardsListWrapper = styled.div`
  display: flex;
`;
const CardWrapper = styled.div`
  width: ${(props) => props.cardWidth};
  padding: 0 20px 10px 0;
`;

export default function CardsList({ sampleListData }) {
  const cardWrapperRef = useRef(null);
  const width = useContext(WindowWidthContext);
  const numberOfSliders = sampleListData.length;
  const cardWidth = width <= 850 ? "272px" : "448px";
  let count = 0;
  useEffect(() => {
    cardWrapperRef.current.style.transform = `translateX(-${
      count * parseInt(cardWidth)
    }px`;
    const id = setInterval(() => {
      if (count === numberOfSliders) {
        count = 0;
        cardWrapperRef.current.style.transition = "none";
        cardWrapperRef.current.style.transform = `translateX(-${
          count * parseInt(cardWidth)
        }px`;
      } else {
        count++;
        cardWrapperRef.current.style.transform = `translateX(-${
          count * parseInt(cardWidth)
        }px`;
        cardWrapperRef.current.style.transition = "transform 1s ease-in-out";
      }
    }, 2000);
    return () => clearInterval(id);
  }, [width]);
  return (
    <CardsListsContainer>
      <CardsListsWrapper ref={cardWrapperRef} width={width}>
        <CardsListWrapper>
          {sampleListData.map((data, i) => (
            <CardWrapper key={i} width={width} cardWidth={cardWidth}>
              <Card
                width={width}
                title={`恭喜${data.postName}`}
                content={data.postText}
              />
            </CardWrapper>
          ))}
        </CardsListWrapper>
        <CardsListWrapper>
          {sampleListData.map((data, i) => (
            <CardWrapper key={i} width={width} cardWidth={cardWidth}>
              <Card
                width={width}
                title={`恭喜${data.postName}`}
                content={data.postText}
              />
            </CardWrapper>
          ))}
        </CardsListWrapper>
      </CardsListsWrapper>
    </CardsListsContainer>
  );
}
CardsList.propTypes = {
  sampleListData: PropTypes.array.isRequired,
};
