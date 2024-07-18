import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await axios.get(`https://testwordpress.webcodes.ee/wp-json/wp/v2/posts/${id}`);
        const postData = postResponse.data;

        const commentsResponse = await axios.get('https://testwordpress.webcodes.ee/wp-json/wp/v2/comments');
        const commentsData = commentsResponse.data;

        const postWithComments = {
          ...postData,
          comments: commentsData.filter(comment => comment.post === postData.id)
        };

        setPost(postWithComments);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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
    <div className="post-detail">
      <h2>{post.title.rendered}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      <p className="author">Author: {post.author}</p>
      <p className="date">Date: {new Date(post.date).toLocaleDateString()}</p>
      {post.comments && post.comments.length > 0 && (
        <div>
          <h4>Comments:</h4>
          <ul>
            {post.comments.map(comment => (
              <li key={comment.id}>
                <strong>{comment.author_name}</strong>: 
                <div dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
