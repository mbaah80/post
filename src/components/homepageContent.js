import React, { useState, useEffect } from "react";
import axios from "axios";
import './home.css'

const Homepage = () =>{
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] =useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Logic for displaying current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Handle click on pagination
    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    function deleteHandler(event) {
        const postId = event.target.parentElement.parentElement.firstChild.textContent;

        axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => {
                setSuccess(`Post ${postId} deleted successfully`)
                setPosts(posts.filter(post => post.id !== parseInt(postId)));
            })
            .catch(error => {
                setError(`Failed to delete post ${postId}: ${error.message}`)
            });
    }


    return (
       <div className='homePage'>
        <div className="ThankBannerClass">
            {success ? (
                <div className="alert alert-success">{success}</div>
            ) : null}
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Body</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {currentPosts.map((post) => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td>
                            <button className="btn btn-danger btn-sm" onClick={(e)=>deleteHandler(e)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <ul className="pagination">
                    {pageNumbers.map((number) => (
                        <li
                            key={number}
                            className={`page-item ${number === currentPage ? "active" : ""}`}
                        >
                            <button className="page-link" id={number} onClick={handleClick}>
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
       </div>
    )
}

export default Homepage
