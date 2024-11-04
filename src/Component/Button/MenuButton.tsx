import { useState } from "react";
import ticket from '../../assests/trainLogo_64.png';
import profile from '../../assests/profile.png';
import train from '../../assests/train.png';
import notification from '../../assests/notification-bell.png';
import settings from '../../assests/settings.png'
import logout from '../../assests/log-out.png';
import { Button, Col, Row } from "react-bootstrap";

const MenuButton = () => {

    const [menu01, setMenu01] = useState(true);
    const [menu02, setMenu02] = useState(true);
    const [menu03, setMenu03] = useState(true);
    const [menu04, setMenu04] = useState(true);
    const [menu05, setMenu05] = useState(true);
    const [menu06, setMenu06] = useState(true);

    const menuList = [
        { imgPath: profile, value: 'User Profile',classHide:'hide1',menu:menu01,setMenu:setMenu01 },
        { imgPath: ticket, value: 'Booked Tickets',classHide:'hide2' ,menu:menu02 ,setMenu:setMenu02},
        { imgPath: train, value: 'View Trains',classHide:'hide3' ,menu:menu03 ,setMenu:setMenu03},
        { imgPath: notification, value: 'Notifications',classHide:'hide4',menu:menu04 ,setMenu:setMenu04 },
        { imgPath: settings, value: 'Settings',classHide:'hide5' ,menu:menu05 ,setMenu:setMenu05 },
        { imgPath: logout, value: 'Logout',classHide:'hide6' ,menu:menu06 ,setMenu:setMenu06}
    ];

    return (
        <>
            {menuList.map((list, index) => (
                <Row className="m-0 p-0 py-3" key={index}>
                    <Button className="btn m-0 p-2 w-auto menuItem "
                       onMouseEnter={() => { list.setMenu(!list.menu)}}
                       onMouseLeave={() => { list.setMenu(!list.menu) }}>

                        <img className={`m-0 p-0 imgMenu ${list.menu?'hideImgMenu':'showImgMenu'} `} src={list.imgPath} width={'28px'} height={'30px'} alt={"Menu Bar"} />

                        <Col 
                            className={`m-0 p-2 ps-4 menuName ${list.menu ? list.classHide : 'show'}`}>
                            {list.value}
                        </Col>
                    </Button>
                </Row>
            ))}
        </>

    );
}

export default MenuButton;