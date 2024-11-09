import axios from "axios";
import { useEffect, useState } from "react";
import { SeatType } from "../../pages/booking/SlBooking";
import { CustomJwtPayload, userListType } from "../../pages/user-profile/UserProfile";
import { jwtDecode } from "jwt-decode";

interface waitingListType {
    waitingListId: BigInt;
    seat: SeatType;
    user: userListType;
    seatNumber: String;
}

type SeatButtonProps = {
    isSeatAvailable: Boolean;
    value: String;
    seatId: BigInt;
    bookSeat: (seatId: BigInt, isSeatAvailable: Boolean, value: String) => void;

};

const SeatButton: React.FC<SeatButtonProps> = ({ isSeatAvailable, value, seatId, bookSeat }) => {

    const [filteredWaitingList, setFilteredWaitingList] = useState<waitingListType[]>([]);
    const [userId, setUserId] = useState<BigInt>();

    useEffect(() => {
        const fetchWaitingList = async () => {

            const token = localStorage.getItem("token");
            try {
                const response = await axios.get<waitingListType[]>('http://localhost:8080/api/waitingList', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const waitingListData = response.data;

                const matchingSeats = waitingListData.filter(item => item.seat.seatId === seatId);

                if (matchingSeats.length > 0) {
                    setFilteredWaitingList(matchingSeats);
                }

                if (filteredWaitingList.length > 0) {
                    setUserId(filteredWaitingList.find(item => item.seat.seatId === seatId)?.user.userId);
                }
            } catch (error) {
                console.error('Error fetching waiting list:', error);
            }

        };

        fetchWaitingList();
    }, [seatId,filteredWaitingList]);

    return (
        <button
            className={`m-2 p-3 seatButton ${
                filteredWaitingList.some(list =>
                list.seat.seatId === seatId && list.seatNumber.trim().toLowerCase() === value.trim().toLowerCase() && list.user.userId === userId
            )

                    ? 'Selected' : isSeatAvailable ? 'notSelected' : ''}`}
            disabled={!isSeatAvailable}
            onClick={() => {
                bookSeat(seatId, isSeatAvailable, value);
            }}
        >
            {
                filteredWaitingList.some(list =>
                    list.seat.seatId === seatId && list.seatNumber.trim().toLowerCase() === value.trim().toLowerCase() && list.user.userId === userId
                )
                    ? 'In waiting list'
                    : !isSeatAvailable
                        ? 'Booked'
                        : value

            }
        </button>
    );

}

export default SeatButton;