import axios from "axios";
import React, { useState } from "react";
import {  Navigate, useNavigate } from "react-router-dom";

function AddBook() {
  const [url, setUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("");
    const Navigate = useNavigate();


  const submit = async () => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: localStorage.getItem("accessToken"),
      role: localStorage.getItem("role"),
    };

    try {
      const formData = new FormData();
      formData.append("url", url),
        formData.append("title", title),
        formData.append("author", author),
        formData.append("price", price);
      formData.append("desc", desc);
      formData.append("language", language);

      const res = await axios.post(
        "http://localhost:4000/create-book",
        formData,
        { headers }
      );
      console.log(res);
      alert(res.data.message)
      setUrl("")
      setTitle("")
      setAuthor("")
      setDesc("")
      setLanguage("")
      setPrice("")
            Navigate("/");


      
    } catch (e) {
      console.log(e);
      alert(e.data.message)

    }
  };

  function handleChange(e) {
    console.log(e.target.files);
    setUrl(e.target.files[0]);
  }

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-3xl font-semibold text-zinc-500 mb-8">
        Add Book
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
            src={url ? URL.createObjectURL(url) : ""}
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
          Add Book
        </button>
      </div>
    </div>
  );
}

export default AddBook;
