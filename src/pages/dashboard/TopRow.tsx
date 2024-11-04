import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";


const TopRow = () => {
    const initialValues = {
        from: '',
        to: '',
        date: '',
        seat: ''
    }

    const formList = [
        { placeholder: 'From', name: 'from' },
        { placeholder: 'To', name: 'to' },
        { placeholder: 'Date of travel', name: 'date' },
        { placeholder: 'Select class', name: 'seat' }

    ];
    return (
        <Row className='m-0 p-3'>
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

                        <Form className='m-0 p-0 d-flex flex-wrap justify-content-between'>
                            <Col className="m-0 p-0 col-7">
                                {formList.map((form, index) => {
                                    return (
                                        <>
                                            <Col className={`m-0 p-2 py-2 col-12`} key={index}>
                                                <label className=" p-3 ps-4 col-6 text-secondary inputBLockLabel text-start">{form.placeholder}</label>

                                                {form.name === "city" ?

                                                    // need to take those options from database

                                                    <Field className={`m-0 p-3 ps-3 ${errors.from ? 'input-error-button' : 'inputField'}`} as="select" name={form.name}>
                                                        <option value="red">Red</option>
                                                        <option value="green">Green</option>
                                                        <option value="blue">Blue</option>
                                                    </Field>

                                                    :
                                                    form.name === "date" ?
                                                        <Field name={form.name} type={"date"}
                                                            className={`col-6 m-0 p-3 ps-3 ${errors.from ? 'input-error-button' : 'inputField'}`}
                                                            placeholder={form.placeholder}
                                                        />

                                                        :

                                                        <Field name={form.name}
                                                            className={`col-6 m-0 p-3 ps-3 ${errors.from ? 'input-error-button' : 'inputField'}`}
                                                            placeholder={form.placeholder}
                                                        />
                                                }

                                                <ErrorMessage name={form.name} component={'div'} className='m-0 p-0 message-error-button' />
                                            </Col>
                                        </>
                                    )
                                })
                                }
                            </Col>
                            <Col className="m-0 p-0"> 
                                <Row className="m-0 p-0 h-100">
                                    <Col className="m-0 p-2 my-1 notice col-12"><p>Note : </p>Only General seats are Available!!!
                                    </Col>
                                    <button type={'submit'} className='m-0 p-2 searchButton col-12'>
                                        Search
                                    </button>
                                </Row>
                            </Col>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    );
}

export default TopRow;