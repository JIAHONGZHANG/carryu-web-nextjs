import { useContext } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../utils/sanity-utils";
import { Colors, PrimaryColor } from "../../styles/variables";
import PostsList from "../../comps/PostsList/PostsList";
import { StyledSectionTitle } from "../index";
import BannerImageUrl from "../../public/news-image.jpg";
import Image from "next/image";
import {
  carouselQuery,
  getPostsQuery,
  postsListsQuery,
  tagsListQuery,
  footerQuery,
} from "../../utils/queries";
import { DynamicCol, GridMax } from "../../styles/layout";
import TagsList from "../../comps/TagsList/TagsList";
import { getCarouselLinks, getTagsData } from "../../utils/helper";
import { PostButton } from "../../comps/PostsList/PostItem";
import { useRouter } from "next/router";
import { WindowWidthContext } from "../../comps/WindowWidthContextProvider";
import SEO from "../../comps/SEO";
import { set } from "nprogress";
const initCurrentPage = 0;
const postsPerPage = 4;

const PostsListPageContainer = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PostsListWrapper = styled.div`
  flex-grow: 1;
  /* padding: 4rem 0; */
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
`;

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
  @media screen and (max-width: 850px) {
    height: 180px;
  }
`;

export default function PostsListPage({ postsData, tagsListData }) {
  const width = useContext(WindowWidthContext);
  const [postsListData, setPostsListData] = useState(postsData);
  const [currentPage, setCurrentPage] = useState(initCurrentPage);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [whetherShowText, setWhetherShowText] = useState(false);
  const [tagId, setTagId] = useState("");

  const router = useRouter();

  //NOTE: method 1
  useEffect(() => {
    setWhetherShowText(false);
    setIsFirstPage(true);
    setIsLastPage(false);
    const { tag } = router.query;
    if (tag) {
      const selectedTag = tagsListData.find((data) => data.tag === tag);
      if (!selectedTag) {
        return;
      }
      const tagId = tagsListData.find((data) => data.tag === tag)._id;
      setTagId(tagId);
      client.fetch(postsListsQuery(tagId)).then((res) => {
        if (res.length < postsPerPage) {
          setIsLastPage(true);
        } else if (res.length === 0) {
          setIsLastPage(true);
          setWhetherShowText(true);
        }
        setPostsListData(res);
      });
    }
  }, [router.query]);

  const tagsData = getTagsData(tagsListData, postsData);
  const handlePreviousPage = (e) => {
    e.preventDefault();
    const previousPage = currentPage + 1;
    client
      .fetch(getPostsQuery(previousPage, postsPerPage, tagId))
      .then((res) => {
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

    client.fetch(getPostsQuery(nextPage, postsPerPage, tagId)).then((res) => {
      setIsLastPage(false);
      setPostsListData(res);
      if (nextPage === 0) {
        setIsFirstPage(true);
      }
    });
    setCurrentPage(nextPage);
  };
  return (
    <>
      <SEO title="新闻快递" />
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

      <PostsListPageContainer>
        <PostsListWrapper>
          <GridMax>
            <StyledSectionTitle>新闻快递</StyledSectionTitle>
          </GridMax>
          {width > 850 ? (
            <GridMax>
              <DynamicCol ratio={8}>
                <PostsList
                  width={width}
                  data={postsListData}
                  tagsData={tagsData}
                />
                {isLastPage && whetherShowText && <p>没有更多的文章了</p>}
                <ButtonContainer>
                  {!isLastPage ? (
                    <PostButton
                      onClick={(e) => {
                        handlePreviousPage(e);
                      }}
                      color={Colors.White}
                      backgroundColor={PrimaryColor}
                    >
                      上一页
                    </PostButton>
                  ) : (
                    <div />
                  )}
                  {!isFirstPage ? (
                    <PostButton
                      onClick={(e) => {
                        handleNextPage(e);
                      }}
                      color={Colors.White}
                      backgroundColor={PrimaryColor}
                    >
                      下一页
                    </PostButton>
                  ) : (
                    <div />
                  )}
                </ButtonContainer>
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
                <PostsList
                  width={width}
                  data={postsListData}
                  tagsData={tagsData}
                />
                {isLastPage && whetherShowText && <p>没有更多的文章了</p>}
                <ButtonContainer>
                  {!isLastPage ? (
                    <PostButton
                      onClick={(e) => {
                        handlePreviousPage(e);
                      }}
                      color={Colors.White}
                      backgroundColor={PrimaryColor}
                    >
                      上一页
                    </PostButton>
                  ) : (
                    <div />
                  )}
                  {!isFirstPage ? (
                    <PostButton
                      onClick={(e) => {
                        handleNextPage(e);
                      }}
                      color={Colors.White}
                      backgroundColor={PrimaryColor}
                    >
                      下一页
                    </PostButton>
                  ) : (
                    <div />
                  )}
                </ButtonContainer>
              </DynamicCol>
            </GridMax>
          )}
        </PostsListWrapper>
      </PostsListPageContainer>
    </>
  );
}

export async function getStaticProps() {
  const PostPageData = await Promise.all([
    client.fetch(carouselQuery),
    client.fetch(getPostsQuery(initCurrentPage, postsPerPage)),
    client.fetch(tagsListQuery),
    client.fetch(footerQuery),
  ]);

  // setup carousel image links
  const carouselLinks = getCarouselLinks(PostPageData);

  return {
    props: {
      imgSrcs: PostPageData[0].map((data) => data.image.image.asset),
      sliderAlts: PostPageData[0].map((data) => data.image.alt),
      sliderLinks: carouselLinks,
      postsData: PostPageData[1].map((data) => data),
      tagsListData: PostPageData[2].map((data) => data),
      footerData: PostPageData[3].map((data) => data),
    },
    // If webhooks isn't setup then attempt to re-generate in 5 minute intervals
    revalidate: 300,
  };
}

//NOTE: check this out later
// PostsListPage.getInitialProps = () => {};
