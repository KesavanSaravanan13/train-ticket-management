import '../../css/Dashboard.css';
import menu_bar from '../../assests/menu_bar.png';
import { Button, Col, Row } from "react-bootstrap";
import MenuButton from "../../Component/Button/MenuButton";
import profile from '../../assests/user.png';
import { useState } from 'react';
import TopRow from './TopRow';
import Weather from '../../utils/API/Weather';


// type FormValues = {
//     from: String,
//     to: String,
//     city: String
// }

const Dashboard = () => {
    const [menu, setMenu] = useState(true);
    const [userprofile, setUserProfile] = useState(true);
    const [menuButton, setMenuButton] = useState(true);

    return (
        <Row className="m-0 p-0 vh-100 dashboard-container">
            <Col className="m-0 p-0 col-2">
                <Button className={`btn m-0 p-1 menuButton ${menuButton ? 'menuNormal' : 'menuFocus'}`}
                    onMouseEnter={() => { setMenuButton(!menuButton) }}
                    onMouseLeave={() => { setMenuButton(!menuButton) }}
                    onClick={() => {
                        setMenu(!menu);
                    }}>
                    <img className="m-1 p-0" src={menu_bar} width={'28px'} height={'28px'} alt={"Menu Bar"} />
                </Button>
                <Col className={`m-0 p-0 col-2 ${menu ? 'menuHidden' : 'menu'}`}>
                    <MenuButton />
                </Col>
            </Col>
            <Col className='m-0 p-0 col-8'>
                <Row className='m-0 p-4 mt-4 d-flex justify-content-between align-items-center topFirstRow'>
                    <Col className='m-0 p-0 col-9'>
                        <TopRow />
                    </Col>
                    <Weather city={'India'} />
                </Row>
                <Row className='m-0 p-0'>

                </Row>

            </Col>
            <Col className={`m-0 p-0 d-flex flex-shrink-1 justify-content-end col-2`}>
                <Row className={`m-0 p-2 btn profileSection  d-flex  ${userprofile ? 'hideProfile justify-content-center' : 'showProfile justify-content-between'}`}
                    onMouseEnter={() => { setUserProfile(!userprofile) }}
                    onMouseLeave={() => { setUserProfile(!userprofile) }}>
                    <h6 className={`m-0 p-2 col-6 ${userprofile ? 'hideUserName' : 'showUserName'}`}>userName</h6>
                    <img className={`m-0 p-0  ${userprofile ? 'flex-fill  col-6 ' : 'col-3'}`} width={'35px'} height={'40px'} src={profile} alt={'profile'} />
                </Row>
            </Col>
        </Row>
    );
}

export default Dashboard;