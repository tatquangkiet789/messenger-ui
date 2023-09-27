import { STORAGE_KEY } from '@src/constants/constants';
import { updateSenderLastestMessage } from '@src/features/friends/friendSlice';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { ChangeEvent, FC, FormEvent, Fragment, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { FiImage } from 'react-icons/fi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { IMessage, INewMessage } from '../../models/message';
import { createNewMessage } from '../../services/messageThunk';
import { receiveNewMessageFromSocket } from '../../messageSlice';

const AddMessage: FC = () => {
    const [content, setContent] = useState('');
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    const { receiver } = useAppSelector((state) => state.friends);
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;
    const dispatch = useAppDispatch();

    const handleSubmitMessage = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('receiverId', receiver.id.toString());
        formData.append('content', content);

        const data: INewMessage = {
            formData: formData,
            accessToken: accessToken,
        };
        // const socketData: ISendMessage = {
        //     senderName: currentUser.username,
        //     receiverName: receiver.username,
        // };

        dispatch(createNewMessage(data))
            .unwrap()
            .then((data: IMessage) => {
                // Cập nhật tin nhắn vào trong message list và cập nhật
                // tin nhắn mới nhất trong friend list ở phía sender
                const { content } = data;
                dispatch(receiveNewMessageFromSocket(content));
                dispatch(updateSenderLastestMessage(content));
            });
        // socketClient.emit(SOCKET_EVENT.SEND_MESSAGE, socketData);
        setContent('');
    };

    const handleSelectEmoji = (emojiData: EmojiClickData) => {
        setContent((prev) => prev + emojiData.emoji);
        setIsOpenEmoji(false);
    };

    const handleChooseAndUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files) return;

        const formData = new FormData();
        formData.append('image', e.currentTarget.files[0]);
        formData.append('receiverId', receiver.id.toString());

        const data: INewMessage = {
            formData: formData,
            accessToken: accessToken,
        };

        dispatch(createNewMessage(data))
            .unwrap()
            .then((data: IMessage) => {
                // Cập nhật tin nhắn vào trong message list và cập nhật
                // tin nhắn mới nhất trong friend list ở phía sender
                const { content } = data;
                dispatch(receiveNewMessageFromSocket(content));
                dispatch(updateSenderLastestMessage(content));
            });
    };

    return (
        <Fragment>
            {isOpenEmoji ? (
                <div className='absolute bottom-24 left-auto'>
                    <EmojiPicker onEmojiClick={handleSelectEmoji} />
                </div>
            ) : null}
            <form
                className='bg-white flex p-3 gap-3 rounded-b-lg items-center'
                style={{ boxShadow: 'rgb(0 0 0 / 6%) 0px 2px 8px' }}
                onSubmit={handleSubmitMessage}
            >
                <label
                    className='bg-white flex items-center justify-center rounded-md p-[6px] 
                    cursor-pointer hover:bg-gray006'
                    htmlFor='file-btn'
                >
                    <FiImage className='stroke-primary' size={30} />
                </label>
                <input type='file' id='file-btn' hidden onChange={handleChooseAndUploadFile} />
                <div
                    className={`flex items-center justify-center rounded-md p-[6px] 
                    cursor-pointer hover:bg-gray006 ${isOpenEmoji ? 'bg-gray006' : 'bg-white'}`}
                    onClick={() => setIsOpenEmoji(!isOpenEmoji)}
                >
                    <HiOutlineEmojiHappy className='stroke-primary' size={30} />
                </div>
                <input
                    type='text'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`Nhập tin nhắn tới ${receiver.lastName} ${receiver.firstName}`}
                    className='caret-primary py-3 px-5 text-base flex-1 bg-gray006 
                    rounded-full border-gray012'
                    spellCheck={false}
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
            </form>
        </Fragment>
    );
};

export default AddMessage;
