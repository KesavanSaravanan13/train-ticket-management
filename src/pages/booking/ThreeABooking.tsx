import axios from "axios";
import '../../css/SlBooking.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { trainType } from "../dashboard/Dashboard";
import { Col, Row } from "react-bootstrap";
import ViewSeat from "./ViewSeat";
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

export interface SeatType {
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
    valueParameter: String;
}

const ThreeABooking = () => {

    const [viewSeat, setViewSeat] = useState<boolean>(false);
    const [seatId, setSeatId] = useState<BigInt>();

    const [value, setValue] = useState<String>();
    const { trainNumber } = useParams<string>();
    const [seat, setSeat] = useState<SeatType[]>([]);

    const [payload, setPayload] = useState<SeatType>();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("Token is missing");
            return;
        }

        const getTrainDetails = async () => {

            const slResponse = await axios.get(`http://localhost:8080/api/3a-compartments`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const SlSeat: threeAType[] = slResponse.data;
            const SlSeatTemp = SlSeat.find(list => list.train.trainNumber === Number(trainNumber));

            console.log("sl temp : ",SlSeatTemp);
            

            const seatResponse = await axios.get(`http://localhost:8080/api/Seat`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const tempSeat: SeatType[] = seatResponse.data;

            console.log(tempSeat);

            const filteredSeats = tempSeat.filter(list => list.threeACompartment?.threeACompartmentId === SlSeatTemp?.threeACompartmentId);

            console.log("filter : ",filteredSeats);


            if (filteredSeats.length > 0) {
                setSeat(filteredSeats);
            }
            console.log(seat);

        }
        getTrainDetails();

    }, []);

    return (
        <Row className="m-0 p-0 vh-100 d-flex justify-content-center align-items-center seatBooking position-relative">
            <Col className="m-0 p-0 col-4 trainCol ">
                {
                    seat.filter(seatList => seatList.threeACompartment !== null).map((seatList, index) => (
                        <Row className="m-2 p-3 compartment" key={index}>
                            <Col className="m-0 p-0 col-3">
                                <SeatButton viewSeat={viewSeat} setValue={setValue} setViewSeat={setViewSeat} isSeatAvailable={seatList.seatOneB} valueParameter={"seat One B"} seat={seat} seatId={seatList.seatId} setPayload={setPayload} setSeatId={setSeatId} compartment={'side'} />
                            </Col>
                            <Col className="m-0 p-0 col d-flex justify-content-center ">
                                <div className="m-0 p-0 vr h-100"></div>
                            </Col>
                            <Col className="m-0 p-0 col-8 ">
                                <SeatButton viewSeat={viewSeat} setValue={setValue} setViewSeat={setViewSeat} isSeatAvailable={seatList.seatOneA} valueParameter={"seat One A"} seat={seat} seatId={seatList.seatId} setPayload={setPayload} setSeatId={setSeatId} compartment={''} />
                                <SeatButton viewSeat={viewSeat} setValue={setValue} setViewSeat={setViewSeat} isSeatAvailable={seatList.seatTwoA} valueParameter={"seat Two A"} seat={seat} seatId={seatList.seatId} setPayload={setPayload} setSeatId={setSeatId} compartment={''} />

                            </Col>
                        </Row>
                    ))
                }
            </Col>
            <ViewSeat viewSeat={viewSeat} value={value} setViewSeat={setViewSeat} seatId={seatId} payload={payload} trainNumber={trainNumber} />
        </Row>
    )
}

export default ThreeABooking;