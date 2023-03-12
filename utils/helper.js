export const getPostDate = (date) => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  const year = d.getFullYear();

  // return example 02/12/2021
  return `${day}/${month}/${year}`;
};

export const getTagsData = (tagsData, postsData) => {
  const tags = {};
  postsData.forEach((post) => {
    post.myTags.forEach((tag) => {
      tags[tag._ref] = 0;
    });
  });
  tagsData.forEach((tag) => {
    tags[tag._id] = tag.tag;
  });
  return tags;
};

export const getRelatedTags = (tagsData, tagId) => {
  return tagsData.filter((data) => data.id === tagId);
};

export const getCarouselLinks = (pageData) =>
  pageData[0].map((data) => {
    if (data.externalUrl) {
      if (data.externalUrl.internalLink) {
        return data.externalUrl.internalLink._ref;
      }
      return data.externalUrl.externalUrl;
    }

    return null;
  });
