import { Col, Row } from "react-bootstrap";
import Login from "./Login";
import '../../css/IndexPage.css';
import Logo from '../../assests/Logo.png';


const IndexPage = () => {
    return (
        <Row className="m-0 p-0 vh-100">
            <Col className="m-0 p-0 col-6 d-flex flex-fill justify-content-center align-items-center h-100">
                <Row className="m-0 p-0">
                    <img src={Logo} className="m-0 p-0 w-75"/>
                </Row>

            </Col>
            <Col className="m-0 p-0 col-6 rightIndexPage d-flex justify-content-center">
                <Login />
            </Col>
        </Row>
    );
}

export default IndexPage;