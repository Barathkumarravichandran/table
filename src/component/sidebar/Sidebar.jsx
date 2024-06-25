import React from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <aside className="side_bar">
            <div className="head p-3">
                <Link to="/">
                    <h1>Logo</h1>
                </Link>
            </div>
            <Navbar />
            <div className="foot px-2 pb-5">
                <div className='user_card'>
                    <img src="https://placehold.co/70/png" width={70} height={70} className='img-fluid img-thumbnail rounded-circle' alt='user' />
                    <div className="details">
                        <h3>Manikandan S</h3>
                        <Link to={"/"}>View Profile</Link>
                    </div>
                </div>
            </div>
        </aside>

    )
}

export default Sidebar