import React from "react";
import styled from "styled-components";
import { urlFor, client } from "../../utils/sanity-utils";
import { Colors } from "../../styles/variables";
import { StyledSectionTitle } from "../../pages";
import { GridMax } from "../../styles/layout";
import BannerImageUrl from "../../public/au-visa.jpg";
import Image from "next/image";
import { carouselQuery, footerQuery } from "../../utils/queries";
import { postsListsQuery } from "../../utils/queries";
import { useRouter } from "next/router";
import { getCarouselLinks } from "../../utils/helper";
import { revalidateTime } from "../../utils/constants";
import VisaCard from "../../comps/VisaCard";
import SEO from "../../comps/SEO";

const TablesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 1rem auto 4rem auto;
`;

const CardWrapper = styled.div`
  flex-basis: 25%;
  @media screen and (max-width: 400px) {
    flex-basis: 100%;
  }
  @media screen and (min-width: 400px) and (max-width: 850px) {
    flex-basis: 50%;
  }
  & > div {
    padding: 0.3rem 0.5rem;
  }
`;

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
  @media screen and (max-width: 850px) {
    height: 180px;
  }
`;

export default function ImmigrationPage({ postsListsByTags }) {
  const router = useRouter();

  return (
    <div>
      <SEO title="澳洲签证" />
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
        <StyledSectionTitle>澳洲签证</StyledSectionTitle>
      </GridMax>
      <TablesContainer>
        {postsListsByTags[0].map((postsListData) => (
          <CardWrapper key={postsListData._id}>
            <div>
              <VisaCard
                title={postsListData.title}
                asset={postsListData.thumbnail.asset}
                postRef={postsListData._id}
              />
            </div>
          </CardWrapper>
        ))}
      </TablesContainer>
    </div>
  );
}
export async function getStaticProps() {
  const pageData = await Promise.all([
    client.fetch(footerQuery),
    ...Object.keys(TAG_NAME_ID_MAPPER).map((tagId) =>
      client.fetch(postsListsQuery(tagId))
    ),
  ]);
  const [footerData, ...rest] = pageData;

  return {
    props: {
      postsListsByTags: rest,
      footerData: footerData.map((data) => data),
    },
    // If webhooks isn't setup then attempt to re-generate in 5 minute intervals
    revalidate: revalidateTime,
  };
}

const TAG_NAME_ID_MAPPER = {
  "671cb3a2-00e2-427f-bd3f-48214ff4ea34": "澳洲签证",
};
