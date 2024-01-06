import Button from '@src/components/ui/Button';
import Input from '@src/components/ui/Input';
import { MAX_INPUT_LENGTH } from '@src/constants/constants';
import { ROUTES } from '@src/constants/routes';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import cn from '@src/lib/clsx';
import { Field, Formik } from 'formik';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { CreateComment, CreateCommentForm } from '../models/comment';
import { createComment } from '../services/commentThunk';
import ReplyComment from './ReplyComment';
import { resetSelectedComment } from '../commentSlice';
import { userAddComment } from '@src/features/posts/postSlice';

type AddCommentProps = {
    postID: number;
    isAuthenticated: boolean;
};

const AddComment = memo(function AddComment({ postID, isAuthenticated }: AddCommentProps) {
    const { selectedComment } = useAppSelector((state) => state.comments);
    const dispatch = useAppDispatch();

    const initialValues: CreateCommentForm = {
        content: '',
    };

    if (!isAuthenticated) {
        return (
            <Link to={ROUTES.LOGIN} className='bg-white_1 py-5 px-7'>
                <div className='flex items-center bg-gray006 ml-3 mt-2'>
                    <p className='text-primary font-semibold p-3'>Đăng nhập để bình luận</p>
                </div>
            </Link>
        );
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
                const data: CreateComment = {
                    content: values.content,
                    parentID: selectedComment ? selectedComment.id : undefined,
                    postID,
                };
                dispatch(createComment(data))
                    .unwrap()
                    .then(() => dispatch(userAddComment()));
                dispatch(resetSelectedComment());
                resetForm();
            }}
        >
            {(formikProps) => {
                const { values, handleChange, handleSubmit } = formikProps;
                return (
                    <form className={`flex flex-col bg-white_1 py-5 px-7`} onSubmit={handleSubmit}>
                        <ReplyComment selectedComment={selectedComment} />
                        <div className={`flex pt-2 pl-3 text-gray05`}>
                            <Field
                                as={Input}
                                name='content'
                                inputType='text'
                                value={values.content}
                                onChangeValue={handleChange}
                                placeholder='Thêm bình luận'
                            />
                            <Button
                                text='Đăng'
                                disabled={Boolean(!values.content)}
                                variant='base'
                                size='md'
                                type='submit'
                            />
                        </div>
                        {values.content.length > 30 ? (
                            <p
                                className={cn({
                                    'text-primary': values.content.length === MAX_INPUT_LENGTH,
                                })}
                            >
                                {values.content.length} / {MAX_INPUT_LENGTH}
                            </p>
                        ) : null}
                    </form>
                );
            }}
        </Formik>
    );
});

export default AddComment;
