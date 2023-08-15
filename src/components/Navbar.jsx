import React, { useState } from 'react';
import { Link as NavLink } from 'react-router-dom';
import Login from "./Login.jsx";
import { Text, Container, Row, Col, Button, Image } from '@nextui-org/react';

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navStyle = "py-3 shadow-lg ";


    return (
        <Container fluid className={navStyle}>
            <Row>
                <Row>
                    <NavLink to="/" className="">
                        <Image src="../images/logoheader.png" height={"60px"} alt="logo" />
                    </NavLink>
                    <NavLink to="/src/pages/movies" className="linkStyle">Movies</NavLink>
                    <NavLink to="/src/pages/series" className="linkStyle">TV Shows</NavLink>
                    <NavLink to="/src/pages/actors" className="linkStyle">Actors</NavLink>
                    <NavLink to="/src/pages/categories" className="linkStyle">Categories</NavLink>
                    <NavLink to="/pages/about" className="linkStyle">About</NavLink>
                </Row>
                <Login />
            </Row>
            <Button auto className='mobileBtn' onClick={toggleMenu}>Menu</Button>
            <ul className={isMenuOpen ? 'open' : 'closed'}>
                <li><NavLink to="/src/pages/movies">Movies</NavLink></li>
                <li><NavLink to="/src/pages/series">TV Shows</NavLink></li>
                <li><NavLink to="/src/pages/actors">Actors</NavLink></li>
                <li><NavLink to="/src/pages/categories">Categories</NavLink></li>
                <li><NavLink to="/pages/about">About</NavLink></li>
            </ul>
        </Container>
    );
}
export default Nav;
