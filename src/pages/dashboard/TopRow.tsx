import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";


const TopRow = () => {
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
        <Row className='m-0 p-3'>
            <Col className='m-0 p-1 searchBoxContainer col-10'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        from: Yup.string().required(),
                        to: Yup.string().required(),
                        city: Yup.string().required()
                    })}
                    onSubmit={(values) => {

                    }}
                >
                    {({ errors, touched }) => (

                        <Form className='m-0 p-0 d-flex flex-wrap'>{
                            formList.map((form, index) => {
                                return (
                                    <Row className='m-0 p-2 col-6'>
                                        <Col className='m-0 p-2 py-2 inputBLock' key={index}>
                                            <label className="m-0 p-0 ps-2 col-6 text-secondary">{form.placeholder}:</label>

                                            {form.name === "city" ?

                                                // need to take those options from from database

                                                <Field className={`col-6 m-0 p-1 ps-3 ${touched.from && errors.from ? 'input-error-button' : 'inputField'}`} as="select" name={form.name}>
                                                    <option value="red">Red</option>
                                                    <option value="green">Green</option>
                                                    <option value="blue">Blue</option>
                                                </Field>

                                                :

                                                <Field name={form.name}
                                                    className={`col-6 m-0 p-1 ps-3 ${touched.from && errors.from ? 'input-error-button' : 'inputField'}`}
                                                    placeholder={form.placeholder}
                                                />
                                            }

                                        </Col>
                                        <ErrorMessage name={form.name} component={'div'} className='m-0 p-0 message-error-button' />
                                    </Row>
                                )
                            })
                        }

                        </Form>

                    )}
                </Formik>
            </Col>
            <button type={'submit'} className='m-0 p-0 searchButton col-2 '>
                Search
            </button>
        </Row>
    );
}

export default TopRow;