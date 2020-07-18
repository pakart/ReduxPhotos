const addPhoto = (photo) => ({
  type: 'ADD_PHOTO',
  photo,
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
