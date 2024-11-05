import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import FieldForm from "../../Component/Form/FieldForm";
import LoginButton from "../../Component/Button/LoginButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProducts } from "../../utils/API/AxiosCall";
import '../../css/Login.css';
import Logo from '../../assests/Logo.png';

export type FormInput = {
    name: string;
    placeholder: string;
}

export type FormValues = {
    userName: string;
    password: string;
}

const LoginForm = () => {
    const navigate = useNavigate();
    const [clicked, setClicked] = useState<boolean>(false);

    const initialValues: FormValues = {
        userName: '',
        password: ''
    }

    const loginInput: FormInput[] = [
        { name: 'userName', placeholder: 'User name' },
        { name: 'password', placeholder: 'Password' },
    ]

    const setToken = async (values: FormValues) => {
        setClicked(!clicked);
        const response = await createProducts(values)
        setTimeout(() => {
            if (response.data) {
                localStorage.setItem('token', response.data);
                // validUser("Logged in...");
                navigate('/dashboard');
                setTimeout(() => {
                    setClicked(!clicked);
                }, 2000);
            }
        }, 2000)
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                userName: Yup.string().required('Please Enter User Name!'),
                password: Yup.string().required('Please Enter Password!')
            })}
            onSubmit={ values=>{
                setToken(values)
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <Row className='m-0 p-0'>
                        <Col className='m-0 p-0 py-3 mb-1 text-center'><img src={Logo} width={'150px'} alt={"Logo"}/></Col>
                        <label className='m-0 ps-1 p-2'>Please enter your User name and Password</label>
                        <FieldForm errors={errors} touched={touched} loginInput={loginInput} />
                        <LoginButton message={clicked ? 'clicked' : 'normal'} />
                        <Col className='m-0 p-0 pb-5 pt-1 text-end d-flex justify-content-between'>
                        <label className='m-0 ps-3 p-0 forgetPassword'>Don't hav an Account?  <a href='/' className="m-0 p-0 ">Sign up</a></label>
                        <a href='/' className="m-0 p-0 pe-3 forgetPassword">Forget Password?</a></Col>
                        <Col className="m-0 p-0 col-12">
                        <h6 className="m-0 p-0 copyRight text-center">@2024 Train Ticket Management</h6>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
}

export default LoginForm;
