/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
const { Map } = require('immutable');

const reducer = (state = Map(), action) => {
  switch (action.type) {
    case 'SET_STATE':
      return state.merge(action.state);
    case 'ADD_PHOTO':
      return state.update('photos', (photos) => photos.set(action.id, action.url));
    case 'SWITCH_MODAL':
      return state.set('modalIsOpen', action.mode);
    case 'OPEN_PHOTO':
      const newState = state.update('currentPhoto',
        (currentPhoto) => currentPhoto.set('id', action.id)).update('currentPhoto',
        (currentPhoto) => currentPhoto.set('url', action.url));
      return newState;
    case 'ADD_COMMENT':
      return state.update('currentComments', (currentComments) => currentComments.set(action.commentId, action.commentEntries));
    case 'RELEASE_CURRENT':
      return state.update('currentComments', () => new Map()).update('currentPhoto',
        () => new Map());
    default:
      return state;
  }
};
module.exports = reducer;
