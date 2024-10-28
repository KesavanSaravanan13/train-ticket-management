import { useState } from "react";
import menu_bar from '../../assests/menu-bar.png';
import ticket from '../../assests/trainLogo_64.png';
import profile from '../../assests/profile.png';
import { Button, Col, Row } from "react-bootstrap";

const MenuButton = () => {
    const [menuButton, setMenuButton] = useState(true);

    const menuList = [
        { imgPath: profile, value: 'User Profile' },
        { imgPath: ticket, value: 'Booked Tickets' },
        { imgPath: menu_bar, value: 'View Trains' },
        { imgPath: menu_bar, value: 'Notifications' },
        { imgPath: menu_bar, value: 'Settings' },
        { imgPath: menu_bar, value: 'Logout' }
    ];

    return (
        <>
            {menuList.map((list, index) => (
                <Row className="m-0 p-0 py-3" key={index}>
                    <Button className="btn m-0 p-2 w-auto menuItem "
                        onMouseEnter={() => { setMenuButton(!menuButton) }}
                        onMouseLeave={() => { setMenuButton(!menuButton) }}>

                        <img className="m-0 p-0 imgMenu" src={list.imgPath} width={'32px'} height={'32px'} alt={"Menu Bar"} />

                        <Col onMouseEnter={() => { setMenuButton(false) }}
                            onMouseLeave={() => { setMenuButton(true) }}
                            className={`m-0 p-2 ps-3 menuName text-dark ${menuButton ? 'hide' : 'show'}`}>
                            {list.value}
                        </Col>
                    </Button>
                </Row>
            ))}
        </>

    );
}

export default MenuButton;