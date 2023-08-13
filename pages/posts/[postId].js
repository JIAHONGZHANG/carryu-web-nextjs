import { useContext } from "react";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "../../utils/sanity-utils";
import { H2 } from "../../comps/Typography";
import { Colors, FontWeights } from "../../styles/variables";
import { GridMax, DynamicCol } from "../../styles/layout";
import {
  carouselQuery,
  tagsListQuery,
  footerQuery,
  postsQuery,
  postsQuery1,
} from "../../utils/queries";
import { revalidateTime } from "../../utils/constants";
import TagsList from "../../comps/TagsList/TagsList";
import { WindowWidthContext } from "../../comps/WindowWidthContextProvider";
import Link from "next/link";
import { getCarouselLinks } from "../../utils/helper";
import Badge from "../../comps/Badge";
import SEO from "../../comps/SEO";
import Error from "next/error";

const serializers = {
  block: {
    normal: ({ children }) => {
      if (children.length === 1) {
        if (children[0] === "") return <br />;
        if (children[0] === "[divider]")
          return <hr style={{ margin: "24px 0" }} />;
      }

      if (children?.[0]?.props?.text?.startsWith("[center]")) {
        // remove [center] from text
        const text = children[0].props.text.slice(8);
        // check if text is strong
        const isStrong = children?.[0]?.props?.markType === "strong";

        return (
          <p style={{ textAlign: "center", fontWeight: isStrong ? 700 : 400 }}>
            {text}
          </p>
        );
      }

      return <p>{children}</p>;
    },
    h1: ({ children }) => <h1 style={{ lineHeight: "64px" }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ lineHeight: "64px" }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ lineHeight: "64px" }}>{children}</h3>,
    h4: ({ children }) => <h4 style={{ lineHeight: "64px" }}>{children}</h4>,
  },
  marks: {
    link: ({ value, children }) => {
      return (
        <a
          href={value.href}
          target={value.blank ? "_blank" : "_self"}
          rel="noreferrer"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    mainImage: (props) => {
      const url = urlFor(props.value.image.asset).width(800).url();

      return <img src={url} alt={props.value?.alt} style={{ width: "100%" }} />;
    },
  },
};

const PostWrapper = styled.div`
  flex-grow: 1;
`;

const Thumbnail = styled.img`
  width: 100%;
  margin-bottom: 0.8rem;
`;

const PostContentContainer = styled.div`
  padding: 1rem;
`;

const PostTitle = styled(H2)`
  line-height: 100%;
`;

const TagItem = styled(Link)`
  font-size: 1rem;
  font-weight: ${FontWeights.Normal};
  text-decoration: none;
  cursor: pointer;
  :visited {
    color: inherit;
  }
  &.active {
    color: ${Colors.SecondaryColor};
  }
  :hover {
    color: ${Colors.SecondaryColor};
  }
  & + & {
    margin-left: 0.3rem;
  }
`;

const PostTextWrapper = styled.div`
  padding: 24px;
  line-height: 2;
`;
export default function BlogPost({ post, tagsListData }) {
  const width = useContext(WindowWidthContext);
  const postDetail = post[0];

  if (!postDetail) {
    return <Error statusCode={404} />;
  }

  const blocks = postDetail.postContent;

  // 2023-12-01 to 01/12/2023
  const postDate = postDetail._updatedAt
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("/");

  return (
    <>
      <SEO title={postDetail.title} />
      {width > 850 ? (
        <GridMax>
          <DynamicCol ratio={8}>
            <PostWrapper>
              <Thumbnail
                src={urlFor(postDetail.thumbnail.asset).url()}
                alt=""
              />
              <p>Date: {postDate}</p>
              <div>
                {tagsListData.map((tag, i) => (
                  <Badge
                    name={tag.tag}
                    key={i}
                    link={`/posts?tag=${tag.tag}`}
                  />
                ))}
              </div>
              <PostContentContainer>
                <PostTitle>{postDetail.title}</PostTitle>
                <PostTextWrapper>
                  <PortableText value={blocks} components={serializers} />
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
              <p>Date: {postDate}</p>
              <p>
                Categories:{" "}
                {tagsListData.map((tag, i) => (
                  <TagItem key={i} href={`/posts?tag=${tag.tag}`} passHref>
                    {tag.tag}
                  </TagItem>
                ))}
              </p>
              <PostContentContainer>
                <PostTitle>{postDetail.title}</PostTitle>
                <PostTextWrapper>
                  <PortableText value={blocks} components={serializers} />
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
export async function getServerSideProps(context) {
  const id = context.params.postId;
  const postDetailData = await Promise.all([
    client.fetch(carouselQuery),
    client.fetch(postsQuery1, { id }),
    client.fetch(footerQuery),
    client.fetch(tagsListQuery),
  ]);

  const sliderLinks = getCarouselLinks(postDetailData);

  return {
    props: {
      sliderLinks,
      imgSrcs: postDetailData[0].map((data) => data.image.image.asset),
      sliderAlts: postDetailData[0].map((data) => data.image.alt),
      post: postDetailData[1],
      footerData: postDetailData[2],
      tagsListData: postDetailData[3],
    },
  };
}
