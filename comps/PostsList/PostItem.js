import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import { Colors, PrimaryColor } from "../../styles/variables";
import { urlFor } from "../../utils/sanity-utils";
import { FileIcon, DateIcon } from "../Icons";
import { getPostDate } from "../../utils/helper";
const PostItemContainer = styled.div`
  display: flex;
  gap: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;
const ThumbnailContainer = styled.img`
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
  font-size: 1rem;
  font-weight: 400;
  line-height: 24px;
`;

const TextAlignContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PostButton = styled(Button)`
  border: 0;
  align-self: flex-end;
`;

export default function PostItem({
  id,
  tagsData,
  thumbnail,
  title,
  date,
  tags,
}) {
  const router = useRouter();
  const handlePostDetail = (e) => {
    e.preventDefault();
    router.push(`/posts/${id}`);
  };
  return (
    <PostItemContainer>
      <ThumbnailContainer
        src={urlFor(thumbnail).width(400).height(250).url()}
        alt="thumbnail"
      />

      <PostContentContainer>
        <PostTitle>{title}</PostTitle>
        <TextAlignContainer>
          <FileIcon />
          <TextAlignContainer>
            {tags.map((tag, i) => (
              <p key={i}>{tagsData[tag._ref]}</p>
            ))}
          </TextAlignContainer>
        </TextAlignContainer>
        <TextAlignContainer>
          <DateIcon />
          <p>{getPostDate(date)}</p>
        </TextAlignContainer>
        <PostButton
          onClick={(e) => {
            handlePostDetail(e);
          }}
          color={Colors.White}
          label="阅读更多"
          backgroundColor={PrimaryColor}
        />
      </PostContentContainer>
    </PostItemContainer>
  );
}
