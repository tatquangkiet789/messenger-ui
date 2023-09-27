import Input from '@src/components/form/Input/Input';
import Button from '@src/components/ui/Button/Button';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { Field, Formik } from 'formik';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { IUpdatePassword } from '../../models/auth';
import { STORAGE_KEY } from '@src/constants/constants';
import { updatePassword } from '../../services/authThunk';

interface IUpdatePasswordForm {
    password: string;
    newPassword: string;
    confirmPassword: string;
}

const UpdatePassword: FC = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.auth);
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;

    const initialValues: IUpdatePasswordForm = {
        password: '',
        newPassword: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        password: Yup.string()
            .max(100, 'Mật khẩu cũ không được quá 100 ký tự')
            .min(3, 'Mật khẩu cũ phải dài hơn 3 ký tự'),
        newPassword: Yup.string()
            .max(100, 'Mật khẩu mới không được quá 100 ký tự')
            .min(3, 'Mật khẩu mới phải dài hơn 3 ký tự'),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Mật khẩu không trùng'),
    });

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'fit-content', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    const isEmpty = Object.values(values).some((value) => value === '');
                    if (isEmpty) {
                        toast.error('Vui lòng điền đầy đủ thông tin');
                        setSubmitting(false);
                        return;
                    }
                    const formData = new FormData();
                    formData.append('password', values.password);
                    formData.append('newPassword', values.newPassword);
                    const data: IUpdatePassword = {
                        formData: formData,
                        accessToken: accessToken,
                    };

                    dispatch(updatePassword(data));
                    resetForm();
                }}
                validationSchema={validationSchema}
            >
                {(formikProps) => {
                    const { errors, values, handleChange, handleSubmit, isSubmitting } =
                        formikProps;

                    return (
                        <form className='flex flex-col gap-2 text-sm'>
                            <div className='flex items-center'>
                                <p className='text-gray06 font-medium w-28'>Mật khẩu cũ:</p>
                                <Field
                                    as={Input}
                                    name='password'
                                    inputType='password'
                                    value={values.password}
                                    onChangeValue={handleChange}
                                    error={errors.password}
                                    customPadding='px-5 py-2'
                                />
                            </div>
                            <div className='flex items-center'>
                                <p className='text-gray06 font-medium w-28'>Mật khẩu mới:</p>
                                <Field
                                    as={Input}
                                    name='newPassword'
                                    inputType='password'
                                    value={values.newPassword}
                                    onChangeValue={handleChange}
                                    error={errors.newPassword}
                                    customPadding='px-5 py-2'
                                />
                            </div>
                            <div className='flex items-center'>
                                <p className='text-gray06 font-medium w-28'>Nhập lại mật khẩu:</p>
                                <Field
                                    as={Input}
                                    name='confirmPassword'
                                    inputType='password'
                                    value={values.confirmPassword}
                                    onChangeValue={handleChange}
                                    error={errors.confirmPassword}
                                    customPadding='px-5 py-2'
                                />
                            </div>
                            <div className='w-full mt-8 mb-4'>
                                <Button
                                    text='Cập nhật thông tin'
                                    size='lg'
                                    variant='primary'
                                    type='submit'
                                    onClick={handleSubmit}
                                    loading={loading}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </motion.div>
    );
};

export default UpdatePassword;
