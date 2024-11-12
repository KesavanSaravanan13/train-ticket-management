import { useEffect, useState } from "react";
import close from '../../assests/close.png';
import fromTrain from '../../assests/train-from.png';
import ToTrain from '../../assests/train-to.png';
import map from '../../assests/map.png';
import { Col, Row } from "react-bootstrap";
import '../../css/SlBooking.css';
import { trainType } from "../dashboard/Dashboard";
import { SeatType } from "./SlBooking";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload, userListType } from "../user-profile/UserProfile";

interface viewSeatTpe {
    viewSeat: boolean;
    setViewSeat: (value: boolean) => void;
    payload: SeatType | undefined;
    seatId: BigInt | undefined;
    trainNumber: string | undefined;
    value: String | undefined;
}

interface TicketDetails {
    ticketNumber: string;
    dateOfBooking: string;
    dateOfTravel: string | null;
    travelTiming: string | null;
    travelFrom: string;
    travelTo: string;
    noOfDaysTravel: number;
    prebookFood: Boolean;
    user: userListType | null;
    status: Boolean;
    seat:SeatType| null;
}



const ViewSeat: React.FC<viewSeatTpe> = ({ viewSeat, seatId, setViewSeat, payload, trainNumber, value }) => {

    const navigate = useNavigate();
    const [train, setTrain] = useState<trainType>();
    const [trainData, setTrainData] = useState<trainType[]>([]);
    const [closeButton, setCloseButton] = useState(false);
    const [preFood, setPreFood] = useState<Boolean>(false);
    const [user, setUser] = useState<userListType>();
    useEffect(() => {
        const getTrain = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/trains`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const tempData = response.data;

            if (tempData.length > 0) {
                setTrainData(tempData);
            }

            const tempTrain = tempData.find((list: trainType) => list.trainNumber === Number(trainNumber));

            if (tempTrain) {
                setTrain(tempTrain);
            }

        }
        getTrain();
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded: CustomJwtPayload = jwtDecode(token);
                const response = await axios.get(`http://localhost:8080/user`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const tempUserList: userListType[] = response.data;
                const tempUser = tempUserList.find(list => (list.userName === decoded.sub || decoded.userName || decoded.username));

                if (tempUser) {
                    setUser(tempUser);
                }
            }
        };

        fetchUser();
    }, []);

    const bookSeat = async () => {

        if (!user) {
            console.error("User is not defined.");
            return;
        }

        const token = localStorage.getItem('token');

        await axios.put(`http://localhost:8080/api/Seat/${seatId}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const responseSeat = await axios.get(`http://localhost:8080/api/Seat/${seatId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const tempSeat = responseSeat.data;

        if (train) {

            const parseTime = (duration: string) => {
                const match = duration.match(/(\d+)h\s*(\d+)m/);
                if (!match) return null;

                const hours = String(match[1]).padStart(2, '0');
                const minutes = String(match[2]).padStart(2, '0');

                return `${hours}:${minutes}`;
            };

            const reachingTime = parseTime(train.reachingTime);

            const temp: TicketDetails = {
                ticketNumber: '1',
                dateOfBooking: new Date().toISOString().split('T')[0],
                dateOfTravel: localStorage.getItem("date"),
                travelTiming: reachingTime,
                travelFrom: train.fromPlace,
                travelTo: train.toPlace,
                noOfDaysTravel: 1,
                prebookFood: preFood,
                user: user,
                status: true,
                seat:tempSeat
            };
            try {
                await axios.post(`http://localhost:8080/api/tickets`, temp, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error("Error creating ticket:", error);
            }

        }
    };

    const handleInputCheck = () => {
        setPreFood(!preFood);
    }


    return (
        <Row className={`m-0 p-0 viewSeat vh-100  ${viewSeat ? 'd-flex justify-content-center align-items-center' : 'd-none'}`}>
            <Col className="m-0 p-3 col-6 seatDetailsBox position-relative">
                <Row className="m-1 p-3 d-flex align-items-center">
                    <h5 className="m-0 p-0 col-3">Train Number : </h5>
                    <h5 className=" m-0 p-0 col-1 fw-bold ">{train?.trainNumber}</h5>
                </Row>
                <Row className="m-1 mt-2 p-3">
                    <Col className='m-0 p-0 pb-4 d-flex justify-content-between col-12'>
                        <Col className='m-0 p-0 col-2'>
                            <img className='m-0 p-0' src={fromTrain} alt={"from"} />
                            <h6 className='m-0 p-0 col text-secondary'>From</h6>
                        </Col>
                        <Col className='m-0 p-0 text-center col-8'>
                            <Row className='m-0 p-0 pt-2 d-flex justify-content-between align-items-center' >
                                <h5 className='m-0 p col'>{train?.fromPlace}</h5>
                                <img className='m-0 p-0 col-2' src={map} alt={"from and to"} width={"40px"} height={"64px"} />
                                <h5 className='m-0 p col '>{train?.toPlace}</h5>
                            </Row>
                        </Col>
                        <Col className='m-0 p-0 col-2 text-end'>
                            <img className='m-0 p-0' src={ToTrain} alt={"to"} />
                            <h6 className='m-0 p-0 col text-secondary'>To</h6>
                        </Col>
                    </Col>
                    <h6 className="m-0 p-0 col-2">Seat Number : </h6>
                    <h6 className="m-0 p-0 ps-1 col text-start">{value}</h6>
                    <h6 className="m-0 p-0 pt-3 col-12">date-of travel : {localStorage.getItem("date")}</h6>
                    <h6 className="m-0 p-0 pt-3 col-4">Do you need food by Pre-Book?</h6>
                    <Col className="m-0 p-0 d-flex justify-content-start">
                        <input type="checkbox" onChange={() => { handleInputCheck() }}></input>
                    </Col>
                </Row>
                <Row className="m-1 mt-4 p-2 d-flex justify-content-between align-items-center" style={{ boxShadow: "none" }}>
                    <h6 className="m-0 p-0 col">Confirm the seat by clicking "<span className="m-0 p-0 text-success confirmText">confirm</span>"</h6>
                    <button className="m-0 p-2 px-3 col-2 confirmButton"
                        onClick={() => {
                            bookSeat();
                            setViewSeat(!viewSeat);
                            navigate('/booked-seats');
                        }}
                    >
                        confirm
                    </button>
                </Row>
            </Col>
            <button className={`m-0 p-2 closeButton col-1`}
                onMouseEnter={() => { setCloseButton(!closeButton) }}
                onMouseLeave={() => { setCloseButton(!closeButton) }}
                onClick={async () => {
                    setViewSeat(!viewSeat);
                }}
            >
                <img className={`${closeButton ? 'focusButton' : 'normalButton'}`} src={close} alt={'back'} width={'40px'} height={"40px"} />
            </button>
        </Row>
    );
}

export default ViewSeat;