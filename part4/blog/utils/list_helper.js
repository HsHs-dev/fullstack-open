const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  console.log(blogs);
  return blogs.reduce((total, blog) => blog.likes + total, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((favirote, blog) =>
        blog.likes > favirote.likes ? blog : favirote,
      );
};

module.exports = { dummy, totalLikes, favoriteBlog };
