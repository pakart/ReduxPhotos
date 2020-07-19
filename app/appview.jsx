/* eslint-disable class-methods-use-this */
const React = require('react');
const { List } = require('immutable');
// const ReactDOM = require('react-dom');
const { connect } = require('react-redux');
const ReactModal = require('react-modal');
const actions = require('./actions.jsx');
const getPhotoObject = require('./network/photos_promises.jsx');
const ModalPhoto = require('./modal_photo.jsx');
// const ModalPhoto = require('./modal_photo.jsx');

class PhotoItem extends React.Component {
  constructor() {
    super();
    this.loadPhoto = this.loadPhoto.bind(this);
  }

  loadPhoto() {
    const url = `https://boiling-refuge-66454.herokuapp.com/images/${this.props.imgId}`;
    getPhotoObject(url).then((response) => JSON.parse(response)).then((data) => {
      this.props.openPhoto(data.id, data.url);
      data.comments.forEach((comment) => {
        const entries = List();
        this.props.addComment(comment.id, entries.push(comment.text).push(comment.date));
      });
    });
    this.props.switchModal(true);
  }

  render() {
    return <div onClick={this.loadPhoto}>

    <img src={this.props.srcUrl}></img>
  </div>;
  }
}

class PhotosList extends React.Component {
  render() {
    return <div className='photos-list'>
      {this.props.photos.keySeq().map((item) => <PhotoItem key={item} imgId={item}
        srcUrl={this.props.photos.get(item)} {...this.props}/>)}
    </div>;
  }
}
//
// modal window++
//
class AppView extends React.Component {
  constructor() {
    super();
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.props.switchModal(true);
  }

  handleCloseModal() {
    this.props.switchModal(false);
    this.props.releaseCurrent();
  }

  render() {
    function loadPhotos(props) {
      getPhotoObject('https://boiling-refuge-66454.herokuapp.com/images').then((response) => JSON.parse(response)).then((data) => {
        data.forEach((element) => {
          props.addPhoto(element.id, element.url);
        });
      });
    }

    loadPhotos(this.props);

    return <main>
            <PhotosList {...this.props} photoHandler={this.handleOpenModal} />
              <ReactModal isOpen={this.props.modalIsOpen} {...this.props}>
        <ModalPhoto {...this.props}/>
                <button onClick={this.handleCloseModal}>Close Modal</button>
              </ReactModal>
    </main>;
  }
}

function mapStateToProps(state) {
  return {
    photos: state.get('photos'),
    modalIsOpen: state.get('modalIsOpen'),
    currentPhoto: state.get('currentPhoto'),
    currentComments: state.get('currentComments'),
  };
}

ReactModal.setAppElement(document.getElementById('container'));
module.exports = connect(mapStateToProps, actions)(AppView);
