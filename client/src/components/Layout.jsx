import Navbar from "../screens/navbar";
import { Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <>
            <Navbar />
            <div style={{marginTop : '90px' ,position : 'relative' , height : '100%'}}>
                <Outlet />

            </div>
        </>
    )
}
export default Layout;