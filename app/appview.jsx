/* eslint-disable class-methods-use-this */
const React = require('react');
const { connect } = require('react-redux');
const actions = require('./actions.jsx');

class AppView extends React.Component {
  render() {
    console.log('kek', this.props);
    return <div>
            <img src='https://picsum.photos/id/237/600/400'></img>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    photos: state.get('photos'),
  };
}

module.exports = connect(mapStateToProps, actions)(AppView);
