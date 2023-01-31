"use client";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
import { CardsListContextProvider } from "./CardsListContext";
import Card from "../Card/Card";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer";

const CardsListsContainer = styled.div`
  overflow: hidden;
  position: relative;
  // NOTE: need to give some dimensions so they don’t collapse (container or the cards).
  width: 100%;
  height: 250px;
`;
const CardsListsWrapper = styled.div`
  /* width: 200%; */
  display: flex;
  position: absolute;
  left: 0;
  /* animation: ${(props) =>
    props.width <= 850
      ? "marquee 5s linear infinite"
      : "marquee 10s linear infinite"};
  :hover {
    animation-play-state: paused;
  }
  @keyframes marquee {
    0% {
      left: 0;
    }
    100% {
      left: -50%;
    }
  } */
`;
const CardsListWrapper = styled.div`
  /* width: 50%; */
  /* overflow: hidden; */
  display: flex;
`;
const CardWrapper = styled.div`
  width: ${(props) => props.cardWidth};
  padding: 0 20px 10px 0;
  /* flex: ${(props) => `0 0 ${props.slidesToShow}`};
  @media screen and (min-width: 300px) and (max-width: 850px) {
    flex-basis: 50%;
  } */
`;

export default function CardsList({ sampleListData }) {
  const cardWrapperRef = useRef(null);
  const numberOfSliders = sampleListData.length;

  const { ref, width } = useResizeObserver();
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
    <CardsListContextProvider value={{ sampleListData }}>
      <CardsListsContainer ref={ref}>
        <CardsListsWrapper ref={cardWrapperRef} width={width}>
          <CardsListWrapper>
            {sampleListData.map((data, i) => (
              <CardWrapper
                key={i}
                width={width}
                // slidesToShow={slidesToShow}
                cardWidth={cardWidth}
              >
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
              <CardWrapper
                key={i}
                width={width}
                // slidesToShow={slidesToShow}
                cardWidth={cardWidth}
              >
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
    </CardsListContextProvider>
  );
}
CardsList.propTypes = {
  sampleListData: PropTypes.array.isRequired,
};
