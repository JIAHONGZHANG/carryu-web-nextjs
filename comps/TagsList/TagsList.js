import React from "react";
import styled from "styled-components";
import { H2 } from "../Typography";
import { FontWeights, Shadows } from "../../styles/variables";
const TagsListContainer = styled.div`
  padding: 24px 16px;
  border-radius: 4px;
  box-shadow: ${Shadows.Medium};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TagsListTitle = styled(H2)`
  line-height: 100%;
  font-size: 30px;
`;

const Tag = styled.a`
  font-size: 1rem;
  font-weight: ${FontWeights.Normal};
`;
export default function TagsList({ tagsList }) {
  const handlePostsWithTag = (e) => {
    e.preventDefault();
    console.log("click");
  };
  return (
    <TagsListContainer>
      <TagsListTitle>列表</TagsListTitle>
      {tagsList.map((tag, i) => (
        // TODO: add link to tag page
        <Tag
          onClick={(e) => {
            handlePostsWithTag(e);
          }}
          key={i}
          href="/"
        >
          {tag.tag}
        </Tag>
      ))}
    </TagsListContainer>
  );
}
