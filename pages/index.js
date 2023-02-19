import styled from "styled-components";
import { client } from "../utils/sanity-utils";
import { GridMax, DynamicCol } from "../styles/layout";
import { SectionTitle } from "./SectionTitle";
import VideoEmbed from "../comps/Video/VideoEmbed";
import CardsList from "../comps/CardsList/CardsList";
import Background from "../comps/Background/Background";
import PostsListTitleComp from "../comps/PostsList/PostsListTitleComp";
import {
  carouselQuery,
  sampleQuery,
  eduVideoQuery,
  immVideoQuery,
  getPostsQuery,
  footerQuery,
} from "../utils/queries";
const EduSection = styled.section`
  position: relative;
  padding: 6rem 0 9rem 0;
`;
const ImmSection = styled.section`
  position: relative;
  padding: 4rem 0 15rem 0;
  overflow: hidden;
  @media screen and (min-width: 300px) and (max-width: 850px) {
    padding: 2rem 0 1rem 0;
  }
`;

export const StyledSectionTitle = styled(SectionTitle)`
  width: 100%;
  /* NOTE: Using this kind grid-column can help set up justify content center */
  grid-column: 6 / 8;
  margin-bottom: 4rem;
  justify-content: center;
  @media screen and (min-width: 300px) and (max-width: 850px) {
    grid-column: span 1;
  }
`;
const VideoWrapper = styled.div`
  grid-column: 3 / 11;
  @media screen and (min-width: 300px) and (max-width: 850px) {
    grid-column: span 1;
  }
`;
const ImmTitleWrapper = styled(StyledSectionTitle)`
  /* NOTE: Using this kind grid-column can help set up justify content center */
  margin-bottom: 12rem;
  @media screen and (min-width: 300px) and (max-width: 850px) {
    margin-bottom: 4rem;
  }
`;
export default function Home({
  sampleData: sampleListData,
  eduVideoData,
  immVideoData,
  postsData,
}) {
  return (
    <>
      <EduSection>
        <GridMax>
          <StyledSectionTitle>留学专区</StyledSectionTitle>
          <VideoWrapper>
            <VideoEmbed
              embedId={eduVideoData.id}
              description={eduVideoData.description}
            />
          </VideoWrapper>
        </GridMax>
        <CardsList sampleListData={sampleListData} />
        <Background label={"background1"} />
      </EduSection>
      <ImmSection>
        <GridMax>
          <ImmTitleWrapper>移民专区</ImmTitleWrapper>
          <DynamicCol ratio={6}>
            <VideoWrapper>
              <VideoEmbed
                embedId={immVideoData.id}
                description={immVideoData.description}
              />
            </VideoWrapper>
          </DynamicCol>
          <DynamicCol ratio={6}>
            <PostsListTitleComp postListData={postsData} />
          </DynamicCol>
        </GridMax>
        <Background label={"background2"} />
      </ImmSection>
    </>
  );
}
export async function getStaticProps() {
  const homeData = await Promise.all([
    client.fetch(carouselQuery),
    client.fetch(sampleQuery),
    client.fetch(eduVideoQuery),
    client.fetch(immVideoQuery),
    client.fetch(getPostsQuery(0, 4)),
    client.fetch(footerQuery),
  ]);

  return {
    props: {
      imgSrcs: homeData[0].map((data) => data.image.image.asset),
      sliderAlts: homeData[0].map((data) => data.image.alt),
      sampleData: homeData[1].map((data) => data),
      eduVideoData: homeData[2],
      immVideoData: homeData[3],
      postsData: homeData[4].map((data) => data),
      footerData: homeData[5].map((data) => data),
    },
    // If webhooks isn't setup then attempt to re-generate in 5 minute intervals
    revalidate: 300,
  };
}
