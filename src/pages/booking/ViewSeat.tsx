import { useEffect, useState } from "react";
import close from '../../assests/close.png';
import fromTrain from '../../assests/train-from.png';
import ToTrain from '../../assests/train-to.png';
import map from '../../assests/map.png';
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import '../../css/SlBooking.css';
import { SeatType } from "./SlBooking";
import { trainType } from "../dashboard/Dashboard";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload, userListType } from "../user-profile/UserProfile";

interface viewSeatTpe {
    viewSeat: boolean;
    setViewSeat: (value: boolean) => void;
    seatId: BigInt | undefined;
    value: String | undefined;
}

const ViewSeat: React.FC<viewSeatTpe> = ({ viewSeat, setViewSeat, seatId, value }) => {

    const [seat, setSeat] = useState<SeatType>();
    const [train, setTrain] = useState<trainType>();
    const [closeButton, setCloseButton] = useState(false);


    const [user, setUser] = useState<userListType>();
    const [username, setUsername] = useState<string>();
    const [userList, setUserList] = useState<userListType[]>([]);


    useEffect(() => {
        const getSeat = async () => {
            const token = localStorage.getItem('token');

            try {
                const responseSeat = await axios.get(`http://localhost:8080/api/Seat/${seatId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const seatTemp = responseSeat.data;
                setSeat(seatTemp);

                if (seatTemp?.slCompartment?.train?.trainId) {
                    const responseTrain = await axios.get(`http://localhost:8080/api/trains/${seatTemp.slCompartment.train.trainId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const trainTemp = responseTrain.data;
                    setTrain(trainTemp);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getSeat();
    }, [seatId]);


    const waitListSeat = async () => {

        const token = localStorage.getItem('token');
        if (!token) return;
        const userListResponse = await axios.get('http://localhost:8080/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUserList(userListResponse.data);

        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        const userName: string | undefined = decodedToken?.sub || decodedToken?.userName || decodedToken?.username || decodedToken?.name;
        setUsername(userName);

        const currentUser = userListResponse.data.find((user: userListType) => user.userName.trim().toLowerCase() === userName?.trim().toLowerCase());

        if (currentUser?.userId) {
            const currentUserResponse = await axios.get(`http://localhost:8080/user/${currentUser.userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(currentUserResponse.data);

            const tempPlayload = {
                seat: seat,
                seatNumber: value,
                user: currentUserResponse.data,
            }

            const response = await axios.post(`http://localhost:8080/api/waitingList`, tempPlayload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        setViewSeat(!viewSeat)
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
                    <h5 className="m-0 p-0 col-3">Seat Number : </h5>
                    <h5 className="m-0 p-0 col-3">{value}</h5>

                </Row>
                <Row className="m-1 mt-4 p-2 d-flex justify-content-between align-items-center" style={{ boxShadow: "none" }}>
                    <h6 className="m-0 p-0 col">Confirm the seat by clicking "<span className="m-0 p-0 text-success confirmText">confirm</span>"</h6>
                    <button className="m-0 p-2 px-3 col-2 confirmButton"
                        onClick={() => {
                            waitListSeat();
                        }}
                    >
                        confirm
                    </button>
                </Row>
            </Col>
            <button className={`m-0 p-2 closeButton col-1`}
                onMouseEnter={() => { setCloseButton(!closeButton) }}
                onMouseLeave={() => { setCloseButton(!closeButton) }}
                onClick={() => {
                    setViewSeat(!viewSeat);
                }}
            >
                <img className={`${closeButton ? 'focusButton' : 'normalButton'}`} src={close} alt={'back'} width={'40px'} height={"40px"} />
            </button>
        </Row>
    );
}

export default ViewSeat;