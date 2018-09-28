import React, { Component } from "react";
import "whatwg-fetch";
import cookie from "react-cookies";
import PostInline from "./PostInline";
import PostCreate from "./PostCreate";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.togglePostListClass = this.togglePostListClass.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
  }
  state = {
    posts: [],
    postListClass: "card"
  };

  loadPosts() {
    let thisComp = this;
    const endpoint = "/api/posts/";
    let lookuoOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch(endpoint, lookuoOptions)
      .then(function(response) {
        return response.json();
      })
      .then(function(responseData) {
        console.log(responseData);
        thisComp.setState({
          posts: responseData
        });
      })
      .then(function(error) {
        console.log("error", error);
      });
  }

  createPosts() {
    const endpoint = "/api/posts";
    const csrfToken = cookie.load("csrftoken");
    if (csrfToken !== undefined) {
      let lookuoOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: JSON.stringify(data),
        credentials: "include"
      };
      fetch(endpoint, lookuoOptions)
        .then(function(response) {
          return response.json();
        })
        .then(function(responseData) {
          console.log(responseData);
        })
        .then(function(error) {
          console.log("error", error);
        });
    }
    let data = {
      slug: "abc",
      title: "xyz",
      content: "pqr",
      draft: false,
      publish: null
    };
  }

  handleNewPost(postItemData) {
    console.log(postItemData);
    let currentPosts = this.state.posts;
    currentPosts.unshift(postItemData);
    this.setState({
      posts: currentPosts
    });
  }
  togglePostListClass(event) {
    event.preventDefault();
    let currentListClass = this.state.postListClass;
    if (currentListClass === "") {
      this.setState({
        postListClass: "card"
      });
    } else {
      this.setState({
        postListClass: ""
      });
    }
  }
  componentDidMount() {
    this.setState({
      posts: [],
      postListClass: "card"
    });
    this.loadPosts();
  }
  render() {
    const { posts } = this.state;
    const { postListClass } = this.state;
    const csrfToken = cookie.load("csrftoken");
    return (
      <div>
        <button onClick={this.togglePostListClass}>Toggle Class</button>
        {posts.length > 0 ? (
          posts.map((post_item, index) => {
            return <PostInline post={post_item} elClass={postListClass} />;
          })
        ) : (
          <p>No posts found</p>
        )}
        {csrfToken !== undefined && csrfToken !== null ? (
          <div className="my-5">
            <PostCreate newPostItemCreated={this.handleNewPost} />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Posts;
