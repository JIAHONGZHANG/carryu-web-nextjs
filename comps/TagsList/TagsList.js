import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { H2 } from "../Typography";
import { Colors, FontWeights, Shadows } from "../../styles/variables";
import { TagsListCloseBtn } from "../Icons";
const TagsListContainer = styled.div`
  padding: 24px 16px;
  border-radius: 4px;
  box-shadow: ${Shadows.Medium};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TagsListTitleContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const TagsListTitle = styled(H2)`
  line-height: 100%;
  font-size: 30px;
`;

const ToggleBtn = styled.a`
  cursor: pointer;
`;

const Tag = styled.a`
  font-size: 1rem;
  font-weight: ${FontWeights.Normal};
  text-decoration: none;
  cursor: pointer;
  :visited {
    color: inherit;
  }
  :hover {
    color: ${Colors.SecondaryColor};
  }
`;

export default function TagsList({ width, tagsList }) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const handlePostsWithTag = (e, tag) => {
    e.preventDefault();
    router.push(`/posts?tag=${tag}`);
  };
  return (
    <>
      {width > 850 ? (
        <TagsListContainer>
          <TagsListTitle>列表</TagsListTitle>
          {tagsList.map((tag, i) => (
            <Tag
              onClick={(e) => {
                handlePostsWithTag(e, tag.tag);
              }}
              key={i}
              // href="/"
            >
              {tag.tag}
            </Tag>
          ))}
        </TagsListContainer>
      ) : (
        <TagsListContainer>
          <TagsListTitleContainer>
            <TagsListTitle>列表</TagsListTitle>
            {isOpen ? (
              <ToggleBtn onClick={() => setIsOpen(!isOpen)}>
                <TagsListCloseBtn style={{ color: "red" }} />
              </ToggleBtn>
            ) : (
              <ToggleBtn onClick={() => setIsOpen(!isOpen)}>{">"}</ToggleBtn>
            )}
          </TagsListTitleContainer>
          {isOpen &&
            tagsList.map((tag, i) => (
              <Tag
                onClick={(e) => {
                  handlePostsWithTag(e, tag.tag);
                }}
                key={i}
                // href="/"
              >
                {tag.tag}
              </Tag>
            ))}
        </TagsListContainer>
      )}
    </>
  );
}
