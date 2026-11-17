import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "https://mern-crud-backend-sw8w.onrender.com/api/v1/posts";

function AddEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      async function fetchPost() {
        try {
          const response = await fetch(`${API_URL}/${id}`);
          const data = await response.json();

          setTitle(data.data.title);
          setContent(data.data.content);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      }

      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to save post");
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Unable to save post");
    }
  };

  return (
    <>
      <div>{id ? "Edit Form" : "Add Form"}</div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />

        <button type="submit">{id ? "Update" : "Add"}</button>
      </form>
    </>
  );
}

export default AddEditForm;