import React from "react";
import styled from "styled-components";
import PortableText from "@sanity/block-content-to-react";
import { client, urlFor } from "../../utils/sanity-utils";
import { H2 } from "../../comps/Typography";
import {
  FontWeights,
  Shadows,
  PrimaryColor,
  Colors,
} from "../../styles/variables";
import { GridMax, DynamicCol } from "../../styles/layout";
import {
  carouselQuery,
  tagsListQuery,
  footerQuery,
  postsQuery,
} from "../../utils/queries";
import Carousel from "../../comps/Carousel/Carousel";
import Footer from "../../comps/Footer/Footer";
import TagsList from "../../comps/TagsList/TagsList";
const serializers = {
  marks: {
    link: ({ children, mark }) => (
      <a
        href={mark.href}
        target={mark.blank ? "_blank" : "_self"}
        rel="noopener"
      >
        {children}
      </a>
    ),
  },
  types: {
    mainImage: (props) => (
      <img
        src={urlFor(props.node.image.asset).width(400).url()}
        alt={props.node.alt}
      />
    ),
  },
};

const PostContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const PostWrapper = styled.div`
  border: 1px solid ${Colors.BorderColor};
  flex-grow: 1;
`;

const Thumbnail = styled.img`
  width: 100%;
`;

const PostTitle = styled(H2)`
  line-height: 100%;
`;

const PostTextWrapper = styled.div`
  padding: 24px;
`;
export default function BlogPost({ post, carousel, tagsListData, footer }) {
  console.log("🚀 ~ file: [postId].js:67 ~ BlogPost ~ post", post);
  // console.log("🚀 ~ file: [postId].js:67 ~ BlogPost ~ tagsData", tagsListData);
  const postDetail = post[0];
  const blocks = post.postContent;

  return (
    <PostContainer>
      <Carousel
        sliderImageSrcs={carousel.map((imgSrc) =>
          urlFor(imgSrc.image.image.asset).width(400).url()
        )}
        sliderAlts={carousel.map((imgSrc) => imgSrc.image.alt)}
        isPost={true}
      />
      <GridMax>
        <DynamicCol ratio={8}>
          <PostWrapper>
            <Thumbnail src={urlFor(postDetail.thumbnail.asset).url()} alt="" />
            {/* TODO: show tag */}
            <p>Date: {postDetail._updatedAt.slice(0, 10)}</p>
            <p>
              Categories:{" "}
              {tagsListData.map((tag) => (
                <span>{tag.tag} </span>
              ))}
            </p>
            <PostTitle>{postDetail.title}</PostTitle>
            <PostTextWrapper>
              <PortableText blocks={blocks} serializers={serializers} />
            </PostTextWrapper>
          </PostWrapper>
        </DynamicCol>
        <DynamicCol ratio={4}>
          <TagsList tagsList={tagsListData} />
        </DynamicCol>
      </GridMax>
      <Footer footerData={footer} />
    </PostContainer>
  );
}
// NOTE: We must use getStaticPaths and getStaticProps together, we cannot use getStaticPaths without getStaticProps, but we can use getStaticProps without getStaticPaths.
export async function getStaticProps(context) {
  const id = context.params.postId;
  const postDetailData = await Promise.all([
    client.fetch(carouselQuery),
    client.fetch(postsQuery, { id }),
    client.fetch(footerQuery),
    client.fetch(tagsListQuery),
  ]);
  // TODO: fetch footer data once
  return {
    props: {
      carousel: postDetailData[0],
      post: postDetailData[1],
      footer: postDetailData[2],
      tagsListData: postDetailData[3],
    },
  };
}

export async function getStaticPaths() {
  const posts = await client.fetch(postsQuery);
  const paths = posts.map((post) => {
    return { params: { postId: post._id.toString() } };
  });
  return { paths, fallback: false };
}
