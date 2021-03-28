import React from "react"
import {Navbar, Button, NavDropdown} from "react-bootstrap"
import {styles} from "../helpers/styles"
import {AppStateContext} from "../context/AppContext"
import {Link, useLocation} from "react-router-dom";
import { IUserDataType } from "../helpers/types";


type Props = {
    handleShow: any;
    hasSingedIn:boolean;
    userData:IUserDataType;
    handleSingOut:any;
};

const NavBar: React.FC<Props> = ({
    handleShow,
    hasSingedIn,
    handleSingOut,
    userData
}) =>{
    const dropdownTitle = `Hi, ${userData.address}`;
    const location = useLocation();
    const showGameLobbyLink = !!userData.address && location.pathname !== "/gameLobby";
    return (
        <>
            <Navbar style={styles.header}>
                <Navbar.Brand href="/" style={styles.headerLogoText}>Crypto Guess</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {/* Switch between "Connect Wallet" and  */}
                    {showGameLobbyLink && 
                    <Navbar.Text style={styles.headerNavTextLight}><Link to="/gameLobby" >Back to Game Lobby</Link></Navbar.Text>
                    }
                    <Navbar.Text >
                        {!hasSingedIn ? 
                            <Button variant="outline-dark" onClick={handleShow}>Connect Wallet</Button>
                            :
                            <>
                                <NavDropdown title={dropdownTitle} style={styles.headerNavText} id="basic-nav-dropdown">
                                    <NavDropdown.Item> <Link to="/gameLobby" >Game Lobby</Link></NavDropdown.Item>
                                    <NavDropdown.Item><Link to="/personalPage" > Account</Link></NavDropdown.Item>
                                    <NavDropdown.Item><Link to="/" > About Us</Link></NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleSingOut} >Log off</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        }
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar;