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

    const [waitingListData, setWaitingListData] = useState<waitingListType[]>([]);
    const [waitingList, setWaitingList] = useState<waitingListType>();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const getWaitingList = async () => {
            const waitingListResponse = await axios.get(`http://localhost:8080/api/waitingList`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("response : ", waitingListResponse.data);


            const tempList = waitingListResponse.data;

            console.log("templist : ", tempList);



            setWaitingListData(tempList);

            console.log("waitingListData : ", waitingListData);

            if (waitingListData) {
                const tempWaitingList = waitingListData.find((list: waitingListType) => list?.seat?.seatId === seatId);


                if (tempWaitingList) {

                    console.log("tempWaitingList : ", tempWaitingList);

                    setWaitingList(tempList.find((list: waitingListType) => list?.seat?.seatId === seatId));

                    console.log("waitingList",waitingList);
                }
            }
            if (waitingList?.seatNumber === value && waitingList.user.userName === getUserName()) {
                console.log("valied")

            }
        }

        getWaitingList();

    }, []);

    const getUserName = () => {

        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode<CustomJwtPayload>(token);
            const userName = decodedToken?.sub || decodedToken?.userName || decodedToken?.username || decodedToken?.name;
            console.log(userName);

            return userName;
        }

        return "";
    }



    return (
        <button className={`m-2 p-2 seatButton ${isSeatAvailable ? 'notSelected' : ''}`} disabled={!isSeatAvailable}
            onClick={() => {
                bookSeat(seatId, isSeatAvailable, value);
            }}
        >
            {!isSeatAvailable ? waitingList?.seatNumber === value ? 'In Waiting List' : 'Booked' : value}
            {/* booked or waiting list */}
        </button>
    );
}

export default SeatButton;