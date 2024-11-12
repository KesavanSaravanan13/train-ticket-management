import { useEffect, useState } from "react";
import { SeatType } from "../../pages/booking/SlBooking";
import axios from "axios";
import { Row } from "react-bootstrap";

type SeatButtonProps = {
    viewSeat: boolean;
    setViewSeat: (value: boolean) => void;
    isSeatAvailable: Boolean;
    valueParameter: String;
    seat: SeatType[];
    seatId: BigInt | undefined;
    setSeatId: (value: BigInt) => void;
    setPayload: (value: SeatType) => void;
    setValue: (value: String | undefined) => void;
    compartment: String | undefined;

};

const SeatButton: React.FC<SeatButtonProps> = ({ setValue, viewSeat, setViewSeat, isSeatAvailable, valueParameter, seat, seatId, setSeatId, setPayload, compartment }) => {


    const [afterPayload, setAfterPayload] = useState<Boolean>(false);

    useEffect(() => {
        setValue(valueParameter);
    }, [valueParameter]);


    const bookSeat = async (seatId: BigInt | undefined, isSeatAvailable: Boolean | undefined, value: String | undefined) => {
        setValue(value);
        const subValue = value?.substring(5,).split(" ");

        seat.forEach(list => {
            if (subValue) {
                switch (subValue[0]) {
                    case "One":
                        if (subValue[1] === "A") {
                            if (list.seatId === seatId) {
                                list.seatOneA = !isSeatAvailable;
                                setSeatId(list.seatId);
                                setViewSeat(!viewSeat);
                            }
                        } else {
                            if (list.seatId === seatId) {
                                list.seatOneB = !isSeatAvailable;
                                setSeatId(list.seatId);
                                setViewSeat(!viewSeat);
                            }
                        }
                        break;

                    case "Two":
                        if (subValue[1] === "A") {
                            if (list.seatId === seatId) {
                                list.seatTwoA = !isSeatAvailable;
                                setSeatId(list.seatId);
                                setViewSeat(!viewSeat);
                            }
                        } else {
                            if (list.seatId === seatId) {
                                list.seatTwoB = !isSeatAvailable;
                                setSeatId(list.seatId);
                                setViewSeat(!viewSeat);
                            }
                        }
                        break;

                    case "Three":
                        if (subValue[1] === "A") {
                            if (list.seatId === seatId) {
                                list.seatThreeA = !isSeatAvailable;
                                setSeatId(list.seatId);
                                setViewSeat(!viewSeat);
                            }
                        } else {
                            if (list.seatId === seatId) {
                                list.seatThreeB = !isSeatAvailable;
                                setSeatId(list.seatId);
                                setViewSeat(!viewSeat);
                            }
                        }
                        break;

                    case "Four":
                        if (subValue[1] === "A") {
                            if (list.seatId === seatId) {
                                list.seatFourA = !isSeatAvailable;
                                setSeatId(list.seatId);
                                setViewSeat(!viewSeat);
                            }
                        } else {
                            if (list.seatId === seatId) {
                                list.seatFourB = !isSeatAvailable;
                                setSeatId(list.seatId);
                                setViewSeat(!viewSeat);
                            }
                        }
                        break;

                    case "Five":
                        if (list.seatId === seatId) {
                            list.seatFiveA = !isSeatAvailable;
                            setSeatId(list.seatId);
                            setViewSeat(!viewSeat);
                        }
                        break;

                    case "Six":
                        if (list.seatId === seatId) {
                            list.seatSixA = !isSeatAvailable;
                            setSeatId(list.seatId);
                            setViewSeat(!viewSeat);
                        }
                        break;
                }
            }
        });

        const seatTemp = seat.find(list => list.seatId === seatId);

        if (seatTemp) {
            setPayload(seatTemp);
            setAfterPayload(!afterPayload);
        }

    }

    return (
        <>
            {compartment === 'sl' ?

                <button className={`m-1 p-2 seatButtonSl ${!isSeatAvailable && !afterPayload ? '' : 'notSelected'}`} disabled={!isSeatAvailable && !afterPayload}
                    onClick={() => {
                        bookSeat(seatId, isSeatAvailable, valueParameter);
                        setViewSeat(!viewSeat);
                    }}
                >
                    {!isSeatAvailable && !afterPayload ? 'Booked' : valueParameter}
                </button>

                :

                <Row className={`m-0 p-2 pb-4   ${compartment==='side'?'sideRow':'insideRow'}`}>
                    <button className={`m-1 p-3 col-12 twoSeatButton ${!isSeatAvailable && !afterPayload ? '' : 'notSelected'}`} disabled={!isSeatAvailable && !afterPayload}
                        onClick={() => {
                            bookSeat(seatId, isSeatAvailable, valueParameter);
                            setViewSeat(!viewSeat);
                        }}
                    >
                        {!isSeatAvailable && !afterPayload ? 'Booked' : valueParameter}
                    </button>
                </Row>
            }
        </>
    );

}

export default SeatButton;