export const processHashtags = (caption) => {
  const hashtags = caption.match(/#[\w]+/g) || [];

  // []: for captions with no hashtag
  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
