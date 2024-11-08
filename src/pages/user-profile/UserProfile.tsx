import '../../css/UserProfile.css';
import { Col, Row } from "react-bootstrap";
import edit from '../../assests/pencil.png';
import previous from '../../assests/previous.png';
import userProfile from '../../assests/profile.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export interface userListType {
    userId: number,
    userName: string,
    address: string,
    phoneNumber: string,
    status: boolean,
    email:string
}

export interface CustomJwtPayload extends JwtPayload {
    userName?: string;
    username?: string;
    name?: string;
}

const UserProfile = () => {

    const [user, setUser] = useState<userListType>();
    const [username, setUsername] = useState<string>();
    const [userList, setUserList] = useState<userListType[]>([]);
    const navigate = useNavigate();
    const [backButton, setBackButton] = useState(false);



    useEffect(() => {
        const getUserDetails = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const userListResponse = await axios.get('http://localhost:8080/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserList(userListResponse.data);

                    const decodedToken = jwtDecode<CustomJwtPayload>(token);
                    const userName = decodedToken?.sub || decodedToken?.userName || decodedToken?.username || decodedToken?.name;
                    setUsername(userName || "");

                } catch (error) {
                    console.error("Error fetching user details or decoding token:", error);
                }
            }
        };

        getUserDetails();
    }, []);

    useEffect(() => {
        const getCurrentUser = async () => {
            const token = localStorage.getItem("token");
            if (token && username) {
                const currentUser = userList.find((user) => user.userName.trim().toLowerCase() === username.trim().toLowerCase());

                if (currentUser) {
                    const currentUserResponse = await axios.get(`http://localhost:8080/user/${currentUser.userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(currentUserResponse.data);
                }
            }
        };

        getCurrentUser();
    }, [username, userList]);


    const details_List = [
        { name: "Name ", value: user?.userName },
        { name: "Address ", value: user?.address },
        { name: "Mail ", value: user?.email },
        { name: "Phone No ", value: user?.phoneNumber },
        { name: "Status", value: user?.status?"Active":"InActive" }
    ]

    if (!user) return <div>Loading...</div>;


    return (
        <Row className="m-0 p-0 vh-100 userProfileRow d-flex justify-content-between">
            <Col className='m-0 p-0 col-1'>
                <button className={`m-0 p-2 userProfileBackButton `}
                    onMouseEnter={() => { setBackButton(!backButton) }}
                    onMouseLeave={() => { setBackButton(!backButton) }}
                    onClick={() => {
                        navigate('/dashboard');
                    }}
                >
                    <img className={`${backButton ? 'focusButton' : 'normalButton'}`} src={previous} alt={'back'} width={'40px'} height={"40px"} />
                </button>
            </Col>
            <Col className="m-0 p-3 profileColumn my-5 col-8">
                <Row className="m-0 p-3 d-flex justify-content-between align-items-center profileRow">
                    <Col className='m-0 p-0 '>
                        <Row className='m-0 p-0 d-flex justify-content-center align-items-center'>
                            <img className="m-0 p-0 col-1" src={userProfile} width={"90px"} height={"90px"} alt={"Profile"} />
                            <Col className='m-0 p-0 ps-4 pt-4'>
                                <h5>{user.userName}</h5>
                                <h6>{user.email}</h6>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='m-0 p-0 col-1 text-end'>
                        <button className='m-0 p-0 text-primary editButton' onClick={() => {
                            //Open Editor
                        }}>
                            <img className='m-0 p-0 me-2' src={edit} alt={'Edit'} width={'14px'} height={'14px'} />
                            Edit
                        </button>
                    </Col>
                </Row>
                <Row className='m-0 mt-3 p-3 profileRow' >
                    <Col className='m-0 p-0'>
                        {
                            details_List.map((list, index) => (
                                <Row className='m-0 p-0 pt-4' key={index}>
                                    <h6 className='m-0 p-0 text-danger fw-bold col-1 text-end' style={{ width: '120px' }}>{list.name} : </h6>
                                    <h6 className={`m-0 p-0 ps-4 col-6  ${list.value==="Active" && list.name==="Status" ? " statusClGreen": list.value==="Active" && list.name==="Status"?"statusClRed":""}`}>{list.value}</h6>
                                </Row>
                            ))
                        }
                    </Col>
                </Row>
            </Col>
            <Col className='m-0 p-0 col-1'></Col>

        </Row>
    );
}

export default UserProfile;