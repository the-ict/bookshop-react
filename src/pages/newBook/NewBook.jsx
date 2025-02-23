import React, { useEffect, useState } from 'react';
import "./newbook.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useSelector } from 'react-redux';
import axios from "axios";
import { host } from "../../constants/request";

export default function NewBook() {
  const [bookfile, setBookfile] = useState(null);
  const [bookimg, setBookimg] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState([])

  const user = useSelector(store => store.user);

  useEffect(() => {
    console.log(user?.user?.email)
    if (user?.user?.email !== process.env.REACT_APP_ADMIN_EMAIL) {
      window.location.replace("/")
    }
  }, [user])

  useEffect(() => {
    console.log(category);
  }, [category]);

  const handleCreate = async () => {
    try {
      const newBook = {
        title,
        desc,
        user_id: user?.user?._id,
        price
      };

      if (bookfile && bookfile.name) {
        try {
          const fileName = Date.now() + bookfile.name;
          console.log(fileName);

          const data = new FormData();
          data.append("name", fileName);
          data.append("file", bookfile);

          console.log(data);
          const res = await axios.post(`${host}/media`, data);
          newBook.file = fileName
        } catch (error) {
          console.log(error)
        }

      }

      if (bookimg && bookimg.name) {
        try {
          const fileName = Date.now() + bookimg.name;
          console.log(fileName);

          const data = new FormData();
          data.append("name", fileName);
          data.append("file", bookimg);

          console.log(data);
          const res = await axios.post(`${host}/media`, data);
          newBook.img = fileName
        } catch (error) {
          console.log(error)
        }
      }

      if (category) {
        if (category.includes("Slider uchun")) {
          newBook.status = "slider"
        }
        newBook.category = category
      }

      console.log(newBook)

      const res = await axios.post(`${host}/api/book`, newBook)
      window.location.replace("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="newbook">
        <Navbar />
        <div className="newbook-container">
          <div className="newbook-content">
            <label htmlFor="file" className="newbook-file">
              <span>Rasmi</span>
              {
                bookimg?.name ? (
                  <i>{bookimg.name}</i>
                ) : (
                  <i className="fa-solid fa-image"></i>
                )
              }
            </label>
            <input
              onChange={(e) => setBookimg(e.target.files[0])}
              type="file"
              style={{ display: "none" }}
              id="file"
              name="bookimg"
            />

            <label htmlFor="bookfile" className="newbook-file">
              <span>Kitob</span>
              {bookfile?.name ? (
                <i>{bookfile.name}</i>
              ) : (
                <i className="fa-solid fa-file"></i>
              )}
            </label>
            <input
              onChange={(e) => setBookfile(e.target.files[0])}
              type="file"
              style={{ display: "none" }}
              id="bookfile"
              name="bookfile"
            />

            <label>Narxi $</label>
            <input onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Narxi" />

            <label>Nomi</label>
            <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Nomi" />

            <label>Xulosa</label>
            <textarea onChange={(e) => setDesc(e.target.value)} placeholder="Xulosa" />

            <label>Turi</label>
            <div className='newbook-categories'>
              {
                ["Slider uchun", "Triller", "Trading", "Dasturlash", "Klassik"].map(item => (
                  <div className='newbook-category' onClick={() => {
                    setCategory(prev => [...prev, item])
                  }}>
                    <p>{item}</p>
                    {
                      category.includes(item) ? (
                        <i className="fa-solid fa-check"></i>
                      ) : (
                        <i className="fa-solid fa-x"></i>
                      )
                    }
                  </div>
                ))
              }
            </div>

            <button onClick={handleCreate}>Yaratish</button>
          </div>
        </div>
      </div >
      <Footer />
    </>
  );
}
