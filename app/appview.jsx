/* eslint-disable class-methods-use-this */
// import './css/appview.css';

const React = require('react');
const { List } = require('immutable');
const { connect } = require('react-redux');
const ReactModal = require('react-modal');
const actions = require('./actions.jsx');
const getPhotoObject = require('./network/photos_promises.jsx');
const ModalPhoto = require('./modal_photo.jsx');

//
// Компонент фото в списке
//

class PhotoItem extends React.Component {
  constructor() {
    super();
    this.loadPhoto = this.loadPhoto.bind(this);
  }

  //
  // Функция открытия фото по клику по элементу списка:
  // *подгрузка изображения с сервера по id
  // *подгрузка в store комментариев к изображению
  // *открытие модального окна
  //

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
    return <div className="photo-item" onClick={this.loadPhoto}>

    <img className='photo-src' src={this.props.srcUrl}></img>
  </div>;
  }
}

//
// Компонент списка фото
//

class PhotosList extends React.Component {
  render() {
    return <div className='photo-list'>
      {this.props.photos.keySeq().map((item) => <PhotoItem key={item} imgId={item}
        srcUrl={this.props.photos.get(item)} {...this.props}/>)}
    </div>;
  }
}

//
// Компонент приложения помещённый в контейнер
//

class AppView extends React.Component {
  constructor() {
    super();
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  // Функция открытия модального окна

  handleOpenModal() {
    this.props.switchModal(true);
  }

  // Функция закрытия модального окна

  handleCloseModal() {
    this.props.switchModal(false);
    this.props.releaseCurrent();
  }

  render() {
    // Функция загрузки списка фотографий и добавления их в store

    function loadPhotos(props) {
      getPhotoObject('https://boiling-refuge-66454.herokuapp.com/images').then((response) => JSON.parse(response)).then((data) => {
        data.forEach((element) => {
          props.addPhoto(element.id, element.url);
        });
      });
    }
    loadPhotos(this.props);

    return <div className = 'app-view'>
      <header> <h1 className='centered-header'>TEST APP</h1> </header>
            <PhotosList {...this.props} photoHandler={this.handleOpenModal} />
              <ReactModal className='modal-portal' overlayClassName='overlay-modal' isOpen={this.props.modalIsOpen} {...this.props}>
                <ModalPhoto {...this.props} closeWindow={this.handleCloseModal}/>
      </ReactModal>
      <footer className='footer'>©2018-2019</footer>
    </div>;
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
