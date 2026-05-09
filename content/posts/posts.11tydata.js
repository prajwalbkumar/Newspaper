module.exports = {
  layout: "layouts/post.njk",
  eleventyComputed: {
    permalink: data => `posts/${data.page.fileSlug}/`
  }
};
