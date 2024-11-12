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

const SlBooking = () => {

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

    }, [viewSeat]);

    return (
        <Row className="m-0 p-0 vh-100 d-flex justify-content-center align-items-center seatBooking position-relative">
            <Col className="m-0 p-0 col-4 trainCol">
                {
                    seat.filter(seatList => seatList.slCompartment !== null).map((seatList, index) => (
                        <Row className="m-2 p-3 compartment" key={index}>
                            <Col className="m-0 p-0 col-4">
                                <SeatButton compartment={'sl'} viewSeat={viewSeat} setValue={setValue} setViewSeat={setViewSeat} isSeatAvailable={seatList.seatOneB} valueParameter={"seat One B"} seat={seat} seatId={seatList.seatId} setPayload={setPayload} setSeatId={setSeatId} />
                                <SeatButton compartment={'sl'} viewSeat={viewSeat} setValue={setValue} setViewSeat={setViewSeat} isSeatAvailable={seatList.seatTwoB} valueParameter={"seat Two B"} seat={seat} seatId={seatList.seatId} setPayload={setPayload} setSeatId={setSeatId} />
                                <SeatButton compartment={'sl'} viewSeat={viewSeat} setValue={setValue} setViewSeat={setViewSeat} isSeatAvailable={seatList.seatThreeB} valueParameter={"seat Three B"} seat={seat} seatId={seatList.seatId} setPayload={setPayload} setSeatId={setSeatId} />
                                <SeatButton compartment={'sl'} viewSeat={viewSeat} setValue={setValue} setViewSeat={setViewSeat} isSeatAvailable={seatList.seatFourB} valueParameter={"seat Four B"} seat={seat} seatId={seatList.seatId} setPayload={setPayload} setSeatId={setSeatId} />
                            </Col>
                            <Col className="m-0 p-0 col d-flex justify-content-center ">
                                <div className="m-0 p-0 vr h-100"></div>
                            </Col>
                            <Col className="m-0 p-0 col-6">
                                <SeatButton compartment={'sl'} viewSeat={viewSeat} setValue={setValue} setViewSeat={setViewSeat} isSeatAvailable={seatList.seatOneA} valueParameter={"seat One A"} seat={seat} seatId={seatList.seatId} setPayload={setPayload} setSeatId={setSeatId} />
                                <SeatButton compartment={'sl'} viewSeat={viewSeat} setValue={setValue} setViewSeat={setViewSeat} isSeatAvailable={seatList.seatTwoA} valueParameter={"seat Two A"} seat={seat} seatId={seatList.seatId} setPayload={setPayload} setSeatId={setSeatId} />
                                <SeatButton compartment={'sl'} viewSeat={viewSeat} setValue={setValue} setViewSeat={setViewSeat} isSeatAvailable={seatList.seatThreeA} valueParameter={"seat Three A"} seat={seat} seatId={seatList.seatId} setPayload={setPayload} setSeatId={setSeatId} />
                                <SeatButton compartment={'sl'} viewSeat={viewSeat} setValue={setValue} setViewSeat={setViewSeat} isSeatAvailable={seatList.seatFourA} valueParameter={"seat Four A"} seat={seat} seatId={seatList.seatId} setPayload={setPayload} setSeatId={setSeatId} />
                                <SeatButton compartment={'sl'} viewSeat={viewSeat} setValue={setValue} setViewSeat={setViewSeat} isSeatAvailable={seatList.seatFiveA} valueParameter={"seat Five A"} seat={seat} seatId={seatList.seatId} setPayload={setPayload} setSeatId={setSeatId} />
                                <SeatButton compartment={'sl'} viewSeat={viewSeat} setValue={setValue} setViewSeat={setViewSeat} isSeatAvailable={seatList.seatSixA} valueParameter={"seat Six A"} seat={seat} seatId={seatList.seatId} setPayload={setPayload} setSeatId={setSeatId} />
                            </Col>
                        </Row>
                    ))
                }
            </Col>
            <ViewSeat viewSeat={viewSeat} value={value} setViewSeat={setViewSeat} seatId={seatId} payload={payload} trainNumber={trainNumber} />
        </Row>
    )
}

export default SlBooking;