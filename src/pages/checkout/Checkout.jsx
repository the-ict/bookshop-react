import React from 'react'
import "./checkout.css"
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useDispatch, useSelector } from "react-redux"
import { decrement, increment, removeFromCart } from '../../redux/cartSlice'
import { mediaPath } from "../../constants/medias"
import { useNavigate } from "react-router-dom"


export default function Checkout() {
    const dispatch = useDispatch()


    const navigate = useNavigate()
    const carts = useSelector(store => store.cart.carts)


    return (
        <>
            <div className='checkout'>
                <Navbar />
                <div className="checkout-content">
                    <div className='checkout-details'>
                        <div className='checkout-details__arrow'>
                            <i className="fa-solid fa-arrow-left" onClick={() => {
                                navigate(-1)
                            }}></i>
                            <b>Kitob malumotlari</b>
                        </div>
                        <hr />
                        <h3>Kitoblar</h3>
                        <p>Siz <b>{carts.length}</b>ta kitob sotiv olish uchun tanladingiz</p>
                        <div className='checkout-details__items'>
                            {
                                carts.map(cart => {
                                    return (
                                        <div className="checkout-details__item" key={cart._id}>
                                            <img src={mediaPath + `/${cart.img}`} alt="Book img" />
                                            <b>{cart.title}</b>
                                            <span style={{
                                                fontWeight: "bolder"
                                            }}>{cart.number}</span>
                                            <div className='details-item__buttons'>
                                                <i
                                                    onClick={() => {
                                                        dispatch(increment(cart._id))
                                                    }}
                                                    className="fa-solid fa-arrow-up"></i>
                                                <i
                                                    onClick={() => {
                                                        dispatch(decrement(cart._id))
                                                    }}
                                                    className="fa-solid fa-arrow-down" style={{
                                                        marginLeft: 5
                                                    }}></i>
                                            </div>
                                            <b>{cart.price}$</b>
                                            <i className="fa-solid fa-trash" onClick={() => {
                                                dispatch(removeFromCart(cart._id))
                                            }}></i>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className='checkout-payment'>
                        <h3>Buyurtma xulosasi</h3>
                        <div>
                            <b>Soni:</b>
                            <span>{carts.length}</span>
                        </div>
                        <div>
                            <b>Umumiy narxi:</b>
                            <span>{carts.reduce((total, item) => total + item.price * item.number, 0)}$</span>
                        </div>
                        {
                            carts.length === 0 ? (
                                <a href="/">Savatga kitob qo'shing</a>
                            ) : (
                                <button>Sotib olish!</button>
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
