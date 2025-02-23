import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import "./searched.css"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { host } from "../../constants/request"
import Card from "../../components/Card/Card"

export default function Searched() {
    const [books, setBooks] = useState([])
    const location = useLocation()

    useEffect(() => {
        const searchPost = async () => {
            try {
                const res = await axios.get(`${host}/api/book/find/search?searched=${location.search.split("=")[1]}`)
                console.log(res.data)
                setBooks(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        searchPost()
    }, [location.search])
    return (
        <div className='searched-container'>
            <Navbar />
            <div className="searched">
                {
                    books.length === 0 ? (
                        <p>Kitob topilmadi !</p>
                    ) : (
                        books.map(book => {
                            return <Card book={book} />
                        })
                    )
                }
            </div>
        </div>
    )
}
