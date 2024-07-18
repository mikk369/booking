import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostList = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsAndComments = async () => {
      try {
        // Fetch all posts
        const postsResponse = await axios.get('https://testwordpress.webcodes.ee/wp-json/wp/v2/posts');
        const postsData = postsResponse.data;

        // Fetch all comments
        const commentsResponse = await axios.get('https://testwordpress.webcodes.ee/wp-json/wp/v2/comments');
        const commentsData = commentsResponse.data;

        // Associate comments with their respective posts
        const postsWithComments = postsData.map(post => ({
          ...post,
          comments: commentsData.filter(comment => comment.post === post.id)
        }));

        setPosts(postsWithComments);
      } catch (error) {
        console.error('Error fetching posts and comments:', error);
        setError('Failed to load posts and comments');
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndComments();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="postPage">
      <h2>Recent Posts</h2>
      <ul className="posts">
        {posts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <li className="post">
            <h3>{post.title.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            <p className="author">Author: {post.author}</p>
            <p className="date">
              Date: {new Date(post.date).toLocaleDateString()}
            </p>
            {post.comments && post.comments.length > 0 && (
              <div>
                <h4>Comments:</h4>
                <ul>
                  {post.comments.map((comment) => (
                    <li key={comment.id}>
                      <strong>{comment.author_name}</strong>:{' '}
                      <div dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
            </Link>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
