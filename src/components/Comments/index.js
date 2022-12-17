import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem/index'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {commentList: [], userName: '', comment: ''}

  onSubmittingComment = event => {
    event.preventDefault()
    const {userName, comment, commentList} = this.state
    const l1 = commentList.length
    const l2 = initialContainerBackgroundClassNames.length
    const index = l1 % l2
    const clr = initialContainerBackgroundClassNames[index]

    const newComment = {
      id: uuidv4(),
      userName,
      comment,
      isLiked: false,
      color: clr,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      userName: '',
      comment: '',
    }))
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onDelte = id => {
    const {commentList} = this.state
    const updatedCommentList = commentList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentList: updatedCommentList})
  }

  onLike = id => {
    const {commentList} = this.state
    const updatedCommentList = commentList.map(eachComment => {
      if (eachComment.id === id) {
        return {
          ...eachComment,
          isLiked: !eachComment.isLiked,
        }
      }
      return eachComment
    })

    this.setState({commentList: updatedCommentList})
  }

  render() {
    const timeDistance = formatDistanceToNow(new Date())
    const {userName, comment, commentList} = this.state
    const l = commentList.length
    return (
      <div className="bg">
        <div className="topContainer">
          <div className="inputsContainer">
            <h1 className="heading">Comments</h1>
            <form className="form" onSubmit={this.onSubmittingComment}>
              <p className="para">Say something about 4.0 Technologies</p>
              <input
                value={userName}
                type="text"
                className="ip1"
                placeholder="Your Name"
                onChange={this.onChangeUserName}
              />
              <textarea
                value={comment}
                rows="10"
                cols="40"
                className="ip2"
                placeholder="Your Comment"
                onChange={this.onChangeComment}
              >
                Your Comment
              </textarea>
              <button type="submit" className="button">
                Add Comment
              </button>
              <hr className="line" />
            </form>
          </div>

          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="image1"
          />
        </div>
        <div className="bottomContainer">
          <div className="noOfComments">
            <p className="number">{l}</p>
            <p>Comments</p>
          </div>
          <ul className="commentList">
            {commentList.map(eachComment => (
              <CommentItem
                commentDetails={eachComment}
                onDelete={this.onDelte}
                onLike={this.onLike}
                key={eachComment.id}
                timeDistance={timeDistance}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
