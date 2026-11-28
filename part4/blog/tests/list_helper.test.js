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

describe("most mentioned blog", () => {
  test("of empty list is null", () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    assert.strictEqual(result, null);
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
  test("when list has only one blog, equals the blog itself with blogs 1", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://example.com/goto",
      likes: 8,
      __v: 0,
    },
    {
      _id: "6b018372e95699f35772e8e8",
      title: "Understanding CSS Grid",
      author: "Josh Comeau",
      url: "https://example.com/css-grid",
      likes: 5,
      __v: 0,
    },
    {
      _id: "6b018e89e8d053d4b3206c54",
      title: "Game Engine Architecture",
      author: "Fabien Sanglard",
      url: "https://example.com/game-engine",
      likes: 21,
      __v: 0,
    },
    {
      _id: "6b018e89e8d053d4b3206c55",
      title: "The Magic of CSS",
      author: "Josh Comeau",
      url: "https://example.com/css-magic",
      likes: 7,
      __v: 0,
    },
    {
      _id: "6b018e89e8d053d4b3206c56",
      title: "Understanding Algorithms",
      author: "Edsger W. Dijkstra",
      url: "https://example.com/algorithms",
      likes: 9,
      __v: 0,
    },
    {
      _id: "6b018e89e8d053d4b3206c57",
      title: "A Guide to React Rendering",
      author: "Josh Comeau",
      url: "https://example.com/react-rendering",
      likes: 4,
      __v: 0,
    },
  ];
  test("of a bigger list is evaluated right", () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    assert.deepStrictEqual(result, {
      author: "Josh Comeau",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("of empty list is null", () => {
    const blogs = [];
    const result = listHelper.mostLikes(blogs);
    assert.strictEqual(result, null);
  });

  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://example.com/goto",
      likes: 12,
      __v: 0,
    },
  ];

  test("when list has only one blog, returns its author and likes", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://example.com/goto",
      likes: 12,
      __v: 0,
    },
    {
      _id: "6b018372e95699f35772e8e8",
      title: "Understanding CSS Grid",
      author: "Josh Comeau",
      url: "https://example.com/css-grid",
      likes: 5,
      __v: 0,
    },
    {
      _id: "6b018e89e8d053d4b3206c54",
      title: "Game Engine Architecture",
      author: "Fabien Sanglard",
      url: "https://example.com/game-engine",
      likes: 21,
      __v: 0,
    },
    {
      _id: "6b018e89e8d053d4b3206c55",
      title: "The Magic of CSS",
      author: "Josh Comeau",
      url: "https://example.com/css-magic",
      likes: 7,
      __v: 0,
    },
    {
      _id: "6b018e89e8d053d4b3206c56",
      title: "Understanding Algorithms",
      author: "Edsger W. Dijkstra",
      url: "https://example.com/algorithms",
      likes: 15,
      __v: 0,
    },
    {
      _id: "6b018e89e8d053d4b3206c57",
      title: "A Guide to React Rendering",
      author: "Josh Comeau",
      url: "https://example.com/react-rendering",
      likes: 4,
      __v: 0,
    },
  ];

  test("of a bigger list returns the author with most total likes", () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 27,
    });
  });

  test("when multiple authors are tied, returns any of them", () => {
    const blogs = [
      { author: "Alice", likes: 10 },
      { author: "Bob", likes: 25 },
      { author: "Alice", likes: 15 },
      { author: "Charlie", likes: 5 },
    ];

    const result = listHelper.mostLikes(blogs);

    assert.ok(["Alice", "Bob"].includes(result.author));
    assert.strictEqual(result.likes, 25);
  });

  test("when a blog has zero likes, returns its author with zero likes", () => {
    const blogs = [{ author: "Alice", likes: 0 }];

    const result = listHelper.mostLikes(blogs);

    assert.deepStrictEqual(result, {
      author: "Alice",
      likes: 0,
    });
  });

  test("when all blogs belong to one author, sums all likes", () => {
    const blogs = [
      { author: "Alice", likes: 10 },
      { author: "Alice", likes: 20 },
      { author: "Alice", likes: 30 },
    ];

    const result = listHelper.mostLikes(blogs);

    assert.deepStrictEqual(result, {
      author: "Alice",
      likes: 60,
    });
  });
});
