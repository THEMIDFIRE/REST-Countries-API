import { Outlet } from 'react-router'
import DarkMode from '../DarkMode/DarkMode'

function Layout() {
    return (
        <>
            <DarkMode />
            <Outlet/>
        </>
    )
}

export default Layout
