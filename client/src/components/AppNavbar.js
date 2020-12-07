import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { Navbar, Container, NavbarToggler, Collapse, Nav, Button, NavItem, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginModal from '../components/auth/LoginModal';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT_REQUEST } from '../redux/types';
import RegisterModal from '../components/auth/RegisterModal'

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    //무엇을 불러오는지
    const {isAuthenticated, user, userRole} = useSelector((state) => state.auth)
    console.log(userRole, "UserRole");

    //로그아웃
    const dispatch = useDispatch();

    //useCallback은, 메모리제이션된 콜백 반환? 
    //useEffects는 
    const onLogout = useCallback(()=>{
        dispatch({
            type: LOGOUT_REQUEST
        })
    }, [dispatch])
    //새로 작동하는 부분? user 변했을 떄setIsOepn을 false로 해주자.
    useEffect(() => {
        setIsOpen(false)
    },[user]);

    //toggle을 작동하게 되면, 반대로 작동하게? 뭔소리여
    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const addPostClick = () => {

    }

    const authLink = (
        //userRole이 MainJuin이면 add post라는 버튼 모양의 링크가 표시되고 아니면 빈값. 
        <Fragment>
            <NavItem>
                {userRole === "MainJuin" ? (
                    <Form className="col mt-2">
                        <Link to="post" className="btn btn-success block text-white px-3" onClick={addPostClick}>
                        </Link>
                    </Form>
                ): ""}
            </NavItem>
            <NavItem className="d-flex justify-content-center">
                <Form className="col mt-2">
                    {user && user.name ? (
                        <Link >
                        <Button outline color="light" className="px-3" block>
                            <strong>{user ? `Welcome ${user.name}`:""}</strong>
                        </Button>
                        </Link>
                    ): (
                        <Button outline color="light" className="px-3" block>
                            <strong>"Can't find user</strong>
                        </Button>
                    )}
                </Form>
            </NavItem>
            <NavItem>
                <Form className="col">
                    <Link onClick={onLogout} to="#" >
                        <Button outline color="light" className="mt-2" block>
                            Logout
                        </Button>
                    </Link>
                </Form>
            </NavItem>
        </Fragment>
    )

    const guestLink = (
        <Fragment>
            <NavItem>
                <RegisterModal />
            </NavItem>
            <NavItem>
                <LoginModal />
            </NavItem>
        </Fragment>
    )

    return (
        //sticky-top은 스크롤 하더라도 가장 상단에 붙는 것. 
        <Fragment>
            <Navbar color="dark" dark expand="lg" className="sticky-top">
                <Container>
                    <Link to="/" className="text-white text-decoration-none">
                        Work Repository
                    </Link>
                    <NavbarToggler >
                    </NavbarToggler>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto d-flex justify-content-around" navbar>
                            {isAuthenticated ? (
                                authLink
                            ) : (
                                guestLink
                            )}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};

export default AppNavbar