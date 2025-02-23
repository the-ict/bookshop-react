import React from 'react'
import "./card.css"
import { mediaPath } from "../../constants/medias"

export default function Card({ book }) {
    return (
        <div className='card' onClick={() => {
            window.location.replace(`/single/${book._id}`)
        }}>
            <img src={mediaPath + `/${book.img}`} alt="book 1 png" />
            <div className='book-content'>
                <div>
                    <h3>{book.title}</h3>
                    {/* <p></p> */}
                </div>
                <span>{book.price} $</span>
            </div>
        </div>
    )
}
