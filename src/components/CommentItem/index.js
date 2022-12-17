// Write your code here
import './index.css'

const CommentItem = props => {
  const {commentDetails, onDelete, onLike} = props
  const {id, userName, comment, isLiked, color} = commentDetails

  let imageUrl
  let clr
  if (isLiked) {
    imageUrl =
      'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    clr = 'likedColor'
  } else {
    imageUrl =
      'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    clr = ''
  }

  const deleteFunction = () => {
    onDelete(id)
  }

  const likeFunction = () => {
    onLike(id)
  }

  return (
    <li>
      <div className="userNameAndIcon">
        <button type="button" className={`${color} icon`}>
          {userName[0]}
        </button>
        <h1 className="userName"> {userName}</h1>
      </div>
      <p className="comment">{comment}</p>
      <div className="actions">
        <button type="button" className="likeButton" onClick={likeFunction}>
          <img src={imageUrl} className="iconSize" />
          <p className={`iconSize likePara ${clr}`}>Like</p>
        </button>
        <button className="deleteButton" onClick={deleteFunction} type="button">
          <img
            className="iconSize"
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
