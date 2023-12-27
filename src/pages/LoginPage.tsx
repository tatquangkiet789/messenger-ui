import Input from '@src/components/ui/Input';
import Button from '@src/components/ui/Button';
import useAuth from '@src/features/auth/hooks/useAuth';
import { Login } from '@src/features/auth/models/auth';
import { Field, Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ROUTES } from '@src/constants/routes';

const LoginPage = () => {
    const { handleLogin, isLoading } = useAuth();
    const location = useLocation();

    const navigate = useNavigate();
    const from = (location.state as any)?.from.pathname || ROUTES.HOME;

    const initialValues: Login = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .max(60, 'Tên tài khoản không được quá 60 ký tự')
            .min(3, 'Tên tài khoản phải nhiều hơn 3 kí tự')
            .required('Tên tài khoản không được để trống'),
        password: Yup.string()
            .max(100, 'Mật khẩu không được quá 100 ký tự')
            .min(3, 'Mật khẩu phải dài hơn 3 kí tự')
            .required('Mật khẩu không được để trống'),
    });

    return (
        <>
            <h1 className='text-[32px] text-center flex-1 py-4'>Đăng nhập</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    handleLogin(values);
                    resetForm();
                    return navigate(from);
                }}
                validationSchema={validationSchema}
            >
                {(formikProps) => {
                    const { errors, values, handleChange, handleSubmit } = formikProps;
                    const { username, password } = values;
                    const { username: usernameErr, password: passwordErr } = errors;
                    return (
                        <form className='w-full flex flex-col gap-[9px]' onSubmit={handleSubmit}>
                            <Field
                                as={Input}
                                name='username'
                                label='Tài khoản'
                                inputType='text'
                                value={username}
                                onChangeValue={handleChange}
                                placeholder='Tên tài khoản'
                                error={usernameErr}
                            />
                            <Field
                                as={Input}
                                name='password'
                                label='Mật khẩu'
                                inputType='password'
                                value={password}
                                onChangeValue={handleChange}
                                placeholder='Mật khẩu'
                                error={passwordErr}
                            />
                            <div className={`mt-5`}>
                                <Button
                                    text='Đăng nhập'
                                    variant='primary'
                                    type='submit'
                                    size='lg'
                                    disabled={isLoading}
                                    loading={isLoading}
                                />
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default LoginPage;
