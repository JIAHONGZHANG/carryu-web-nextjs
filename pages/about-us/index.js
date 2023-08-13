import React from "react";
import styled from "styled-components";
import BannerImageUrl from "../../public/about-us.jpg";
import Image from "next/image";
import { useContext } from "react";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "../../utils/sanity-utils";
import { H2 } from "../../comps/Typography";
import { Colors, FontWeights } from "../../styles/variables";
import { GridMax, DynamicCol } from "../../styles/layout";
import { StyledSectionTitle } from "../index";
import {
  carouselQuery,
  tagsListQuery,
  footerQuery,
  postsQuery,
  postsQuery1,
  AboutUsQuery,
} from "../../utils/queries";
import TagsList from "../../comps/TagsList/TagsList";
import { WindowWidthContext } from "../../comps/WindowWidthContextProvider";
import Link from "next/link";
import { getCarouselLinks } from "../../utils/helper";
import Badge from "../../comps/Badge";
import SEO from "../../comps/SEO";

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

      return (
        <div style={{ textAlign: "center" }}>
          <img
            src={url}
            alt={props.value?.alt}
            style={{ width: "100%", maxWidth: "400px" }}
          />
        </div>
      );
    },
  },
};

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  @media screen and (max-width: 850px) {
    height: 320px;
  }
`;

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
`;
export default function BlogPost({ post }) {
  const width = useContext(WindowWidthContext);
  const blocks = post.postContent;

  return (
    <>
      <SEO title="关于我们" />
      <BannerWrapper>
        <Image
          alt="Mountains"
          src={BannerImageUrl}
          placeholder="blur"
          quality={70}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
      </BannerWrapper>
      <GridMax>
        <StyledSectionTitle className="small-gap">关于我们</StyledSectionTitle>
      </GridMax>
      {width > 850 ? (
        <GridMax>
          <DynamicCol ratio={12}>
            <PostWrapper>
              <PostContentContainer>
                <PostTextWrapper>
                  <PortableText value={blocks} components={serializers} />
                </PostTextWrapper>
              </PostContentContainer>
            </PostWrapper>
          </DynamicCol>
        </GridMax>
      ) : (
        <GridMax>
          <DynamicCol ratio={8}>
            <PostWrapper>
              <PostContentContainer>
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
  const postDetailData = await Promise.all([
    client.fetch(carouselQuery),
    client.fetch(AboutUsQuery),
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
