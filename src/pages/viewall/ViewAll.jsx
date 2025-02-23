import React, { useEffect, useState } from 'react'
import "./viewall.css"
import Navbar from '../../components/navbar/Navbar'
import axios from "axios"
import { host } from "../../constants/request"
import { mediaPath } from "../../constants/medias"
import { useLocation } from "react-router-dom"


export default function ViewAll() {
    const [books, setBooks] = useState([])

    const location = useLocation()


    useEffect(() => {
        const findBooks = async () => {
            try {
                const res = await axios.get(`${host}/api/book/find/with${location.search}`)
                console.log(res.data)
                setBooks(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        findBooks()
    }, [])

    return (
        <div className='viewall'>
            <Navbar />
            <div className="view-content">
                <div className='view-content__arrow'>
                    <i onClick={() => window.location.replace("/")} className="fa-solid fa-arrow-left"></i>
                    <b>{location.search.split("=")[1]}</b>
                </div>
                <div className='view-content__items'>
                    {
                        books.map(book => {
                            return (
                                <a href={`single/${book._id}`} style={{
                                    textDecoration: "none",
                                    color: "black"
                                }} key={book._id}>
                                    <div className="view-content__item">
                                        <img src={mediaPath + `/${book.img}`} alt="book 1" />
                                        <h3>{book.title}</h3>
                                        <div className="content-titles">
                                            {/* <p>
                                            Frank Herbert
                                        </p> */}
                                            <b>{book.price} $</b>
                                        </div>
                                    </div>
                                </a>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}
