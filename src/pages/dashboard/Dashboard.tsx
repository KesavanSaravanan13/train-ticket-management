import '../../css/Dashboard.css';
import menu_bar from '../../assests/menu_bar.png';
import { Button, Col, Row } from "react-bootstrap";
import MenuButton from "../../Component/Button/MenuButton";
import profile from '../../assests/user.png';
import close from '../../assests/close.png';
import fromTrain from '../../assests/train-from.png';
import ToTrain from '../../assests/train-to.png';
import map from '../../assests/map.png';
import { useEffect, useState } from 'react';
import TopRow, { initialValuesType } from './TopRow';
import Weather from '../../utils/API/Weather';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { time } from 'console';


// type FormValues = {
//     from: String,
//     to: String,
//     city: String
// }

export interface trainType {
    trainId:BigInt,
    trainNumber: number;
    fromPlace: string;
    toPlace: string;
    arriveAt: string;
    reachOn: string;
    reachingTime: string;
}

const Dashboard = () => {

    const navigate = useNavigate();

    const [menu, setMenu] = useState(true);
    const [userprofile, setUserProfile] = useState(true);
    const [menuButton, setMenuButton] = useState(true);

    const [closeButton, setCloseButton] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const [values, setValues] = useState<initialValuesType>();

    const [trains, setTrains] = useState<trainType[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const getTrainDetails = async () => {
            const response = await axios.get(`http://localhost:8080/api/trains`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTrains(response.data);

        }

        getTrainDetails();
    }, [values]);

    const isAvailable = trains.some(list => list.fromPlace === values?.from && list.toPlace === values?.to);


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
            <Row className={`m-0 p-3 vh-100 vw-100 searchResultRow ${showSearch ? 'd-flex justify-content-center align-items-center' : 'd-none'}`}>
                <Col className='m-0 p-0 col-1'>
                </Col>
                <Col className='m-0 p-0 col-8 h-100 d-flex align-items-top justify-content-center flex-wrap'>
                    <Row className='m-0 p-3 searchResult'>
                        <Col className='m-0 p-0 d-flex justify-content-between'>
                            <Col className='m-0 p-0 col-2'>
                                <img className='m-0 p-0' src={fromTrain} alt={"from"} />
                                <h6 className='m-0 p-0 col'>From</h6>
                            </Col>
                            <Col className='m-0 p-0 text-center col-5'>
                                <Row className='m-0 p-0 pt-2 d-flex justify-content-between align-items-center' >
                                    <h5 className='m-0 p col'>{values?.from}</h5>
                                    <img className='m-0 p-0 col-2' src={map} alt={"from and to"} width={"40px"} height={"64px"} />
                                    <h5 className='m-0 p col'>{values?.to}</h5>
                                </Row>
                            </Col>
                            <Col className='m-0 p-0 col-2 text-end'>
                                <img className='m-0 p-0' src={ToTrain} alt={"to"} />
                                <h6 className='m-0 p-0 col'>To</h6>
                            </Col>
                        </Col>
                    </Row>
                    {
                        isAvailable ? <></> 
                        : 
                        <Row className='m-0 p-3 searchResult'>
                            <h6 className='text-danger'>No result found for  " FROM "  and  " TO "</h6>
                            <h6>Other results from FROM : </h6>
                        </Row>
                    }
                    <Row className='m-0 p-2  resultTrain'>
                
                        {
                            trains.filter(list => (list.fromPlace === values?.from)).map((trainlist, index) => (
                                <Col className='m-0 mt-3 p-3 col-12 keyTrain' key={index}>
                                    <Row className='m-0 p-0 d-flex align-items-center'>
                                        <div className='m-0 p-0 px-1 text-secondary tNum'>Train Number : </div>
                                        <div className='m-0 p-0 p-1 fw-bold tNum'>{trainlist.trainNumber}</div>
                                    </Row>
                                    <Row className='m-0 p-0'>
                                        <Col className='m-0 p-0 col-2'>
                                            <div className='m-0 p-0 px-1 fs-5 fw-bold'>{trainlist.arriveAt.substring(0, 5)} {parseInt(trainlist.arriveAt.substring(0, 2)) < 12 ? " AM" : " PM"}</div>
                                            <div className='m-0 p-0 px-1 text-success fw-bold tNum'>{trainlist.fromPlace}</div>
                                        </Col>
                                        <Col className='m-0 p-0'>
                                            <div className='m-0 p-0 text-center'>{trainlist.reachingTime}<hr className='m-0 p-0' /></div>
                                        </Col>
                                        <Col className='m-0 p-0 col-2 text-end'>
                                            <div className='m-0 p-0 px-1 fs-5 fw-bold'>{trainlist.reachOn.substring(0, 5)} {parseInt(trainlist.reachOn.substring(0, 2)) < 12 ? " AM" : " PM"}</div>
                                            <div className='m-0 p-0 px-1 text-success fw-bold'>{trainlist.toPlace}</div>
                                        </Col>
                                    </Row>
                                    <Row className='m-0 p-0 d-flex justify-content-between'>
                                        <button className='m-1 p-0 col-3 btnTicket'
                                            onClick={() => {
                                                navigate(`/sl-booking/${trainlist.trainNumber}`);
                                            }}
                                        >
                                            <Row className='m-0 p-2 px-4 slTop d-flex justify-content-between'>
                                                <Col className='m-0 p-0 px-2 col-6 fw-bold text-start'>SL</Col>
                                                <Col className='m-0 p-0 px-2 col-6 fw-bold text-end'>Rs.350</Col>
                                            </Row>
                                            <Row className='m-0 p-2 px-4 slBottom'>
                                                <Col className='m-0 p-3 py-4 text-center px-5'>GNWL</Col>
                                            </Row>
                                        </button>
                                        <button className='m-1 p-0 col-3 btnTicket'
                                            onClick={() => {
                                                navigate(`/two-tier-booking/${trainlist.trainNumber}`);
                                            }}
                                        >
                                            <Row className='m-0 p-2 px-4 slTop d-flex justify-content-between'>
                                                <Col className='m-0 p-0 px-2 fw-bold col-6 text-start'>2A</Col>
                                                <Col className='m-0 p-0 px-2 fw-bold col-6 text-end'>Rs.1250</Col>
                                            </Row>
                                            <Row className='m-0 p-2 px-4  slBottom'>
                                                <Col className='m-0 p-3 py-4 text-center px-5'>GNWL</Col>
                                            </Row>
                                        </button>
                                        <button className='m-1 p-0 col-3 btnTicket'
                                            onClick={() => {
                                                navigate(`/three-tier-booking/${trainlist.trainNumber}`);
                                            }}
                                        >
                                            <Row className='m-0 p-2 px-4 slTop d-flex justify-content-between'>
                                                <Col className='m-0 p-0 px-2 fw-bold col-6 text-start'>3A</Col>
                                                <Col className='m-0 p-0 px-2 fw-bold col-6 text-end'>Rs.2150</Col>
                                            </Row>
                                            <Row className='m-0 p-2 px-4 slBottom'>
                                                <Col className='m-0 p-3 py-4 text-center px-5'>GNWL</Col>
                                            </Row>
                                        </button>
                                    </Row>
                                </Col>
                            ))
                        }

                    </Row>
                </Col>
                <Col className='m-0 p-0 col-2 d-flex justify-content-center'>
                    <button className={`m-0 p-2 closeButton`}
                        onMouseEnter={() => { setCloseButton(!closeButton) }}
                        onMouseLeave={() => { setCloseButton(!closeButton) }}
                        onClick={() => {
                            setShowSearch(!showSearch);
                        }}
                    >
                        <img className={`${closeButton ? 'focusButton' : 'normalButton'}`} src={close} alt={'back'} width={'40px'} height={"40px"} />
                    </button>
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;