import axios from "axios";
import '../../css/SlBooking.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { trainType } from "../dashboard/Dashboard";
import { Col, Row } from "react-bootstrap";

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
    seatOneB: boolean;
    seatTwoB: boolean;
    seatThreeB: boolean;
    slCompartment: slType | null;
    twoACompartment: twoAType | null;
    threeACompartment: threeAType | null;
}



const SlBooking = () => {
    const { trainNumber } = useParams<string>();
    const [train, setTrain] = useState<trainType[]>([]);
    const [trainId, setTrainId] = useState<BigInt>();
    const [SlSeatId, setSlSeatId] = useState<BigInt>();
    const [seat, setSeat] = useState<SeatType[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("Token is missing");
            return;
        }

        const getTrainDetails = async () => {
            const response = await axios.get(`http://localhost:8080/api/trains`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTrain(response.data);
            const temp_train = train.find(list => list.trainNumber === Number(trainNumber));

            setTrainId(temp_train?.trainId);

            const slResponse = await axios.get(`http://localhost:8080/api/sl-compartments`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const SlSeat: slType[] = slResponse.data;
            const SlSeatTemp = SlSeat.filter(list => list.train.trainNumber === Number(trainNumber));

            console.log("result",SlSeatTemp);
            


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
            console.log("seat : ",seat);
            
        }

        getTrainDetails();

    }, []);

    return (
        <Row className="m-0 p-0 vh-100 d-flex justify-content-center align-items-center">
            <Col className="m-0 p-0 col-8 trainCol">
                {
                    seat.filter(seatList => seatList.slCompartment !== null).map((seat, index) => (
                        <h6>{seat.seatOneA ? "hi" : "no-hi"}</h6>
                    ))
                }
            </Col>

        </Row>
    )
}

export default SlBooking;