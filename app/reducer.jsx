const { Map } = require('immutable');

const reducer = (state = Map(), action) => {
  switch (action.type) {
    case 'SET_STATE':
      return state.merge(action.state);
    case 'ADD_PHOTO':
      return state.update('photos', (photos) => photos.set(action.id, action.url));
      /* case 'OPEN_PHOTO':
      return state.update('photo', (photo) => photo.push(action.photo)); */
    /* case 'ADD_COMMENT':
      return state.update('phones',
        (phones) => phones.filterNot(
          (item) => item === action.phone,
        )); */
    default:
      return state;
  }
};
module.exports = reducer;
