import { FC } from 'react';
import { IFriend } from '../../models/friend';
import tickIcon from '@src/assets/icons/tick.svg';

interface IReceiverInfoProps {
    receiverInfo: IFriend;
}

const ReceiverInfo: FC<IReceiverInfoProps> = ({ receiverInfo }) => {
    return (
        <div className='flex items-center gap-2 p-[6px] rounded-lg hover:bg-gray006'>
            <img
                src={receiverInfo.avatar}
                alt={receiverInfo.username}
                className='w-[50px] h-[50px] rounded-full'
            />
            <p className='text-lg flex'>
                {receiverInfo.lastName} {receiverInfo.firstName}
                {receiverInfo.tick ? <img src={tickIcon} className='ml-2' /> : null}
            </p>
        </div>
    );
};

export default ReceiverInfo;
