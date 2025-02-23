import React, { useEffect, useState } from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/Card/Card";
import Footer from "../../components/footer/Footer";
import { host } from "../../constants/request"
import { useSelector } from "react-redux";
import axios from "axios"
import { mediaPath } from "../../constants/medias";

// const slides = [
//   {
//     image: Slider1,
//     title: "Birinchi slayd",
//     description:
//       "Bu birinchi slaydning tavsifi. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//   },
//   {
//     image: Slider3,
//     title: "Uchinchi slayd",
//     description:
//       "Bu uchinchi slaydning tavsifi. Porro cumque vitae ex natus laboriosam non animi itaque.",
//   },
// ];

export default function Home() {
  const [books, setBooks] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookCategories, setBookCategories] = useState([])
  const [slides, setSlides] = useState([])

  const user = useSelector(store => store.user)
  const cart = useSelector(store => store.cart)
  console.log(cart)

  useEffect(() => {
    if (user?.user == null) {
      window.location.replace("/login")
    }

    const getBooks = async () => {
      try {
        const res = await axios.get(`${host}/api/book`)
        setBooks(res.data)
        const categories = new Set();
        const sliders = [];

        res.data.forEach(book => {
          if (Array.isArray(book.category) && book.category.length > 0) {
            if (book.category.includes("Slider uchun")) {
              sliders.push(book); // Sliderni alohida saqlash
            } else {
              categories.add(book.category[0].trim()); // Bo‘sh joylarni olib tashlash
            }
          }
        });

        setSlides(prev => [...prev, ...sliders]);

        setBookCategories(prev => [...new Set([...prev, ...categories])]);


      } catch (error) {
        console.log(error)
      }
    }
    getBooks()

  }, [])


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="home">
        <Navbar />
        <div className="slider-container">
          <button className="prev" onClick={prevSlide}>&#10094;</button>

          <div className="slider">
            {slides.map((slide, index) => (
              <div key={index} className={`slider-item ${index === currentIndex ? "active" : "hidden"}`}>
                <img src={mediaPath + `/${slide.img}`} alt={`Slide ${index + 1}`} className="slider-img" />
                <div className="slider-text">
                  <h2>{slide.title}</h2>
                  <p>{slide.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="next" onClick={nextSlide}>&#10095;</button>
        </div>
        {
          bookCategories.map((bookCategory) => {
            return (
              <div className="books-rating" key={bookCategories}>
                <div className="books-rating__titles">
                  <h1>{bookCategory}</h1>
                  <button onClick={() => {
                    window.location.replace(`/viewall?category=${bookCategory}`)
                  }}>Hammasini ko'rish</button>
                </div>
                <div className="card-container">
                  {
                    books.map(book => {
                      if (book.category.includes(bookCategory)) {
                        return (
                          <Card book={book} key={book?._id} />
                        )
                      }
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      <Footer />
    </>
  );
}
