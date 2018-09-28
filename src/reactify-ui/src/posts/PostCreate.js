import React, { Component } from "react";
import "whatwg-fetch";
import cookie from "react-cookies";
import moment from "moment";

class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.postTitleRef = React.createRef();
    this.postContentRef = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    let data = this.state;
    data["draft"] = data["draft"] === "on" ? true : false;
    console.log(data);
    this.createPosts(data);
  }
  handleInputChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  clearForm(event) {
    if (event) {
      event.preventDefault();
    }
    this.postCreateForm.reset();
  }

  clearFormRefs() {
    this.postTitleRef.current = "";
    this.postContentRef.current = "";
  }
  createPosts(data) {
    console.log("method get called");
    console.log(data);
    const endpoint = "/api/posts/";
    const csrfToken = cookie.load("csrftoken");
    let thisComp = this;
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
          if (thisComp.props.newPostItemCreated) {
            thisComp.props.newPostItemCreated(responseData);
          }
          thisComp.clearForm();
          console.log(responseData);
        })
        .then(function(error) {
          console.log("error", error);
        });
    }
  }
  componentDidMount() {
    // this.setState({
    //   draft: false,
    //   title: null,
    //   content: null,
    //   publish: moment(new Date()).format("YYYY-MM-DD")
    // });
    this.postTitleRef.current.focus();
  }
  render() {
    // const { publish } = this.state;
    // const today = moment(new Date()).format("YYYY-MM-DD");
    return (
      <form onSubmit={this.handleSubmit} ref={el => (this.postCreateForm = el)}>
        <div className="form-group">
          <label for="title">Post title</label>
          <input
            type="text"
            className="form-control"
            placeholder="place title"
            id="title"
            name="title"
            onChange={this.handleInputChange}
            required="required"
            ref={this.postTitleRef}
          />
        </div>
        <div className="form-group">
          <label for="content">Post Content</label>
          <input
            type="text"
            className="form-control"
            placeholder="place content"
            id="content"
            name="content"
            onChange={this.handleInputChange}
            required="required"
            ref={this.postContentRef}
          />
        </div>
        <div className="form-group">
          <label for="draft">
            Draft
            <input
              type="checkbox"
              className="mr-2"
              id="draft"
              name="draft"
              onChange={this.handleInputChange}
              required="required"
            />
          </label>
        </div>
        <div className="form-group">
          <label for="publish">Publish Date</label>
          <input
            type="date"
            className="form-control"
            id="publish"
            name="publish"
            onChange={this.handleInputChange}
            required="required"
          />
        </div>
        <button className="btn btn-primary">Save</button>
        <button className="btn btn-primary" onClick={this.clearForm}>
          Reset
        </button>
      </form>
    );
  }
}
export default PostCreate;
