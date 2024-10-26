import { Col, Row } from "react-bootstrap";
import Login from "./Login";
import '../../css/IndexPage.css';
import Logo from '../../assests/Logo.png';
import AutoCarousel from "../../Component/Carosel/AutoCarousel";


const IndexPage = () => {
    return (
        <Row className="m-0 p-0 vh-100">
            {/* <Col className="m-0 p-0 col-6 h-100 ">
                <Row className="m-0 p-0">
                    <Col className="m-0 p-0 py-5 col-12 text-center"><img src={Logo} className="m-0 p-0" width={"150px"} height={"70px"} /></Col>
                    <Col className="m-0 p-0 col-12 text-center">
                        Welcome to our Train Ticket Booking App! We make it easy for you to search, book, <br />
                        and manage your train journeys in just a few clicks.
                    </Col>
                    <Col className="m-0 p-0 col-12 text-start">
                        <h6 className="m-0 p-0 ps-5 text-danger">Here’s what you can expect:</h6><br />
                        <h6 className="m-0 p-0 ps-5 text-danger"> Easy Search and Booking:</h6>
                        <p className="m-0" style={{ paddingLeft: '70px' }}>Quickly find trains based on your preferred travel dates, destinations, and schedules.</p>
                        <h6 className="m-0 p-0 ps-5 text-danger"> Real-time Availability:</h6>
                        <p className="m-0" style={{ paddingLeft: '70px' }}>View seat availability and fare information in real time, helping you choose the best options for your trip.</p>
                        <h6 className="m-0 p-0 ps-5 text-danger"> Smooth Payment Experience:</h6>
                        <p className="m-0" style={{ paddingLeft: '70px' }}>Multiple secure payment options ensure a hassle-free booking experience.</p>
                        <h6 className="m-0 p-0 ps-5 text-danger">Booking Management:</h6>
                        <p className="m-0" style={{ paddingLeft: '70px' }}>View your upcoming trips, access e-tickets, and make any needed changes with ease.</p>
                        <AutoCarousel />
                        <h6 className="m-0 p-0 text-center pt-4">Book your next journey with convenience and confidence. <br />Safe travels!</h6>
                    </Col>
                    
                </Row>

            </Col> */}
            <Col className="m-0 p-0 col rightIndexPage d-flex justify-content-center">
                <Login />
            </Col>
        </Row>
    );
}

export default IndexPage;