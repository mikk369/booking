import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPostsAndComments = async () => {
      try {
        const response = await axios.get(
          'https://webcodes.ee/test/wp-json/wp/v2/posts'
        );
        const postsData = response.data;

        // Fetch comments for each post concurrently
        const commentsPromises = postsData.map(async (post) => {
          const commentsResponse = await axios.get(
            `https://webcodes.ee/test/wp-json/wp/v2/comments?post=${post.id}`
          );
          return { ...post, comments: commentsResponse.data };
        });

        // Wait for all comments to be fetched
        const postsWithComments = await Promise.all(commentsPromises);
        setPosts(postsWithComments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts and comments:', error);
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

  return (
    <div className="postPage">
      <h2>Recent Posts</h2>
      <ul className="posts">
        {posts.map((post) => (
          <li className="post" key={post.id}>
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
                      <div
                        dangerouslySetInnerHTML={{
                          __html: comment.content.rendered,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
