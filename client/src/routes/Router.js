import React from 'react';
import AppNavbar from '../components/AppNavbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

//cf. { 괄호는 return 필요 }, (이 괄호는 필요없음)
const MyRouter = () => (
    //<Fragment>는 <>  로도 생략 가능. 
    <>
        <AppNavbar />
        <Header />
        <h1>Hello Body</h1>
        <Footer />
    </>
);

export default MyRouter;