const addPhoto = (id, url) => ({
  type: 'ADD_PHOTO',
  url,
  id,
});

const openPhoto = (photo) => ({
  type: 'OPEN_PHOTO',
  photo,
});

const addComment = (comment) => ({
  type: 'ADD_COMMENT',
  comment,
});

module.exports = { addPhoto, openPhoto, addComment };
