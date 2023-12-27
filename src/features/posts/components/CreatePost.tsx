import { AiOutlineClose } from '@src/components/icons';
import { Field, Formik } from 'formik';
import { ChangeEvent, memo } from 'react';
import usePosts from '../hooks/usePosts';
import { CreatePost } from '../models/post';
import Button from '@src/components/ui/Button';
import Input from '@src/components/ui/Input';
import TextArea from '@src/components/ui/TextArea';
import useAuth from '@src/features/auth/hooks/useAuth';

type CreatePostProps = {
    onClosePost: (value: boolean) => void;
};

const CreatePost = memo(function CreatePost({ onClosePost }: CreatePostProps) {
    const { currentUser } = useAuth();
    const { isLoading, handleCreatePost } = usePosts(undefined);

    const initialValues: CreatePost = {
        caption: '',
        content: null as any,
    };

    const hanldeCloseModal = () => {
        onClosePost(false);
    };

    return (
        <div className='h-screen w-full flex justify-center items-center absolute top-0 left-0 z-50 bg-[#f3f3f380]'>
            <div className='w-[600px] bg-white_1 h-fit rounded-2xl'>
                <div className='w-full flex items-center p-4 border-b-2 border-b-gray241_241_242_1'>
                    <span onClick={hanldeCloseModal} className='flex items-center cursor-pointer'>
                        <AiOutlineClose size={24} />
                    </span>
                    <p className='flex flex-1 justify-center mr-5 text-xl font-bold'>
                        Tạo bài viết
                    </p>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm }) => {
                        const { caption, content } = values;
                        const formData = new FormData();

                        formData.append('caption', caption);
                        if (content) formData.append('content', content);

                        handleCreatePost(formData);
                        hanldeCloseModal();

                        resetForm();
                    }}
                >
                    {(formikProps) => {
                        const { values, handleChange, handleSubmit, isSubmitting, setFieldValue } =
                            formikProps;
                        return (
                            <form
                                className='w-full flex flex-col p-5 gap-2'
                                onSubmit={handleSubmit}
                                encType='multipart/form-data'
                            >
                                <Field
                                    as={TextArea}
                                    name='caption'
                                    value={values.caption}
                                    placeholder={`${currentUser.firstName} ơi, bạn đang nghĩ gì thế?`}
                                    onChangeValue={handleChange}
                                />
                                <Field
                                    as={Input}
                                    name='content'
                                    label='Thêm ảnh/video'
                                    value={undefined}
                                    inputType='file'
                                    onChangeValue={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (!e.currentTarget.files) return;
                                        setFieldValue('content', e.currentTarget.files[0]);
                                    }}
                                />
                                <Button
                                    size='lg'
                                    text='Đăng'
                                    variant='primary'
                                    disabled={isSubmitting || values.caption === ''}
                                    type='submit'
                                    loading={isLoading}
                                />
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
});

export default CreatePost;
