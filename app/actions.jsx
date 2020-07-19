const addPhoto = (id, url) => ({
  type: 'ADD_PHOTO',
  url,
  id,
});

const releaseCurrent = () => ({
  type: 'RELEASE_CURRENT',
});

const addComment = (commentId, commentEntries) => ({
  type: 'ADD_COMMENT',
  commentId,
  commentEntries,
});

const switchModal = (mode) => ({
  type: 'SWITCH_MODAL',
  mode,
});

const openPhoto = (id, url) => ({
  type: 'OPEN_PHOTO',
  url,
  id,
});

module.exports = {
  addPhoto, openPhoto, addComment, switchModal, releaseCurrent,
};
