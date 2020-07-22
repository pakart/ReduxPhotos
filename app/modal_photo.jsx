/* eslint-disable class-methods-use-this */
const React = require('react');
const { List } = require('immutable');
const postCommentObject = require('./network/post.jsx');

//
// Компонент-комментарий: дата/текст
//

class CommentField extends React.Component {
  render() {
    let date = new Date(this.props.comments.get(this.props.id).last());
    date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    return <div className='comment'>
      <p id='comment-date'>{date}</p>
      <p id='comment-text'>{this.props.comments.get(this.props.id).first()}</p>
    </div>;
  }
}

//
// Компонент-форма для отправки комментария: input для имени, input для текста комментария,
// button отправка комментария
//

class CommentInput extends React.Component {
  constructor() {
    super();
    this.addComment = this.addComment.bind(this);
  }

  //
  // Функция сборки JSON и его отправка на сервер
  //

  addComment() {
    // Провекра на наличии в инпуте значения, при успехе сборка
    if (this.commentInput.value !== '') {
      const newRecordObject = {
        name: this.nameInput.value,
        comment: this.commentInput.value,
      };

      const newRecordJsonObject = JSON.stringify(newRecordObject);
      const id = this.props.currentPhoto.get('id');

      const url = `https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`;

      //
      // Отправка запроса с постом комментария, при успехе добавление в store напрямую
      // (на сервере комментарий не добавляется)
      //

      postCommentObject(url, newRecordJsonObject).then(() => {
        this.props.addComment(newRecordObject.comment, List([newRecordObject.comment, new Date()]));
      });
    }

    this.commentInput.value = '';
  }

  render() {
    return <div className='input-form'>
      <input className='input-field' ref={(nameInput) => { this.nameInput = nameInput; }} placeholder = 'Ваше имя'/>
      <input className='input-field' ref={(commentInput) => { this.commentInput = commentInput; }} placeholder='Ваш комментарий' />
      <button id='send-comment-button' onClick={this.addComment}>Оставить комментарий</button>
</div>;
  }
}

//
// Компонент-модальное окно для просмотра и отправки комментариев
//

class ModalPhoto extends React.Component {
  render() {
    return <div className='modal-view'>
      <div className='modal-pic-n-input'>
        <picture id='photo-placeholder'>
          <img className='photo' src={this.props.currentPhoto.get('url')}></img>
        </picture>
        <CommentInput {...this.props} />
      </div>
      <div className='comments-view'>
        {this.props.currentComments.keySeq().map((item) => <CommentField
          key={item} id={item} comments={this.props.currentComments} />)}
      </div>
      <a className='close-modal-button' onClick={this.props.closeWindow} />
    </div>;
  }
}

module.exports = ModalPhoto;
