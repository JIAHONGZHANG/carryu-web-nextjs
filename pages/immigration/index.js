import React from "react";
import styled from "styled-components";
import { urlFor, client } from "../../utils/sanity-utils";
import { Colors } from "../../styles/variables";
import { CarouselContextProvider } from "../../comps/Carousel/CarouselContext";
import Carousel from "../../comps/Carousel/Carousel";
import { StyledSectionTitle } from "../../pages";
import { GridMax } from "../../styles/layout";
import { carouselQuery, footerQuery } from "../../utils/queries";
import Footer from "../../comps/Footer/Footer";
const TablesContainer = styled.section`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin: 1rem 0 4rem 0;
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
  /* NOTE: Overflow text */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function ImmigrationPage({
  imgSrcs,
  sliderAlts,
  postsData,
  footerData,
}) {
  const carouselValue = {
    sliderImageSrcs: imgSrcs.map((imgSrc) => urlFor(imgSrc).url()),
    sliderAlts: sliderAlts,
    isPost: false,
  };

  return (
    <div>
      <CarouselContextProvider value={carouselValue}>
        <Carousel />
      </CarouselContextProvider>
      <GridMax>
        <StyledSectionTitle>澳洲移民</StyledSectionTitle>
      </GridMax>
      <TablesContainer>
        {/* <DynamicCol ratio={8}> */}
        <Table>
          <TableHead>技术移民</TableHead>
          <TableContentContainer>
            <TableContent>技术移民详解</TableContent>
            <TableContent>技术移民评分标准</TableContent>
            <TableContent>189独立技术移民</TableContent>
            <TableContent>190州担保技术移民</TableContent>
          </TableContentContainer>
        </Table>
        <Table>
          <TableHead>投资移民</TableHead>
          <TableContentContainer>
            <TableContent>澳大利亚商业移民综述</TableContent>
            <TableContent>132商业天才移民永居签证</TableContent>
            <TableContent>188A商业创新投资移民 </TableContent>
            <TableContent>188B投资管理者临时签证</TableContent>
          </TableContentContainer>
        </Table>
        <Table>
          <TableHead>政府担保</TableHead>
          <TableContentContainer>
            <TableContent>澳洲新南威尔士(NSW)州政府担保详细介绍</TableContent>
            <TableContent>澳洲南澳（SA）州政府担保详细介绍</TableContent>
            <TableContent>澳洲维多利亚（VIC）州政府担保详细介绍 </TableContent>
            <TableContent>澳洲塔斯马尼亚（TAS）州政府担保详细介绍</TableContent>
          </TableContentContainer>
        </Table>
        <Table>
          <TableHead>雇主担保</TableHead>
          <TableContentContainer>
            <TableContent>澳洲雇主担保移民详解</TableContent>
            <TableContent>186雇主担保永居签证</TableContent>
            <TableContent>澳洲全球人才签证GTS</TableContent>
            <TableContent>澳洲雇主担保签证482</TableContent>
          </TableContentContainer>
        </Table>
        {/* </DynamicCol> */}
      </TablesContainer>
      <Footer footerData={footerData} />
    </div>
  );
}
export async function getStaticProps() {
  const immigrationPageData = await Promise.all([
    client.fetch(carouselQuery),
    client.fetch(footerQuery),
  ]);
  return {
    props: {
      imgSrcs: immigrationPageData[0].map((data) => data.image.image.asset),
      sliderAlts: immigrationPageData[0].map((data) => data.image.alt),
      // postsData: immigrationPageData[1].map((data) => data),
      footerData: immigrationPageData[1].map((data) => data),
    },
    // If webhooks isn't setup then attempt to re-generate in 5 minute intervals
    revalidate: 300,
  };
}
