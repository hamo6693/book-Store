import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function UpdateBook() {
  const [url, setUrl] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("");

  const Navigate = useNavigate();

  const { id } = useParams();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.auth);
  console.log(isLoggedIn, role);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: localStorage.getItem("accessToken"),
    bookid: id,
  };

  useEffect(() => {
    const getTheBook = async () => {
      const response = await axios.get(
        `http://localhost:4000/get-the-book/${id}`,

        { headers }
      );
      console.log(response);
      setUrl(response.data.data.url);
      setTitle(response.data.data.title);
      setDesc(response.data.data.desc);
      setPrice(response.data.data.price);
      setLanguage(response.data.data.language);
      setAuthor(response.data.data.author);
    };
    getTheBook();
  }, []);

  function handleChange(e) {
    console.log(e.target.files);
    setUrl(e.target.files[0]);
  }

  const submit = async () => {
    const data = {
        title: title,
        desc:desc,
        price:price,
        language:language,
        author:author
      };
  
    try {
      const response = await axios.put("http://localhost:4000/update-book",data, {
        headers,
      });
      console.log(response);
      Navigate(`/view-book-details/${id}`)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="h-[100%] bg-zinc-900  p-0 md:p-4">
      <h1 className="  text-3xl md:text-3xl font-semibold text-zinc-500 mb-8">
        Update Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label className="text-zinc-400">Images</label>
          <input
            type="file"
            className="w-full bg-zinc-900 text-zinc-100 p-2 mt-2 outline-none"
            onChange={handleChange}
          />
          <img
            src={window.URL.createObjectURL}
            style={{ margin: "0 auto", width: "25%" }}
          />
        </div>

        <div className="mt-4">
          <label className="text-zinc-400">title of book</label>
          <input
            type="text"
            className="w-full bg-zinc-900 text-zinc-100 p-2 mt-2 outline-none"
            placeholder="title of book"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="text-zinc-400">Author of book</label>
          <input
            type="text"
            className="w-full bg-zinc-900 text-zinc-100 p-2 mt-2 outline-none"
            placeholder="author of book"
            name="author"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label className="text-zinc-400">Language</label>
            <input
              type="text"
              className="w-full bg-zinc-900 text-zinc-100 p-2 mt-2 outline-none"
              placeholder="language of book"
              name="language"
              required
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <div className="w-3/6">
            <label className="text-zinc-400">Price</label>
            <input
              type="number"
              className="w-full bg-zinc-900 text-zinc-100 p-2 mt-2 outline-none"
              placeholder="price of book"
              name="price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-zinc-400">Description of book</label>
          <textarea
            type="text"
            className="w-full bg-zinc-900 text-zinc-100 p-2 mt-2 outline-none"
            rows="5"
            placeholder="description of book"
            name="description"
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <button
          className="mt-4 px-3 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
}

export default UpdateBook;
