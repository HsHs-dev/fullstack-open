const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 0);
  });

  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 8,
      __v: 0,
    },
    {
      _id: "6b018372e95699f35772e8e8",
      title: "Josh Comeau web blog",
      author: "Josh Comeau",
      url: "https://www.joshwcomeau.com/",
      likes: 5,
      __v: 0,
    },
    {
      _id: "6b018e89e8d053d4b3206c54",
      title: "Fabien Sanglard",
      author: "Fabien Sanglard",
      url: "https://fabiensanglard.net/",
      likes: 11,
      __v: 0,
    },
  ];
  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    assert.strictEqual(result, 24);
  });
});

describe("favorite blog", () => {
  test("of empty list is null", () => {
    const blogs = [];
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, null);
  });

  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];
  test("when list has only one blog, equals the blog itself", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    });
  });

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 8,
      __v: 0,
    },
    {
      _id: "6b018372e95699f35772e8e8",
      title: "Josh Comeau web blog",
      author: "Josh Comeau",
      url: "https://www.joshwcomeau.com/",
      likes: 5,
      __v: 0,
    },
    {
      _id: "6b018e89e8d053d4b3206c54",
      title: "Fabien Sanglard",
      author: "Fabien Sanglard",
      url: "https://fabiensanglard.net/",
      likes: 11,
      __v: 0,
    },
  ];
  test("of a bigger list is evaluated right", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    assert.deepStrictEqual(result, {
      _id: "6b018e89e8d053d4b3206c54",
      title: "Fabien Sanglard",
      author: "Fabien Sanglard",
      url: "https://fabiensanglard.net/",
      likes: 11,
      __v: 0,
    });
  });
});
