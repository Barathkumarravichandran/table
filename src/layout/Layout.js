import React from 'react'
import Sidebar from '../component/sidebar/Sidebar'
import RoutePaths from '../routes/RoutePaths'

const Layout = () => {
    return (
        <div className='root-container'>
            <Sidebar />
            <main className='pb-3 px-3 pt-0'>
                <RoutePaths />
            </main>
        </div>
    )
}

export default Layout