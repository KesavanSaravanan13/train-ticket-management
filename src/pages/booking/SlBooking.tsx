import axios from "axios";
import '../../css/SlBooking.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { trainType } from "../dashboard/Dashboard";
import { Col, Row } from "react-bootstrap";
import SeatButton from "../../Component/Button/SeatButton";

interface slType {
    slCompartmentId: BigInt;
    train: trainType;
}

interface twoAType {
    twoACompartmentId: BigInt;
    train: trainType;
}
interface threeAType {
    threeACompartmentId: BigInt;
    train: trainType;
}

interface SeatType {
    seatId: BigInt;
    seatOneA: boolean;
    seatTwoA: boolean;
    seatThreeA: boolean;
    seatFourA: boolean;
    seatFiveA: boolean;
    seatSixA: boolean;
    seatOneB: boolean;
    seatTwoB: boolean;
    seatThreeB: boolean;
    seatFourB: boolean;
    slCompartment: slType | null;
    twoACompartment: twoAType | null;
    threeACompartment: threeAType | null;
}

export interface bookSeatType {
    seatId: BigInt;
    isSeatAvailable: Boolean;
    value: String;
}


const SlBooking = () => {
    const { trainNumber } = useParams<string>();
    const [seat, setSeat] = useState<SeatType[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("Token is missing");
            return;
        }

        const getTrainDetails = async () => {

            const slResponse = await axios.get(`http://localhost:8080/api/sl-compartments`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const SlSeat: slType[] = slResponse.data;
            const SlSeatTemp = SlSeat.filter(list => list.train.trainNumber === Number(trainNumber));



            const seatResponse = await axios.get(`http://localhost:8080/api/Seat`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            const tempSeat: SeatType[] = seatResponse.data;
            const filteredSeats = tempSeat.filter(list =>
                SlSeatTemp.some(item => item.slCompartmentId === list.slCompartment?.slCompartmentId)
            );

            setSeat(filteredSeats);
        }

        getTrainDetails();

    }, []);

    const bookSeat = async (seatId: BigInt, isSeatAvailable: Boolean, value: String) => {

        const token = localStorage.getItem('token');

        const subValue = value.substring(5,).split(" ");

        seat.forEach(list => {
            switch (subValue[0]) {
                case "One":
                    if (subValue[1] === "A") {
                        if (list.seatId === seatId) {
                            list.seatOneA = !isSeatAvailable;
                        }
                    } else {
                        if (list.seatId === seatId) {
                            list.seatOneB = !isSeatAvailable;
                        }
                    }
                    break;

                case "Two":
                    if (subValue[1] === "A") {
                        if (list.seatId === seatId) {
                            list.seatTwoA = !isSeatAvailable;
                        }
                    } else {
                        if (list.seatId === seatId) {
                            list.seatTwoB = !isSeatAvailable;
                        }
                    }
                    break;

                case "Three":
                    if (subValue[1] === "A") {
                        if (list.seatId === seatId) {
                            list.seatThreeA = !isSeatAvailable;
                        }
                    } else {
                        if (list.seatId === seatId) {
                            list.seatThreeB = !isSeatAvailable;
                        }
                    }
                    break;

                case "Four":
                    if (subValue[1] === "A") {
                        if (list.seatId === seatId) {
                            list.seatFourA = !isSeatAvailable;
                        }
                    } else {
                        if (list.seatId === seatId) {
                            list.seatFourB = !isSeatAvailable;
                        }
                    }
                    break;

                case "Five":
                    if (list.seatId === seatId) {
                        list.seatFiveA = !isSeatAvailable;
                    }
                    break;

                case "Six":
                    if (list.seatId === seatId) {
                        list.seatSixA = !isSeatAvailable;
                    }
                    break;
            }
        });

        const seatTemp = seat.find(list=>list.seatId===seatId);

        await axios.put(`http://localhost:8080/api/Seat/${seatId}`, seatTemp, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })


    }

    return (
        <Row className="m-0 p-0 vh-100 d-flex justify-content-center align-items-center">
            <Col className="m-0 p-0 col-4 trainCol">
                {
                    seat.filter(seatList => seatList.slCompartment !== null).map((seatList, index) => (
                        <>
                            <Row className="m-2 p-3 compartment">
                                <Col className="m-0 p-0 col-4">
                                    <SeatButton isSeatAvailable={seatList.seatOneB} value={"seat One B"} seatId={seatList.seatId} bookSeat={bookSeat} />
                                    <SeatButton isSeatAvailable={seatList.seatTwoB} value={"seat Two B"} seatId={seatList.seatId} bookSeat={bookSeat} />
                                    <SeatButton isSeatAvailable={seatList.seatThreeB} value={"seat Three B"} seatId={seatList.seatId} bookSeat={bookSeat} />
                                    <SeatButton isSeatAvailable={seatList.seatFourB} value={"seat Four B"} seatId={seatList.seatId} bookSeat={bookSeat} />
                                </Col>
                                <Col className="m-0 p-0 col d-flex justify-content-center ">
                                    <div className="m-0 p-0 vr h-100"></div>
                                </Col>
                                <Col className="m-0 p-0 col-6">
                                    <SeatButton isSeatAvailable={seatList.seatOneA} value={"seat One A"} seatId={seatList.seatId} bookSeat={bookSeat} />
                                    <SeatButton isSeatAvailable={seatList.seatTwoA} value={"seat Two A"} seatId={seatList.seatId} bookSeat={bookSeat} />
                                    <SeatButton isSeatAvailable={seatList.seatThreeA} value={"seat Three A"} seatId={seatList.seatId} bookSeat={bookSeat} />
                                    <SeatButton isSeatAvailable={seatList.seatFourA} value={"seat Four A"} seatId={seatList.seatId} bookSeat={bookSeat} />
                                    <SeatButton isSeatAvailable={seatList.seatFiveA} value={"seat Five A"} seatId={seatList.seatId} bookSeat={bookSeat} />
                                    <SeatButton isSeatAvailable={seatList.seatSixA} value={"seat Six A"} seatId={seatList.seatId} bookSeat={bookSeat} />
                                </Col>
                            </Row>
                        </>
                    ))
                }
            </Col>

        </Row>
    )
}

export default SlBooking;