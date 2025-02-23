import React, { useEffect, useState } from 'react'
import "./singlebook.css"
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from "react-router-dom"
import axios from "axios"
import { host } from "../../constants/request"
import { mediaPath } from "../../constants/medias"
import { addToCart } from "../../redux/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { addFavorite, removeFavorite } from "../../redux/favoriteSlice"

export default function SingleBook() {
    const [book, setBook] = useState({})

    const location = useLocation()
    const dispatch = useDispatch()
    const cart = useSelector(store => store.cart)
    const favorite = useSelector(store => store.favorite.favorites)


    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`${host}/api/book/${location.pathname.split("/")[2]}`)
                console.log(res.data)
                setBook(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPost()
    }, [])


    return (
        <div className='single'>
            <Navbar />
            <div className="single-content">
                <div className='single-content__arrow'>
                    <i onClick={() => window.location.replace("/")} className="fa-solid fa-arrow-left"></i>
                    <b>Kitob malumotlari</b>
                </div>
                <div className='single-img__details'>
                    <div className='single-img__container'>
                        <img src={mediaPath + `/${book.img}`} alt="Book" className='single-img' />
                    </div>
                    <div className='single-img__titles'>
                        <div className='img-titles__name'>
                            <h1>{book.title}</h1>
                            {
                                favorite.filter(item => item._id === book._id).toString() ? (
                                    <i style={{
                                        color: "red"
                                    }} className="fa-solid fa-heart" onClick={() => {
                                        dispatch(removeFavorite(book._id))
                                    }}></i>
                                ) : (
                                    <i className="fa-regular fa-heart" onClick={() => {
                                        dispatch(addFavorite(book))
                                    }}></i>
                                )
                            }
                        </div>
                        {/* <h3>Frank Herbert</h3> */}

                        <p>
                            <b style={{ color: "black" }}>Xulosa</b> <br />
                            {book.desc}
                        </p>
                    </div>
                </div>
            </div>
            <div className='buy-now'>
                <b>{book.price}$</b>
                {

                    cart.carts.filter(item => item._id === book._id).toString()
                        ? (
                            <p onClick={() => {
                                window.location.replace("/checkout")
                            }}>Savatchaga qo'shilgan</p>
                        ) : (
                            <p onClick={() => {
                                dispatch(addToCart({
                                    ...book,
                                    number: 1
                                }))
                            }}>Hoziroq sotib oling</p>
                        )
                }
            </div>
        </div>
    )
}
