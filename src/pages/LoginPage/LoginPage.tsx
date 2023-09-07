import Input from '@src/components/form/Input/Input';
import Button from '@src/components/ui/Button/Button';
import { USER_ROLES } from '@src/constants/constants';
import { ROUTES } from '@src/constants/routes';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { ILogin } from '@src/modules/auth/models/auth';
import { login } from '@src/redux/reducers/authSlice';
import { Field, Formik } from 'formik';
import { FC, Fragment } from 'react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const LoginPage: FC = () => {
    const { loading: authLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from.pathname || ROUTES.HOME;

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
            <div className='py-4 flex items-center justify-center'>
                <Link className='flex cursor-pointer' to={ROUTES.HOME}>
                    <MdOutlineArrowBackIosNew size={20} />
                </Link>
                <h1 className='text-[32px] text-center flex-1'>Đăng nhập</h1>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    dispatch(login(values))
                        .unwrap()
                        .then((data) => {
                            const { userRoleId } = data.content;
                            // socketClient.emit(SOCKET_EVENT.NEW_USER, username);
                            if (userRoleId === USER_ROLES.USER) return navigate(from);
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
                        <form
                            className='w-full flex flex-col gap-[9px]'
                            onSubmit={handleSubmit}
                        >
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
                            <p className='text-gray075 font-semibold text-xs mb-[21px]'>
                                Quên mật khẩu?
                            </p>
                            <Button
                                text='Đăng nhập'
                                variant='primary'
                                type='submit'
                                size='lg'
                                disabled={authLoading}
                                loading={authLoading}
                            />
                        </form>
                    );
                }}
            </Formik>
        </Fragment>
    );
};

export default LoginPage;
