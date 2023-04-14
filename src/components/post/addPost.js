import React, { useState } from "react";
import axios from "axios";

let AddPost = () => {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("")

  function addPostHandler(event) {
    try{
        if(!title || !message){
            setError("All fields required")
        }else{
            event.preventDefault();
            axios
                .post("https://jsonplaceholder.typicode.com/posts", {
                    title,
                    message,
                    userId: 1,
                })
                .then((response) => {
                    setTitle("");
                    setMessage("");
                    setSuccess("Post Added Successfully");
                })
                .catch((error) => {
                    setError(error.message);
                })
            setError("")
        }
    }catch (e) {
        setError(e.message)
    }
  }


  return (
    <div className="addBlog">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card mt-5">
              <div className="card-body">
                <h6 className="card-title">Add Post</h6>
                {success ? (
                  <div className="alert alert-success">{success}</div>
                ) : null}
                {error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : null}
                <input
                  type="text"
                  className="form-control mb-4"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="form-control"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  cols="10"
                  rows="7"
                ></textarea>
              </div>
              <button
                  className="btn btn-primary btn-sm ml-4 p-2 m-2"
                  onClick={addPostHandler}
                  disabled={!message && !title}>
                 <span className="handlePlaceholder">Add Post</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
