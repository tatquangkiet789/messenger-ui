import { STORAGE_KEY } from '@src/constants/constants';
import SOCKET_EVENT from '@src/constants/socket';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import socketClient from '@src/lib/socketClient';
import { createNewMessage } from '@src/redux/reducers/messageSlice';
import { FC, FormEvent, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { FiImage } from 'react-icons/fi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { INewMessage, ISendMessage } from '../../models/message';

const AddMessage: FC = () => {
    const [content, setContent] = useState('');
    const { receiver } = useAppSelector((state) => state.friends);
    const { currentUser } = useAppSelector((state) => state.auth);
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;
    const dispatch = useAppDispatch();

    const handleSubmitMessage = (e: FormEvent) => {
        e.preventDefault();
        const data: INewMessage = {
            accessToken: accessToken,
            receiverId: receiver.id,
            content: content,
        };
        const socketData: ISendMessage = {
            senderName: currentUser.username,
            receiverName: receiver.username,
            content: content,
        };
        socketClient.emit(SOCKET_EVENT.SEND_MESSAGE, socketData);
        dispatch(createNewMessage(data));
        setContent('');
    };

    const handleOpenImageModal = () => {
        toast.info('Opening modal to choose image');
    };

    const handleOpenEmojiModal = () => {
        toast.info('Opening modal to choose emoji');
    };

    return (
        <form
            className='bg-white flex flex-col p-3 gap-3 items-start
            rounded-b-lg'
            style={{ boxShadow: 'rgb(0 0 0 / 6%) 0px 2px 8px' }}
            onSubmit={handleSubmitMessage}
        >
            <div className='flex items-center w-fit gap-3'>
                <div
                    className='bg-white flex items-center justify-center rounded-full p-[6px] 
                    cursor-pointer hover:bg-gray006'
                    onClick={handleOpenImageModal}
                >
                    <FiImage className='stroke-primary' size={30} />
                </div>
                <div
                    className='bg-white flex items-center justify-center rounded-full p-[6px] 
                    cursor-pointer hover:bg-gray006'
                    onClick={handleOpenEmojiModal}
                >
                    <HiOutlineEmojiHappy className='stroke-primary' size={30} />
                </div>
            </div>
            <div className='flex items-center w-full gap-3'>
                <input
                    type='text'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='Nhập tin nhắn tới Raiden Shogun'
                    className='caret-primary py-3 px-5 text-base flex-1 bg-gray006 
                    rounded-full border-gray012'
                />
                <button
                    className={`bg-white flex items-center justify-center p-[6px] 
                    rounded-lg cursor-pointer hover:bg-gray006 group
                    disabled:cursor-not-allowed disabled:hover:bg-white`}
                    disabled={content === ''}
                    type='submit'
                >
                    <AiOutlineSend
                        className='group-hover:fill-primary group-disabled:fill-gray012'
                        size={30}
                    />
                </button>
            </div>
        </form>
    );
};

export default AddMessage;
