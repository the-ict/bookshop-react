import React from 'react'
import "./footer.css"

export default function Footer() {
    return (
        <div className='footer'>
            <h3>Booking app navigation</h3>
            <ul className='footer-items'>
                <li>
                    <a href="/checkout">Checkout</a>
                </li>
                <li>
                    <a href="/favorite">Favorite</a>
                </li>
            </ul>
            <span>Created by DM ©</span>
        </div>
    )
}
