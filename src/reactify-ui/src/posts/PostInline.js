import React, { Component } from "react";

class PostInline extends Component {
  render() {
    const { post } = this.props;
    const { elClass } = this.props;
    const showContent = elClass === "card" ? "d-block" : "d-none";
    return (
      <div className="">
        <div className={elClass.postListClass}>
          <h1>Post {post.title}</h1>
          <p className={showContent}>Post content: {post.content}</p>
        </div>
      </div>
    );
  }
}

export default PostInline;
