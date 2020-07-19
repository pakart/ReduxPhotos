/* eslint-disable class-methods-use-this */
const React = require('react');
const { List } = require('immutable');
const postCommentObject = require('./network/post.jsx');

class CommentField extends React.Component {
  render() {
    return <div> <p>{this.props.comments.get(this.props.id).last()}</p>
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
        name: 'Vasya',
        comment: this.commentInput.value,
      };

      const newRecordJsonObject = JSON.stringify(newRecordObject);
      const id = this.props.currentPhoto.get('id');

      const url = `https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`;

      postCommentObject(url, newRecordJsonObject).then(() => {
      // здесь должен быть запрос на комментарии, но на сервере они не добавляются, поэтому заглушка
        this.props.addComment(newRecordObject.comment, List([newRecordObject.comment, '123456']));
      });
    }
    this.commentInput.value = '';
  }

  render() {
    return <div>
      <textarea ref={(commentInput) => { this.commentInput = commentInput; }} placeholder='ваш комментарий...' />
      <button onClick={this.addComment}>Оставить комментарий</button>
</div>;
  }
}

class ModalPhoto extends React.Component {
  render() {
    //  console.log('wtf2', this.props.currentPhoto.get('id'));
    return <div>
      <img src={this.props.currentPhoto.get('url')}></img>
      {this.props.currentComments.keySeq().map((item) => <CommentField
        key={item} id={item} comments={this.props.currentComments} />)}

      <CommentInput {...this.props} />
    </div>;
  }
}

module.exports = ModalPhoto;
