import Button from '@src/components/ui/Button';
import Input from '@src/components/ui/Input';
import { MAX_INPUT_LENGTH } from '@src/constants/constants';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import cn from '@src/lib/clsx';
import { Field, Formik } from 'formik';
import { memo } from 'react';
import { CreateCommentForm } from '../models/comment';
import ReplyComment from './ReplyComment';

type AddCommentProps = {
    postID: number;
};

const AddComment = memo(function AddComment({ postID }: AddCommentProps) {
    const { selectedComment } = useAppSelector((state) => state.comments);
    const dispatch = useAppDispatch();

    const initialValues: CreateCommentForm = {
        content: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
                console.log(values);

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
                                name='comment'
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
