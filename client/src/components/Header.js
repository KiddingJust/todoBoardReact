import React from 'react'
import { Row, Col } from "reactstrap"

const Header = () => {

    return (
        //margin 3
        <div id="page-header" className="mb-3">
            <Row> 
                <Col md="6" sm="auto" className="text-center m-auto">
                    <h1>Repository</h1>
                    <p>for work</p>
                </Col>
            </Row>
        </div>
    )
};

export default Header;