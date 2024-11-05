import { ErrorMessage, Field, FormikErrors, FormikTouched } from "formik";
import { Col } from "react-bootstrap";
import { FormInput} from "../../pages/login/LoginForm";

import '../../css/Login.css';


type fieldType = {
    loginInput: FormInput[],
    errors: FormikErrors<Record<string, string>>,
    touched: FormikTouched<Record<string, string>>,
}

const FieldForm = ({ loginInput, errors, touched }: fieldType) => {
    return (
        <Col className='m-0 p-0' xs={12}>
            {
                loginInput.map((form, index: number) => {
                    return (
                        <Col className='m-0 mt-1 p-2 py-0' xs={12} key={index}>
                            <label className="m-0 p-2 ps-2 col-4">{form.placeholder} :</label>
                            <Field name={form.name}
                                className={`col-8 m-0 p-2 ps-3 ${touched.userName && errors.userName ? 'input-error' : 'inputField'}`}
                                placeholder={form.placeholder}
                            />
                            <ErrorMessage name={form.name} component={'div'} className='m-0 p-0 message-error' />
                        </Col>
                    )
                })
            }
        </Col>
    );
}

export default FieldForm;