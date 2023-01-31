import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { urlFor, client } from "../../utils/sanity-utils";
import { Colors, PrimaryColor } from "../../styles/variables";
import Carousel from "../../comps/Carousel/Carousel";
import PostsList from "../../comps/PostsList/PostsList";
import Footer from "../../comps/Footer/Footer";
import { SectionTitle } from "../SectionTitle";
import {
  carouselQuery,
  getPostsQuery,
  footerQuery,
  tagsListQuery,
} from "../../utils/queries";
import { DynamicCol, GridMax } from "../../styles/layout";
import TagsList from "../../comps/TagsList/TagsList";
import { getTagsData } from "../../utils/helper";
import { PostButton } from "../../comps/PostsList/PostItem";

const initCurrentPage = 0;
const postsPerPage = 4;

const PostsListPageContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const SectionTitleWrapper = styled.div`
  text-align: center;
  margin: 2rem 0;
`;
const PostsListWrapper = styled.div`
  flex-grow: 1;
  padding: 100px 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
`;

export default function PostsListPage({
  imgSrcs,
  sliderAlts,
  postsData,
  tagsListData,
  footerData,
}) {
  const [postsListData, setPostsListData] = useState(postsData);
  const [currentPage, setCurrentPage] = useState(initCurrentPage);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [whetherShowText, setWhetherShowText] = useState(false);
  const tagsData = getTagsData(tagsListData, postsData);
  const handlePreviousPage = (e) => {
    e.preventDefault();
    const previousPage = currentPage + 1;
    // console.log("click previous page", currentPage, previousPage);
    client.fetch(getPostsQuery(previousPage, postsPerPage)).then((res) => {
      setPostsListData(res);
      setIsFirstPage(false);
      if (res.length < postsPerPage) {
        setIsLastPage(true);
        if (res.length === 0) {
          setWhetherShowText(true);
        }
      }
    });
    setCurrentPage(previousPage);
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    const nextPage = currentPage - 1;
    // console.log("click next page", currentPage, nextPage);
    client.fetch(getPostsQuery(nextPage, postsPerPage)).then((res) => {
      setIsLastPage(false);
      setPostsListData(res);
      if (nextPage === 0) {
        setIsFirstPage(true);
      }
    });
    setCurrentPage(nextPage);
  };
  return (
    <PostsListPageContainer>
      <Carousel
        sliderImageSrcs={imgSrcs.map((imgSrc) => urlFor(imgSrc).url())}
        sliderAlts={sliderAlts}
      />
      <PostsListWrapper>
        <SectionTitleWrapper>
          <SectionTitle>新闻中心</SectionTitle>
        </SectionTitleWrapper>
        <GridMax>
          <DynamicCol ratio={8}>
            {/* TODO:  */}
            <PostsList data={postsListData} tagsData={tagsData} />
            {isLastPage && whetherShowText && <p>没有更多的文章了</p>}
            <ButtonContainer>
              {!isLastPage ? (
                <PostButton
                  onClick={(e) => {
                    handlePreviousPage(e);
                  }}
                  color={Colors.White}
                  label="上一页"
                  backgroundColor={PrimaryColor}
                />
              ) : (
                <div />
              )}
              {!isFirstPage ? (
                <PostButton
                  onClick={(e) => {
                    handleNextPage(e);
                  }}
                  color={Colors.White}
                  label="下一页"
                  backgroundColor={PrimaryColor}
                />
              ) : (
                <div />
              )}
            </ButtonContainer>
          </DynamicCol>
          <DynamicCol ratio={4}>
            <TagsList tagsList={tagsListData} />
          </DynamicCol>
        </GridMax>
      </PostsListWrapper>

      <Footer footerData={footerData} />
    </PostsListPageContainer>
  );
}

export async function getStaticProps() {
  const PostPageData = await Promise.all([
    client.fetch(carouselQuery),
    client.fetch(getPostsQuery(initCurrentPage, postsPerPage)),
    client.fetch(tagsListQuery),
    client.fetch(footerQuery),
  ]);
  return {
    props: {
      imgSrcs: PostPageData[0].map((data) => data.image.image.asset),
      sliderAlts: PostPageData[0].map((data) => data.image.alt),
      postsData: PostPageData[1].map((data) => data),
      tagsListData: PostPageData[2].map((data) => data),
      footerData: PostPageData[3].map((data) => data),
    },
    // If webhooks isn't setup then attempt to re-generate in 5 minute intervals
    revalidate: 300,
  };
}
