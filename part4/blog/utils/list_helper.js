const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => blog.likes + total, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((favirote, blog) =>
        blog.likes > favirote.likes ? blog : favirote,
      );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const authorsOccurences = _.countBy(blogs, "author");
  const mostFrequentAuthor = _.max(_.values(authorsOccurences));
  const result = {
    author: _.findKey(
      authorsOccurences,
      (occurs) => occurs === mostFrequentAuthor,
    ),
    blogs: mostFrequentAuthor,
  };

  return result;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authors = _.groupBy(blogs, "author");
  const authorsAndLikes = _.map(authors, (val, key) => {
    return { author: key, likes: _.sumBy(val, "likes") };
  });

  const result = _.maxBy(authorsAndLikes, "likes");

  return result;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
