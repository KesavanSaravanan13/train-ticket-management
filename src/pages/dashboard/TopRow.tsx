import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";


interface Place {
    placeId: string;
    placeName: string;
    noOfStations: number;
    status: boolean;
}

const TopRow: React.FC = () => {

    const [place, setPlace] = useState<Place[]>([]);
    const initialValues = {
        from: '',
        to: '',
        date: '',
        seat: ''
    };

    useEffect(() => {
        const getPlace = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('http://localhost:8080/place', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPlace(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getPlace();
    }, []);


    const seatList = [
        { seat: 'SL' },
        { seat: '2-Tier AC' },
        { seat: '3-Tier AC' }
    ];

    const formList = [
        { placeholder: 'From', name: 'from' },
        { placeholder: 'To', name: 'to' },
        { placeholder: 'Date of travel', name: 'date' },
        { placeholder: 'Select class', name: 'seat' }

    ];
    return (
        <Row className='m-0 p-3 topRow' >
            <Col className='m-0 p-1 searchBoxContainer col-12'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        from: Yup.string().required(),
                        to: Yup.string().required(),
                        date: Yup.string().required(),
                        seat: Yup.string().required()
                    })}
                    onSubmit={(values) => {

                    }}
                >
                    {({ errors, touched }) => (

                        <Form className='m-0 p-0 row d-flex flex-wrap justify-content-between'>
                            <Col className="m-0 p-0 col-12 d-flex justify-content-between align-items-center flex-wrap">
                                {formList.map((form, index) => {
                                    return (
                                        <>
                                            <Col className={`m-0 p-2 py-2 col-6 inputContainer`} key={index}>
                                                <label className=" p-3 ps-4 col-6 text-secondary inputBLockLabel text-start">{form.placeholder}</label>

                                                {form.name === "seat" ?

                                                    // need to take those options from database

                                                    <Field
                                                        className={`m-0 p-3 ps-3 ${errors.from ? 'input-error-button' : 'inputFieldDashboard'}`}
                                                        as="select"
                                                        name={form.name}
                                                    >
                                                        {seatList.map((list, index) => (
                                                            <option className="m-0 p-0 pt-3" value={list.seat} key={index}>
                                                                {list.seat}
                                                            </option>
                                                        ))}
                                                    </Field>

                                                    :
                                                    form.name === "date" ?
                                                        <Field name={form.name} type={"date"}
                                                            className={`col-6 m-0 p-3 ps-3 ${errors.from ? 'input-error-button' : 'inputFieldDashboard'}`}
                                                            placeholder={form.placeholder}
                                                        />

                                                        :

                                                        <Field
                                                            className={`m-0 p-3 ps-3 ${errors.from ? 'input-error-button' : 'inputFieldDashboard'}`}
                                                            as="select"
                                                            name={form.name}
                                                        >
                                                            {place.map((placelist, index) => (
                                                                <option className="m-0 p-0 pt-3" value={placelist.placeName} key={index}
                                                                disabled={placelist.status !== true}
                                                                >
                                                                    {placelist.placeName}
                                                                </option>
                                                            ))}
                                                        </Field>

                                                }

                                                <ErrorMessage name={form.name} component={'div'} className='m-0 p-0 message-error-button' />
                                            </Col>
                                        </>
                                    )
                                })
                                }
                            </Col>
                            <Col className="m-0 p-0 pt-3">
                                <p className="m-0 p-0 text-end pe-3">*fill every option and search</p>
                                <button type={'submit'} className='m-0 p-2 pt-1 searchButton col-12'>
                                    Search
                                </button>
                            </Col>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    );
}

export default TopRow;