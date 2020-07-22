/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
const { Map } = require('immutable');

const reducer = (state = Map(), action) => {
  switch (action.type) {
    // Инициация начального состояния store
    case 'SET_STATE':
      return state.merge(action.state);

    // Функция добавления фото: id-идентификатор фото, url - url-адрес
    case 'ADD_PHOTO':
      return state.update('photos', (photos) => photos.set(action.id, action.url));

    // Функция открытия/закрытия модального окна - mode: true/false
    case 'SWITCH_MODAL':
      return state.set('modalIsOpen', action.mode);

    // Функция открытия фото в модальном окне: id-идентификатор фото, url - url-адрес
    case 'OPEN_PHOTO':
      const newState = state.update('currentPhoto',
        (currentPhoto) => currentPhoto.set('id', action.id)).update('currentPhoto',
        (currentPhoto) => currentPhoto.set('url', action.url));
      return newState;

    //
    // Функция добавления комментария: commentId - id-идентификатор комментария,
    // commentEntries - список комментария, хранящий дату и текст
    //
    case 'ADD_COMMENT':
      return state.update('currentComments',
        (currentComments) => currentComments.set(action.commentId, action.commentEntries));

    // Функция очистки состояния текущей активной фотографии в модальном окне
    case 'RELEASE_CURRENT':
      return state.update('currentComments', () => new Map()).update('currentPhoto',
        () => new Map());
    default:
      return state;
  }
};
module.exports = reducer;
