/* eslint-disable class-methods-use-this */
const React = require('react');
const { List } = require('immutable');
const postCommentObject = require('./network/post.jsx');

class CommentField extends React.Component {
  render() {
    let date = new Date(this.props.comments.get(this.props.id).last());
    date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    return <div className='comment'>
      <p>{date}</p>
      <p>{this.props.comments.get(this.props.id).first()}</p>
    </div>;
  }
}

class CommentInput extends React.Component {
  constructor() {
    super();
    this.addComment = this.addComment.bind(this);
  }

  addComment() {
    if (this.commentInput.value !== '') {
      const newRecordObject = {
        name: this.nameInput.value,
        comment: this.commentInput.value,
      };

      const newRecordJsonObject = JSON.stringify(newRecordObject);
      const id = this.props.currentPhoto.get('id');

      const url = `https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`;

      postCommentObject(url, newRecordJsonObject).then(() => {
      // здесь должен быть запрос на комментарии, но на сервере они не добавляются, поэтому заглушка
        this.props.addComment(newRecordObject.comment, List([newRecordObject.comment, new Date()]));
      });
    }
    this.nameInput.value = '';
    this.commentInput.value = '';
  }

  render() {
    return <div className='input-form'>
      <input ref={(nameInput) => { this.nameInput = nameInput; }} placeholder = 'Введите Ваше имя'/>
      <input ref={(commentInput) => { this.commentInput = commentInput; }} placeholder='Введите  Ваш комментарий' />
      <button id='send-comment-button' onClick={this.addComment}>Оставить комментарий</button>
</div>;
  }
}

class ModalPhoto extends React.Component {
  render() {
    //  console.log('wtf2', this.props.currentPhoto.get('id'));
    return <div className='modal-view'>
      <div className='modal-pic-n-input'>
        <div id='photo-placeholder'>
          <img src={this.props.currentPhoto.get('url')}></img>
        </div>
        <CommentInput {...this.props} />
      </div>
      <div className='comments-view'>
        {this.props.currentComments.keySeq().map((item) => <CommentField
          key={item} id={item} comments={this.props.currentComments} />)}
      </div>
    </div>;
  }
}

module.exports = ModalPhoto;
