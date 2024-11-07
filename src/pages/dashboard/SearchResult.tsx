import { Col, Row } from "react-bootstrap";
import close from '../../assests/close.png';
import fromTrain from '../../assests/train-from.png';
import ToTrain from '../../assests/train-to.png';
import map from '../../assests/map.png';
import { useEffect, useState } from "react";
import axios from "axios";
import { trainType } from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { initialValuesType } from "./TopRow";

interface searchRsultType{
    values:initialValuesType | undefined;
    showSearch:Boolean;
    setShowSearch:(value:boolean)=>void;
}

const SearchResult: React.FC<searchRsultType> = ({values,showSearch,setShowSearch})=>{

    const navigate = useNavigate();

    const [closeButton, setCloseButton] = useState(false);

    const [trains, setTrains] = useState<trainType[]>([]);

    const isAvailable = trains.some(list => list.fromPlace === values?.from && list.toPlace === values?.to);

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

    return (
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
    );
}

export default SearchResult;