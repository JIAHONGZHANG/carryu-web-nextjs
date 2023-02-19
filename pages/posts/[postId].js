import { useContext } from "react";
import styled from "styled-components/macro";
import PortableText from "@sanity/block-content-to-react";
import { client, urlFor } from "../../utils/sanity-utils";
import { H2 } from "../../comps/Typography";
import { Colors } from "../../styles/variables";
import { GridMax, DynamicCol } from "../../styles/layout";
import {
  carouselQuery,
  tagsListQuery,
  footerQuery,
  postsQuery,
  postsQuery1,
} from "../../utils/queries";
import TagsList from "../../comps/TagsList/TagsList";
import { WindowWidthContext } from "../WindowWidthContextProvider";
const serializers = {
  marks: {
    link: ({ children, mark }) => (
      <a
        href={mark.href}
        target={mark.blank ? "_blank" : "_self"}
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    mainImage: (props) => (
      <img
        src={urlFor(props.node.image.asset).width(350).url()}
        alt={props.node.alt}
      />
    ),
  },
};

const PostWrapper = styled.div`
  border: 1px solid ${Colors.BorderColor};
  flex-grow: 1;
`;

const Thumbnail = styled.img`
  width: 100%;
`;

const PostContentContainer = styled.div`
  padding: 1rem;
`;

const PostTitle = styled(H2)`
  line-height: 100%;
`;

const PostTextWrapper = styled.div`
  padding: 24px;
`;
export default function BlogPost({ post, tagsListData }) {
  const width = useContext(WindowWidthContext);
  const postDetail = post[0];
  const blocks = postDetail.postContent;

  return (
    <>
      {width > 850 ? (
        <GridMax>
          <DynamicCol ratio={8}>
            <PostWrapper>
              <Thumbnail
                src={urlFor(postDetail.thumbnail.asset).url()}
                alt=""
              />
              {/* TODO: show tag */}
              <p>Date: {postDetail._updatedAt.slice(0, 10)}</p>
              <p>
                Categories:{" "}
                {tagsListData.map((tag, i) => (
                  <span key={i}>{tag.tag} </span>
                ))}
              </p>
              <PostContentContainer>
                <PostTitle>{postDetail.title}</PostTitle>
                <PostTextWrapper>
                  <PortableText blocks={blocks} serializers={serializers} />
                </PostTextWrapper>
              </PostContentContainer>
            </PostWrapper>
          </DynamicCol>
          <DynamicCol ratio={4}>
            <TagsList width={width} tagsList={tagsListData} />
          </DynamicCol>
        </GridMax>
      ) : (
        <GridMax>
          <DynamicCol ratio={4}>
            <TagsList width={width} tagsList={tagsListData} />
          </DynamicCol>
          <DynamicCol ratio={8}>
            <PostWrapper>
              <Thumbnail
                src={urlFor(postDetail.thumbnail.asset).url()}
                alt=""
              />
              {/* TODO: show tag */}
              <p>Date: {postDetail._updatedAt.slice(0, 10)}</p>
              <p>
                Categories:{" "}
                {tagsListData.map((tag, i) => (
                  <span key={i}>{tag.tag} </span>
                ))}
              </p>
              <PostContentContainer>
                <PostTitle>{postDetail.title}</PostTitle>
                <PostTextWrapper>
                  <PortableText blocks={blocks} serializers={serializers} />
                </PostTextWrapper>
              </PostContentContainer>
            </PostWrapper>
          </DynamicCol>
        </GridMax>
      )}
    </>
  );
}
// NOTE: We must use getStaticPaths and getStaticProps together, we cannot use getStaticPaths without getStaticProps, but we can use getStaticProps without getStaticPaths.
export async function getStaticProps(context) {
  const id = context.params.postId;
  // console.log("🚀 ~ file: [postId].js:146 ~ getStaticProps ~ id", id);
  const postDetailData = await Promise.all([
    client.fetch(carouselQuery),
    client.fetch(postsQuery1, { id }),
    client.fetch(footerQuery),
    client.fetch(tagsListQuery),
  ]);
  // TODO: fetch footer data once
  return {
    props: {
      // carousel: postDetailData[0],
      imgSrcs: postDetailData[0].map((data) => data.image.image.asset),
      sliderAlts: postDetailData[0].map((data) => data.image.alt),
      post: postDetailData[1],
      footerData: postDetailData[2],
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
