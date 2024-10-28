import '../../css/Dashboard.css';
import menu_bar from '../../assests/menu-bar.png';
import { Button, Col, Placeholder, Row } from "react-bootstrap";
import backgroundVideo from '../../assests/backG-video.mp4';
import MenuButton from "../../Component/Button/MenuButton";
import profile from '../../assests/profile.png';
import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';


type FormValues = {
    from: String,
    to: String,
    city: String
}

const Dashboard = () => {
    const [menu, setMenu] = useState(true);
    const [userprofile, setUserProfile] = useState(true);

    const initialValues = {
        from: '',
        to: '',
        city: ''
    }

    const formList = [
        { placeholder: 'From', name: 'from' },
        { placeholder: 'To', name: 'to' },
        { placeholder: 'Select your City', name: 'city' }
    ];

    return (
        <Row className="m-0 p-0 vh-100 dashboard-container">
            <Col className="m-0 p-0 TopColumn">
                {/* <video className="background-video" autoPlay loop muted>
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
                <Row className="m-0 p-0 h-100 d-flex">
                    <Col className="m-0 p-0 col-1">
                        <Button className="btn m-0 p-1 menuButton" onClick={() => {
                            setMenu(!menu);
                        }}>
                            <img className="m-1 p-0" src={menu_bar} width={'32px'} height={'32px'} alt={"Menu Bar"} />
                        </Button>
                        <Col className={`m-0 p-0 col-2 ${menu ? 'menuHidden' : 'menu'}`}>
                            <MenuButton />
                        </Col>
                    </Col>
                    <Col className='m-3 p-0 searchBoxContainer col-6'>
                        <Row className='m-0 p-3'>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={(values) => {

                                }}
                            >
                                {({ errors, touched }) => (

                                    <Form className='m-0 p-0'>{
                                        formList.map((form, index) => {
                                            return (
                                                <Col className='m-0 p-0 py-1 col-6' key={index}>
                                                    <label className="m-0 p-0 col-6">{form.placeholder} :</label>

                                                    {form.name == "city" ?

                                                        // need to take those options from from database

                                                        <Field className={`col-6 m-0 p-1 ps-3 ${touched.from && errors.from ? 'input-error' : 'inputField'}`} as="select" name={form.name}>
                                                            <option value="red">Red</option>
                                                            <option value="green">Green</option>
                                                            <option value="blue">Blue</option>
                                                        </Field>

                                                        :

                                                        <Field name={form.name}
                                                            className={`col-6 m-0 p-1 ps-3 ${touched.from && errors.from ? 'input-error' : 'inputField'}`}
                                                            placeholder={form.placeholder}
                                                        />
                                                    }
                                                    <ErrorMessage name={form.name} component={'div'} className='m-0 p-0 message-error' />
                                                </Col>

                                            )
                                        })
                                    }
                                        <button type={'submit'} className='m-0 p-1 px-3 searchButton'>
                                            Search
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </Row>
                    </Col>
                    <Col className='m-0 p-0 col-2 flex-grow-1'>
                    </Col>
                    <Col className={`m-0 p-2 btn profileSection d-flex  align-items-center col-2 ${userprofile ? 'hideProfile justify-content-center' : 'showProfile justify-content-between'}`}
                        onMouseEnter={() => { setUserProfile(!userprofile) }}
                        onMouseLeave={() => { setUserProfile(!userprofile) }}>
                        <h6 className={`m-0 p-2 col-6 ${userprofile ? 'hideUserName' : 'showUserName'}`}>userName</h6>
                        <img className={`m-0 p-0 col-3 ${userprofile ?' flex-fill':''} `} width={'35px'} height={'40px'} src={profile} alt={'profile'} />
                    </Col>
                </Row>
            </Col>
            <Col className="m-0 p-0 col-12">
            </Col>
        </Row>
    );
}

export default Dashboard;