import React, { useContext, useState } from 'react'
import { Nav, NavDropdown, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import '../css_files/header.css';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { UserContext, LoginContext, LogoutContext, CustomerIdTransfer, ConsultantIdTransfer, CattleIdContext } from './App';
import img1 from '../img/icons8-shopping-cart-100.png';

const Header = () => {

    const { mstate } = useContext(UserContext);
    const { lstate } = useContext(LoginContext);
    const { logoutstate } = useContext(LogoutContext)



    const [search, setsearch] = useState('');
    const history = useHistory();

    // console.log(`my mstate ${mstate}`);
    // console.log(`my lstate ${lstate}`);
    // console.log(`my logoutstate ${logoutstate}`);


    localStorage.removeItem('ConsultantFeestate');
    localStorage.removeItem('PickDropFeestate');




    const RenderMenu = () => {

        if (logoutstate === 'true') {
            localStorage.removeItem('logoutState');
            // localStorage.removeItem('lstate');
            // localStorage.removeItem('tstate');
            localStorage.setItem('logoutState', 'true');
        }

        const myState = localStorage.getItem('logoutState');
        // console.log(myState);

        if (mstate === 'true' || myState === 'false') {

            localStorage.setItem('logoutState', 'false');
            return (
                <>

                    <Nav.Item className="check">
                        <NavDropdown title="My Profile">
                            <NavDropdown.Item >
                                <Link to='/account'>Account</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item >
                                <Link to='/logout'>Logout</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Item>

                </>
            )
        } else {
            return (
                <>
                    <Nav.Item>

                        <NavLink className="nav-link" to="/register">Register</NavLink>

                    </Nav.Item>
                    <Nav.Item>

                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </Nav.Item>
                </>
            )
        }

    }

    const onChangeHandler = (event) => {
        const value = event.target.value;
        setsearch(value);
    }

    const onClickHandler = () => {
        if (search === 'cow' || search === 'Cow' || search === 'COW') {

            history.push('/cow');

        } else if (search === 'goat' || search === 'Goat' || search === 'GOAT') {

            history.push('/goat');

        } else if (search === 'goat' || search === 'Goat' || search === 'GOAT') {

            history.push('/goat');

        } else if (search === 'camel' || search === 'Camel' || search === 'CAMEL') {

            history.push('/camel');

        } else if (search === 'sheep' || search === 'Sheep' || search === 'SHEEP') {

            history.push('/sheep');

        } else {
            history.push('/error');
        }
    }

    const CheckLogin = () => {
        const mytstate = localStorage.getItem('tstate');
        if (mytstate === 'customer' || mytstate === 'Customer') {
            history.push('/cart');
        } else {
            window.alert('Please Login as Customer to continue.');
        }
    }

    return (
        <>
            <div>


                <Navbar className="my_nav" expand="lg" fixed="top">
                    <Navbar.Brand id="brand">
                        <Link to="/home">Cattle Shop</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="my_navitems" >
                        <Nav>
                            <Nav.Item className="check">
                                <NavDropdown title="Cattles">
                                    <NavDropdown.Item>
                                        <Link to='/goat'>Goats</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item >
                                        <Link to='/cow'>Cows</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item >
                                        <Link to='/sheep'>Sheeps</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item >
                                        <Link to='/camel'>Camels</Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink className="nav-link" to="/event">Events</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink className="nav-link" to="/aboutus">About</NavLink>
                            </Nav.Item>


                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Item>
                                <Nav.Link>
                                    <Button variant='light' style={{ borderRadius: '30px' }} onClick={CheckLogin}><img src={img1} style={{ width: "1.4rem", height: "1.3rem" }} /></Button>
                                </Nav.Link>
                            </Nav.Item>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={onChangeHandler}
                                    value={search} />
                            </Form>
                            <Button className="searchBtn" onClick={onClickHandler}>Search</Button>
                            <RenderMenu />
                        </Nav>

                    </Navbar.Collapse>

                </Navbar>

            </div>
        </>
    )
}

export default Header;