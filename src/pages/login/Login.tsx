import { Col, Row } from "react-bootstrap"
import '../../css/Login.css';
import LoginForm from "./LoginForm";


const Login = () => {
    return (
        <Row className="m-0 p-0 d-flex justify-content-center align-items-center login">
            <Col className="m-0 p-3 bg-white d-flex justify-content-center align-items-center field">
                <LoginForm/>
            </Col>
        </Row>
    );
}

export default Login;