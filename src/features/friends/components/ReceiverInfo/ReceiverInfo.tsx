import { FC, Fragment, useState } from 'react';
import { IFriend } from '../../models/friend';
import tickIcon from '@src/assets/icons/tick.svg';
import { AnimatePresence } from 'framer-motion';
import Modal from '@src/components/ui/Modal/Modal';
import UserProfile from '@src/features/users/components/UserProfile/UserProfile';

interface IReceiverInfoProps {
    receiverInfo: IFriend;
}

const ReceiverInfo: FC<IReceiverInfoProps> = ({ receiverInfo }) => {
    const [isOpenProfile, setIsOpenProfile] = useState(false);

    const handleOpenProfile = () => {
        setIsOpenProfile(true);
    };

    return (
        <Fragment>
            <div
                className='flex items-center gap-2 p-[6px] rounded-lg hover:bg-gray006 
            cursor-pointer'
                onClick={handleOpenProfile}
            >
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
            <AnimatePresence>
                {isOpenProfile ? (
                    <Modal>
                        <UserProfile onToggleModal={setIsOpenProfile} user={receiverInfo} />
                    </Modal>
                ) : null}
            </AnimatePresence>
        </Fragment>
    );
};

export default ReceiverInfo;
