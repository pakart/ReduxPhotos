// Функция добавления фото: id-идентификатор фото, url - url-адрес

const addPhoto = (id, url) => ({
  type: 'ADD_PHOTO',
  url,
  id,
});

// Функция очистки состояния текущей активной фотографии в модальном окне

const releaseCurrent = () => ({
  type: 'RELEASE_CURRENT',
});

//
// Функция добавления комментария: commentId - id-идентификатор комментария,
// commentEntries - список комментария, хранящий дату и текст
//

const addComment = (commentId, commentEntries) => ({
  type: 'ADD_COMMENT',
  commentId,
  commentEntries,
});

// Функция открытия/закрытия модального окна - mode: true/false

const switchModal = (mode) => ({
  type: 'SWITCH_MODAL',
  mode,
});

// Функция открытия фото в модальном окне: id-идентификатор фото, url - url-адрес

const openPhoto = (id, url) => ({
  type: 'OPEN_PHOTO',
  url,
  id,
});

module.exports = {
  addPhoto, openPhoto, addComment, switchModal, releaseCurrent,
};
