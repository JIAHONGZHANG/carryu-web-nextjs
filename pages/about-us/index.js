import React from "react";
import styled from "styled-components";
import BannerImageUrl from "../../public/about-us.jpg";
import Image from "next/image";
import { useContext } from "react";
import PortableText from "@sanity/block-content-to-react";
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
                  <PortableText blocks={blocks} serializers={serializers} />
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
