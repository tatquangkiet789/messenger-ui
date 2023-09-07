import tickIcon from '@src/assets/icons/tick.svg';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { setReceiver } from '@src/redux/reducers/friendSlice';
import { FC } from 'react';

interface IFriendItemProps {
    userId: number;
    avatar: string;
    lastestMessage?: string;
    fullname: string;
    tick: boolean;
}

const FriendItem: FC<IFriendItemProps> = ({
    userId,
    avatar,
    lastestMessage,
    fullname,
    tick,
}) => {
    const { activeId } = useAppSelector((state) => state.friends);
    const dispatch = useAppDispatch();
    const userReceivedNewMessageId = 1;

    const handleSetReceiverInfo = (id: number) => {
        dispatch(setReceiver(id));
    };

    return (
        <div
            className={activeId === userId ? 'friend-item-active' : 'friend-item'}
            onClick={() => handleSetReceiverInfo(userId)}
        >
            <img
                src={avatar}
                className='h-[56px] w-[56px] rounded-full'
                alt='Friend Avatar'
            />
            <div className='flex flex-col gap-[6px]'>
                <p className='text-[18px] font-medium flex'>
                    {fullname}
                    {tick ? <img src={tickIcon} className='pl-2' /> : null}
                </p>
                <p
                    className={
                        userId === userReceivedNewMessageId
                            ? 'new-message'
                            : 'lastest-message'
                    }
                >
                    {lastestMessage}
                </p>
            </div>
        </div>
    );
};

export default FriendItem;
