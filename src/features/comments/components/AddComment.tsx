import { CloseIcon } from 'assets/icons';
import classNames from 'classnames/bind';
import { MAX_INPUT_LENGTH } from 'constants/constants';
import { Field, Formik } from 'formik';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { FC } from 'react';
import { createNewComment, resetSelectedComment } from 'redux/reducers/commentSlice';
import { userAddNewComment } from 'redux/reducers/postSlice';
import styles from './AddComment.module.scss';
import InputField from 'components/ui/Input';
import Button from 'components/ui/Button';

const cx = classNames.bind(styles);

interface IAddCommentProps {
    postId: number;
}

interface ICommentFormValue {
    comment: string;
}

const AddComment: FC<IAddCommentProps> = ({ postId }) => {
    const { currentUser } = useAppSelector((state) => state.auth);
    // const { selectedComment } = useAppSelector((state) => state.comments);
    const dispatch = useAppDispatch();

    const initialValues: ICommentFormValue = {
        comment: '',
    };

    return (
        // <Formik
        //     initialValues={initialValues}
        //     onSubmit={(values, { resetForm }) => {
        //         const { accessToken } = currentUser;

        //         const data: INewComment = {
        //             postId: postId,
        //             content: values.comment,
        //             accessToken: accessToken,
        //             parentId: selectedComment?.id,
        //         };

        //         dispatch(createNewComment(data))
        //             .unwrap()
        //             .then(() => {
        //                 dispatch(userAddNewComment());
        //                 dispatch(resetSelectedComment());
        //             });
        //         resetForm();
        //     }}
        // >
        //     {(formikProps) => {
        //         const { values, handleChange, handleSubmit } = formikProps;
        //         return (
        //             <form className={cx('container')} onSubmit={handleSubmit}>
        //                 {selectedComment ? (
        //                     <div className={cx('reply-container')}>
        //                         <p className={cx('reply-username')}>
        //                             Trả lời @{selectedComment.userCommentDetail.lastName}{' '}
        //                             {selectedComment.userCommentDetail.firstName}
        //                         </p>
        //                         <span
        //                             className={cx('remove-reply-button')}
        //                             onClick={() => dispatch(resetSelectedComment())}
        //                         >
        //                             <CloseIcon />
        //                         </span>
        //                     </div>
        //                 ) : null}
        //                 <div className={cx('input')}>
        //                     <Field
        //                         as={InputField}
        //                         name='comment'
        //                         inputType='text'
        //                         value={values.comment}
        //                         onChangeValue={handleChange}
        //                         placeholder='Thêm bình luận'
        //                     />
        //                     <Button
        //                         text='Đăng'
        //                         disabled={Boolean(!values.comment)}
        //                         variant='base'
        //                         size='md'
        //                         type='submit'
        //                     />
        //                 </div>
        //                 {values.comment.length > 30 ? (
        //                     <p
        //                         className={cx('input-length', {
        //                             max: values.comment.length === MAX_INPUT_LENGTH,
        //                         })}
        //                     >
        //                         {values.comment.length} / {MAX_INPUT_LENGTH}
        //                     </p>
        //                 ) : null}
        //             </form>
        //         );
        //     }}
        // </Formik>
        <h1>Add Comment</h1>
    );
};

export default AddComment;
