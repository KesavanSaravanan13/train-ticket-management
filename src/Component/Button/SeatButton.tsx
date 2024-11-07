


type SeatButtonProps = {
    isSeatAvailable: Boolean;
    value: String;
    seatId:BigInt;
    bookSeat:  (seatId: BigInt, isSeatAvailable: Boolean, value: String)  => void;

};

const SeatButton: React.FC<SeatButtonProps> = ({ isSeatAvailable, value,seatId, bookSeat }) => {
    return (
        <button className={`m-2 p-2 seatButton ${isSeatAvailable ? 'notSelected' : ''}`} disabled={!isSeatAvailable}
            onClick={() => {
                bookSeat(seatId,isSeatAvailable,value);
            }}
        >
            {!isSeatAvailable ? 'Booked' : value}
        </button>
    );
}

export default SeatButton;