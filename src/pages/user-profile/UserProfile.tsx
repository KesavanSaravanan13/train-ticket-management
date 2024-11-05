import '../../css/UserProfile.css';
import { Col, Row } from "react-bootstrap";
import edit from '../../assests/pencil.png';
import previous from '../../assests/previous.png';
import userProfile from '../../assests/profile.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {

    const navigate = useNavigate();
    const[backButton,setBackButton]=useState(false);

    const details_List=[
        {name:"Name "},
        {name:"Address "},
        {name:"Mail "},
        {name:"Phone No "},
        {name:"Status"}
    ]

    return (
        <Row className="m-0 p-0 vh-100 userProfileRow d-flex justify-content-between">
            <Col className='m-0 p-0 col-1'>
                <button className={`m-0 p-2 userProfileBackButton `} 
                onMouseEnter={()=>{setBackButton(!backButton)}}
                onMouseLeave={()=>{setBackButton(!backButton)}}
                onClick={()=>{
                    navigate('/dashboard');
                }}
                >
                    <img className={`${backButton?'focusButton' : 'normalButton'}`} src={previous} alt={'back'} width={'40px'} height={"40px"}/>
                </button>
            </Col>
            <Col className="m-0 p-3 profileColumn my-5 col-8">
                <Row className="m-0 p-3 d-flex justify-content-between align-items-center profileRow">
                    <Col className='m-0 p-0 '>
                        <Row className='m-0 p-0 d-flex justify-content-center align-items-center'>
                            <img className="m-0 p-0 col-2" src={userProfile} width={"90px"} height={"90px"} alt={"Profile"} />
                            <Col className='m-0 p-0 ps-4 pt-4'>
                                <h5>user_name</h5>
                                <h6>e-mail@gmail.com</h6>
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
                        details_List.map((list,index)=>(
                            <Row className='m-0 p-0 pt-4' key={index}>
                                <h6 className='m-0 p-0 text-danger fw-bold col-1 text-end' style={{width:'120px'}}>{list.name} : </h6>
                                <h6 className='m-0 p-0 ps-4 col-6'>hi</h6>
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