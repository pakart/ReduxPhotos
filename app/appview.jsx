/* eslint-disable class-methods-use-this */
const React = require('react');
const { connect } = require('react-redux');
const actions = require('./actions.jsx');
const getPhotoObject = require('./network/photos_promises.jsx');

class PhotoItem extends React.Component {
  render() {
    return <img src={this.props.srcUrl}></img>;
  }
}

class PhotosList extends React.Component {
  render() {
    return <div>
      {this.props.photos.keySeq().map((item) => <PhotoItem key={item}
        srcUrl={this.props.photos.get(item)} />)}
    </div>;
  }
}

class AppView extends React.Component {
  render() {
    function loadPhotos(props) {
      getPhotoObject('https://boiling-refuge-66454.herokuapp.com/images').then((response) => JSON.parse(response)).then((data) => {
        data.forEach((element) => {
          props.addPhoto(element.id, element.url);
        });
      });
    }

    loadPhotos(this.props);
    return <div>
      <PhotosList {...this.props} />
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    photos: state.get('photos'),
  };
}

module.exports = connect(mapStateToProps, actions)(AppView);
