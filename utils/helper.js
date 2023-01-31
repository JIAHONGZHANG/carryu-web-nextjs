export const getPostDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
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
