import { useNavigate } from "react-router-dom";

const API_URL = "https://mern-crud-backend-sw8w.onrender.com/api/v1/posts";

function Post({ post }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/update-post/${post._id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${post._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      window.location.reload();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Unable to delete post");
    }
  };

  return (
    <div className="post">
      <div className="post-title">{post.title}</div>
      <div className="post-content">{post.content}</div>

      <div className="post-actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Post;