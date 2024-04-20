import React,{useState} from "react";
import './MainNavigation.css'
import MainHeader from "./MainHeader";
import Backdrop from "../UIElements/Backdrop";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import { Link } from "react-router-dom";

const MainNavigation = (props) => {

    const [drawerIsOpen,setDrawerIsOpen] = useState(false)

    const openDrawerHandler = () =>{
        setDrawerIsOpen(true)
    }

    const closeDrawerHandler = () =>{
        setDrawerIsOpen(false)
    }

    return(<>
    {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
    <SideDrawer onClick={closeDrawerHandler} show={drawerIsOpen}>
        <nav className="main-navigation__drawer-nav">
            <NavLinks/>
        </nav>
    </SideDrawer>
         <MainHeader>
        <div className="main-navigation__btn__heading">
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
            <span />
            <span />
            <span />
        </button>
        <h1 className="main-navigation__title"><Link to='/'>LifeGlimpZ</Link></h1>
        </div>
        <nav className="main-navigation__header-nav">
            <NavLinks/>
        </nav>
    </MainHeader>
    </>)
}

export default MainNavigation;