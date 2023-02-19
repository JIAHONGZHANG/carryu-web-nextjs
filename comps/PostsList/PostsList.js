import React from "react";
import styled from "styled-components";
import PostItem from "./PostItem";
const PostsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export default function PostsList({ width, data, tagsData }) {
  return (
    <PostsListContainer>
      {data.map((post, i) => (
        <PostItem
          key={i}
          width={width}
          id={post._id}
          tagsData={tagsData}
          thumbnail={post.thumbnail.asset}
          title={post.title}
          date={post._updatedAt}
          tags={post.myTags}
        />
      ))}
    </PostsListContainer>
  );
}
