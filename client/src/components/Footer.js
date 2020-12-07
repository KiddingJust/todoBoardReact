import React from 'react'
import { Row, Col } from "reactstrap"


const Footer = () => {
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year;
    };

    return (
        // Row는 아래 한칸. Col은 이를 12칸으로 나눈 것.
        // m 은 마진, p는 위아래 공간?
        <div id="main-footer" className="text-center p-2">
            <Row>
                <Col>
                <p> Copyright &copy; <span>{thisYear()}</span></p>
                </Col>
            </Row>
        </div>
    )
};

export default Footer;

