import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const NavbarMain = () => {

    const handleLogout = () => {
        // Implement your logout logic here (e.g., clearing tokens, redirecting)
        console.log("Logging out...");
    };

    return (
        <Navbar expand="lg" className="bg-warning">
            <Container fluid>
                <NavLink className="nav-link " to="/" >Movies App</NavLink>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink className="nav-link " to="/" >Home</NavLink>
                        <NavLink className="nav-link" to="/playlist">Playlist</NavLink>


                    </Nav>
                    {/* Logout Button */}
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarMain;