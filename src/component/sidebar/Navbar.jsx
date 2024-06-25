import React from 'react'
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    const navDatas = [

        {
            path: "/",
            name: "Products"
        },
        {
            path: "dashboard",
            name: "Dashboard"
        },
        {
            path: "Project",
            name: "Project"
        },
        {
            path: "Tasks",
            name: "Tasks"
        },
        {
            path: "Calender",
            name: "Calender"
        }
    ]
    return (
        <nav>
            <ul>
                {
                    navDatas.map((menu, index) =>
                        <li key={index}>
                            <NavLink activeclassname="active" to={menu.path}>{menu.name}</NavLink>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}

export default Navbar