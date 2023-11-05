import Input from '@src/components/form/Input/Input';
import Button from '@src/components/ui/Button/Button';
import { ROUTES } from '@src/constants/routes';
import useAccessToken from '@src/features/auth/hooks/useAccessToken';
import { ILogin } from '@src/features/auth/models/auth';
import { login } from '@src/features/auth/services/authThunk';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { Field, Formik } from 'formik';
import { FC, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const LoginPage: FC = () => {
    const { loading: authLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { handleSetAccessToken } = useAccessToken();

    const navigate = useNavigate();

    const initialValues: ILogin = {
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
        <Fragment>
            <h1 className='text-[32px] text-center flex-1 py-4'>Đăng nhập</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    dispatch(login(values))
                        .unwrap()
                        .then((data: any) => {
                            handleSetAccessToken(data.accessToken);
                            return navigate(ROUTES.HOME);
                        });
                    resetForm();
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
                            {/* <p className='text-gray075 font-semibold text-xs mb-[21px]'>
                                Quên mật khẩu?
                            </p> */}
                            <div className={`mt-5`}>
                                <Button
                                    text='Đăng nhập'
                                    variant='primary'
                                    type='submit'
                                    size='lg'
                                    disabled={authLoading}
                                    loading={authLoading}
                                />
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </Fragment>
    );
};

export default LoginPage;
