import tickIcon from '@src/assets/icons/tick.svg';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { resetUserReceiveNewMessage, setReceiver } from '@src/redux/reducers/friendSlice';
import { FC } from 'react';
import { IFriend } from '../../models/friend';
import { RxImage } from 'react-icons/rx';
import { MESSAGE_TYPE } from '@src/constants/constants';

interface IFriendItemProps {
    friend: IFriend;
}

const FriendItem: FC<IFriendItemProps> = ({ friend }) => {
    const { avatar, firstName, lastName, lastestMessage, id, tick } = friend;
    const { activeId, userReceiveNewMessageId } = useAppSelector(
        (state) => state.friends,
    );
    const dispatch = useAppDispatch();
    const isNewMessage = id === userReceiveNewMessageId;

    const handleSetReceiverInfo = (id: number) => {
        dispatch(setReceiver(id));
        if (isNewMessage) dispatch(resetUserReceiveNewMessage());
    };

    return (
        <div
            className={activeId === id ? 'friend-item-active' : 'friend-item'}
            onClick={() => handleSetReceiverInfo(id)}
        >
            <img
                src={avatar}
                className='h-[56px] w-[56px] rounded-full'
                alt='Friend Avatar'
            />
            <div className='flex flex-col gap-[6px]'>
                <p className='text-[18px] font-medium flex'>
                    {lastName} {firstName}
                    {tick ? <img src={tickIcon} className='pl-2' /> : null}
                </p>
                {lastestMessage.messageTypeId === MESSAGE_TYPE.TEXT ? (
                    <p className={isNewMessage ? 'new-message' : 'lastest-message'}>
                        {lastestMessage.content}
                    </p>
                ) : null}
                {lastestMessage.messageTypeId === MESSAGE_TYPE.IMAGE ? (
                    <div className='flex items-center gap-1'>
                        <RxImage size={15} />
                        <p className='lastest-message'>Hình ảnh</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default FriendItem;
