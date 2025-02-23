import Navbar from '../../components/navbar/Navbar'
import { mediaPath } from '../../constants/medias'
import { useSelector } from 'react-redux'
import React from 'react'
import "./favorite.css"

export default function Favorite() {
    const favorites = useSelector(store => store.favorite.favorites)

    return (
        <div className='favorite-container'>
            <Navbar />
            <div className='favorite'>
                <div className="favorite">
                    {
                        favorites.length == 0 ? (
                            <p style={{
                                textAlign: "center",
                                fontWeight: "bold"
                            }}>Yoqtirgan kitoblaringiz mavjud emas!</p>
                        ) :
                            favorites.map(favorite => {
                                return (
                                    <a href={`single/${favorite._id}`} style={{
                                        textDecoration: "none",
                                        color: "black"
                                    }} key={favorite._id}>
                                        <div className="view-content__item">
                                            <img src={mediaPath + `/${favorite.img}`} alt="favorite 1" />
                                            <h3>{favorite.title}</h3>
                                            <div className="content-titles">
                                                {/* <p>
                                            Frank Herbert
                                        </p> */}
                                                <b>{favorite.price} $</b>
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
