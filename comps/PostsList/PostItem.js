import React from "react";
import styled from "styled-components/macro";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import { Text } from "../Typography";
import { Colors, PrimaryColor } from "../../styles/variables";
import { urlFor } from "../../utils/sanity-utils";
import { FileIcon, DateIcon } from "../Icons";
import { getPostDate } from "../../utils/helper";
import { PostTextGap } from "../../styles/mixins";
const PostItemContainer = styled.div`
  display: ${(props) => (props.width > 850 ? "flex" : "block")};
  gap: ${(props) => (props.width > 850 ? "20px" : "")};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;
const ThumbnailContainer = styled.img`
  cursor: pointer;
  width: 100%;
  border-radius: 4px 0 0 4px;
`;
const PostContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 20px;
`;

const PostTitle = styled.p`
  cursor: pointer;
  font-weight: 400;
  line-height: 24px;
`;

const PostText = styled(Text)`
  font-weight: 400;
  line-height: 24px;
`;

const TextAlignContainer = styled.div`
  ${PostTextGap}
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PostButton = styled(Button)`
  background-color: ${Colors.SecondaryColor};
  border: 0;
  align-self: flex-end;
  padding: 10px 20px;
  :hover {
    background-color: ${Colors.PrimaryColor};
  }
`;

export default function PostItem({
  width,
  id,
  tagsData,
  thumbnail,
  title,
  date,
  tags,
}) {
  const router = useRouter();
  const handlePostDetail = (e, id) => {
    e.preventDefault();
    router.push(`/posts/${id}`);
  };
  return (
    <PostItemContainer width={width}>
      <ThumbnailContainer
        onClick={(e) => {
          handlePostDetail(e, id);
        }}
        src={urlFor(thumbnail).width(400).height(250).url()}
        alt="thumbnail"
      ></ThumbnailContainer>

      <PostContentContainer>
        <PostTitle
          onClick={(e) => {
            handlePostDetail(e, id);
          }}
        >
          {title}
        </PostTitle>
        <TextAlignContainer>
          <FileIcon />
          <TextAlignContainer>
            {tags.map((tag, i) => (
              <PostText key={i}>{tagsData[tag._ref]}</PostText>
            ))}
          </TextAlignContainer>
        </TextAlignContainer>
        <TextAlignContainer>
          <DateIcon />
          <PostText>{getPostDate(date)}</PostText>
        </TextAlignContainer>
        {/* NOTE: Whenever we call a prop 'children', it will automatically set equal to whatever is between the opening and closing tag.*/}
        <PostButton
          onClick={(e) => {
            handlePostDetail(e, id);
          }}
          color={Colors.White}
          backgroundColor={PrimaryColor}
        >
          阅读更多
        </PostButton>
      </PostContentContainer>
    </PostItemContainer>
  );
}
