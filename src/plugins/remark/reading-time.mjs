import { toString } from 'mdast-util-to-string';

const getReadingTime = (text) => {
  const wpm = 265;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    data.astro.frontmatter.readingTime = getReadingTime(textOnPage);
  };
}