const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  console.log(blogs);
  return blogs.reduce((total, blog) => blog.likes + total, 0);
};

module.exports = { dummy, totalLikes };
