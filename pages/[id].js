import React from "react";
import styled from "styled-components";
import { H2 } from "../comps/Typography";
import {
  FontWeights,
  Shadows,
  PrimaryColor,
  Colors,
} from "../styles/variables";
import { getPostsQuery } from "../utils/queries";
import { client } from "../utils/sanity-utils";

const PostWrapper = styled.div`
  max-width: 800px;
  padding: 0 auto;
  text-align: center;
`;

export async function getStaticProps(context) {
  const id = context.params.postId;
  const post = await client.fetch(`*[_type == "posts" && _id == '${id}' ]`);
  // TODO: fetch footer data once
  const carousel = await client.fetch(carouselQuery);
  const footer = await client.fetch(footerQuery);
  const tagsData = await client.fetch(tagsListQuery);
  const tagsList = tagsData.map((data) => data.tag);
  return {
    props: { post, carousel, tagsList, footer },
  };
}

export async function getStaticPaths() {
  const posts = await client.fetch(getPostsQuery(0, 4));
  const paths = posts.map((post) => {
    return { params: { postId: post._id.toString() } };
  });
  return { paths, fallback: false };
}
