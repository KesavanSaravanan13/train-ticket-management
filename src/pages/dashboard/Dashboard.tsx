import { Button, Col, Row } from "react-bootstrap";
import '../../css/Dashboard.css';
import menu_bar from '../../assests/menu-bar.png';
import backgroundVideo from '../../assests/backG-video.mp4';


const Dashboard = () => {
    return (
        <Row className="m-0 p-0 vh-100 dashboard-container">
            <Col className="m-0 p-0 TopColumn">
                <video className="background-video opacity-100 " autoPlay loop muted>
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <Row className="m-0 p-0">
                    <Col className="m-0 p-0">
                        <Button className="m-0 p-0 menuButton">
                            <img className="m-1 p-0 imgMenu" src={menu_bar} width={'32px'} height={'32px'} />
                        </Button>
                    </Col>

                </Row>
            </Col>
        </Row>
    );
}

export default Dashboard;