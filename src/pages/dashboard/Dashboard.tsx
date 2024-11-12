import '../../css/Dashboard.css';
import menu_bar from '../../assests/menu_bar.png';
import { Button, Col, Row } from "react-bootstrap";
import MenuButton from "../../Component/Button/MenuButton";
import profile from '../../assests/user.png';
import { useEffect, useState } from 'react';
import TopRow, { initialValuesType } from './TopRow';
import Weather from '../../utils/API/Weather';
import SearchResult from './SearchResult';
import BookingSeat from '../booking/BookingSeat';


// type FormValues = {
//     from: String,
//     to: String,
//     city: String
// }

export interface trainType {
    trainId: BigInt,
    trainNumber: number;
    fromPlace: string;
    toPlace: string;
    arriveAt: string;
    reachOn: string;
    reachingTime: string;
}

const Dashboard = () => {

    const [menu, setMenu] = useState(true);
    const [userprofile, setUserProfile] = useState(true);
    const [menuButton, setMenuButton] = useState(true);

    const [showSearch, setShowSearch] = useState(false);
    const [values, setValues] = useState<initialValuesType>();

    return (
        <>
            <Row className="m-0 p-0 vh-100 dashboard-container  position-relative">
                <Col className="m-0 p-0 col" style={{ width: "150px" }}>
                    <Button className={`btn m-0 p-1 menuButton ${menuButton ? 'menuNormal' : 'menuFocus'}`}
                        onMouseEnter={() => { setMenuButton(!menuButton) }}
                        onMouseLeave={() => { setMenuButton(!menuButton) }}
                        onClick={() => {
                            setMenu(!menu);
                        }}>
                        <img className="m-1 p-0" src={menu_bar} width={'28px'} height={'28px'} alt={"Menu Bar"} />
                    </Button>
                    <Col className={`m-0 p-0 col-2 ${menu ? 'menuHidden' : 'menu'}`}>
                        <MenuButton />
                    </Col>
                </Col>
                <Col className='m-0 p-0 col-8'>
                    <Row className='m-0 p-2 mt-4 d-flex justify-content-between align-items-center topFirstRow'>
                        <Col className='m-0 p-0 col-10' >
                            <TopRow setShowSearch={setShowSearch} setValues={setValues} />
                        </Col>
                        <Col className='m-0 p-0'>
                            <Weather city={'India'} />
                            <Col className="m-0 p-2 mt-2 pt-1 notice col-12 "><p>Note : </p>Only General seats are Available!!!
                            </Col>
                        </Col>
                    </Row>
                    <Row className='m-0 p-0 mt-5'>
                        <Col className='m-0 p-0 col-2 followBanner d-flex justify-content-center align-items-center'>
                            <h4 className='m-0 p-0 fw-bold text-center'>Follow <br />the<br /> Guidelines!</h4>
                        </Col>
                        <Col className='m-0 p-3 guideLine'>
                            <p className='m-0 p-3 text-white'>
                                Here’s a quick guide for booking a train ticket online:<br /><br />

                                <h6 className='m-0 p-0 ps-3 d-inline'>Search and Select:</h6> Enter travel details, choose a train and class (e.g., SL, 3A, 2A).<br />
                                <h6 className='m-0 p-0 ps-3 d-inline'>Check Quota:</h6> Confirm seat availability and waitlist status.<br />
                                <h6 className='m-0 p-0 ps-3 d-inline'>Enter Passenger Info:</h6> Accurately fill in all required details.<br />
                                <h6 className='m-0 p-0 ps-3 d-inline'>Payment:</h6> Review and confirm before making payment.<br />
                                <h6 className='m-0 p-0 ps-3 d-inline'>Download Ticket:</h6> Save or print your e-ticket.<br />
                                <h6 className='m-0 p-0 ps-3 d-inline'>Travel Prepared:</h6> Carry a valid ID and reach the station on time.<br /><br />
                                Always follow cancellation policies if plans change.<br />
                            </p>
                        </Col>
                    </Row>

                </Col>
                <Col className={`m-0 p-0 d-flex flex-shrink-1 justify-content-end col-2`}>
                    <Row className={`m-0 p-2 btn profileSection  d-flex  ${userprofile ? 'hideProfile justify-content-center' : 'showProfile justify-content-between'}`}
                        onMouseEnter={() => { setUserProfile(!userprofile) }}
                        onMouseLeave={() => { setUserProfile(!userprofile) }}>
                        <h6 className={`m-0 p-2 col-6 ${userprofile ? 'hideUserName' : 'showUserName'}`}>userName</h6>
                        <img className={`m-0 p-0  ${userprofile ? 'flex-fill  col-6 ' : 'col-3'}`} width={'35px'} height={'40px'} src={profile} alt={'profile'} />
                    </Row>
                </Col>
            </Row>
            <SearchResult values={values} showSearch={showSearch} setShowSearch={setShowSearch} />
            <BookingSeat />
        </>
    );
}

export default Dashboard;