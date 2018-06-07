import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import Comment from '../comment'
import CommentForm from '../comment-form'
import toggleOpen from '../../decorators/toggleOpen'
import './style.css'
import { loadComments } from '../../ac'
import { connect } from 'react-redux'
import Loader from '../common/loader'

class CommentList extends Component {
  static propTypes = {
    article: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string,
      comments: PropTypes.array,
      loadingComments: PropTypes.bool,
      loadedComments: PropTypes.bool
    }).isRequired,
    //from toggleOpen decorator
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    loadComments: PropTypes.func
  }

  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  componentDidUpdate(oldProps) {
    const { isOpen, loadComments, article } = this.props
    if (!oldProps.isOpen && isOpen && !article.loadedComments)
      loadComments(article.id)
  }

  render() {
    const { isOpen, toggleOpen } = this.props
    const text = isOpen ? 'hide comments' : 'show comments'
    return (
      <div>
        <button onClick={toggleOpen} className="test__comment-list--btn">
          {text}
        </button>
        <CSSTransition
          transitionName="comments"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.getBody()}
        </CSSTransition>
      </div>
    )
  }

  getBody() {
    const {
      article: { comments = [], id },
      isOpen,
      article
    } = this.props
    if (!isOpen) return null

    if (this.state.hasError) return <h3>Some Error</h3>
    if (article.loadingComments) return <Loader />
    if (!article.loadedComments) return

    return (
      <div className="test__comment-list--body">
        {comments.length ? (
          this.getComments()
        ) : (
          <h3 className="test__comment-list--empty">No comments yet</h3>
        )}
        <CommentForm articleId={id} />
      </div>
    )
  }

  getComments() {
    return (
      <ul>
        {this.props.article.comments.map((id) => (
          <li key={id} className="test__comment-list--item">
            <Comment id={id} />
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(null, { loadComments })(toggleOpen(CommentList))
