import React from "react";
import styled from "styled-components";
import { urlFor, client } from "../../utils/sanity-utils";
import { Colors } from "../../styles/variables";
import { StyledSectionTitle } from "../../pages";
import { GridMax } from "../../styles/layout";
import BannerImageUrl from "../../public/communicate.jpg";
import Image from "next/image";
import { carouselQuery, footerQuery } from "../../utils/queries";
import { postsListsQuery } from "../../utils/queries";
import { useRouter } from "next/router";
import { getCarouselLinks } from "../../utils/helper";
import SEO from "../../comps/SEO";

const TablesContainer = styled.section`
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  gap: 20px;
  margin: 1rem auto 4rem auto;
`;
const Table = styled.article`
  display: flex;
  flex-direction: column;
  width: 260px;
`;
const TableHead = styled.div`
  text-align: center;
  padding: 1rem 2rem;
  background-color: ${Colors.PrimaryColor};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;
const TableContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: solid 2px ${Colors.PrimaryColor};
`;

const TableContent = styled.a`
  display: block;
  padding: 1rem 2rem;
  cursor: pointer;
  border-bottom: solid 1px ${Colors.GreyPrimary};
  &:hover {
    color: ${Colors.SecondaryColor};
  }
  /* NOTE: Overflow text */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
      <SEO title="澳洲移民" />
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
        <StyledSectionTitle>澳洲移民</StyledSectionTitle>
      </GridMax>
      <TablesContainer>
        {postsListsByTags.map((postsList, i) => (
          <Table key={i}>
            <TableHead>{Object.values(TAG_NAME_ID_MAPPER)[i]}</TableHead>
            <TableContentContainer>
              {postsList.map(({ title, _id }) => (
                <TableContent
                  onClick={() => router.push(`/posts/${_id}`)}
                  key={_id}
                >
                  {title}
                </TableContent>
              ))}
            </TableContentContainer>
          </Table>
        ))}
      </TablesContainer>
    </div>
  );
}
export async function getStaticProps() {
  const pageData = await Promise.all([
    client.fetch(carouselQuery),
    client.fetch(footerQuery),
    ...Object.keys(TAG_NAME_ID_MAPPER).map((tagId) =>
      client.fetch(postsListsQuery(tagId))
    ),
  ]);
  const [imgSrcs, footerData, ...rest] = pageData;

  const sliderLinks = getCarouselLinks(pageData);

  return {
    props: {
      sliderLinks,
      imgSrcs: imgSrcs.map((data) => data.image.image.asset),
      sliderAlts: imgSrcs.map((data) => data.image.alt),
      postsListsByTags: rest,
      footerData: footerData.map((data) => data),
    },
    // If webhooks isn't setup then attempt to re-generate in 5 minute intervals
    revalidate: 300,
  };
}

const TAG_NAME_ID_MAPPER = {
  "d7dc763d-acc1-4d58-a935-48844b2c3d6a": "技术移民",
  "ae5d1aea-c9ec-42bf-ae7e-d3186145e2b7": "投资移民",
  "a249f7e1-1ff7-40f6-b7b2-f914be43a7bd": "政府担保",
  "01a877ae-5d57-4d78-852e-01a31f0224b4": "雇主担保",
};
