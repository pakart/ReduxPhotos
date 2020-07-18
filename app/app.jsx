const React = require('react');
const ReactDOM = require('react-dom');
const redux = require('redux');
const { Provider } = require('react-redux');
const reducer = require('./reducer.jsx');
const AppView = require('./appview.jsx');

const store = redux.createStore(reducer);

store.dispatch({
  type: 'SET_STATE',
  state: {
    photos: new Map().set(237, 'https://picsum.photos/id/237/300/200'),
  },
});

ReactDOM.render(
    <Provider store={store}>
      <AppView />
    </Provider>,
    document.getElementById('container'),
);
