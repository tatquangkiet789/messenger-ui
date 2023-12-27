import { MdKeyboardArrowDown } from '@src/components/icons';
import UpdatePassword from '@src/features/auth/components/UpdatePassword/UpdatePassword';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, Fragment, useState } from 'react';

interface ICurrentUserProfile {
    email: string;
    username: string;
}

const CurrentUserProfile: FC<ICurrentUserProfile> = ({ email, username }) => {
    const [isUpdatePassword, setIsUpdatePassword] = useState(false);

    const handleToggleUpdatePassword = () => {
        setIsUpdatePassword(!isUpdatePassword);
    };

    return (
        <Fragment>
            <p className='pl-4 font-medium text-sm'>Thông tin cá nhân</p>
            <div className='mt-4 px-4 flex items-center text-sm'>
                <p className='text-gray06 font-medium w-28'>Email:</p>
                <p className='flex-1 font-normal'>{email}</p>
            </div>
            <div className='mt-4 px-4 flex items-center text-sm'>
                <p className='text-gray06 font-medium w-28'>Tên đăng nhập:</p>
                <p className='flex-1 font-normal'>{username}</p>
            </div>
            <div className='mt-4 px-4 flex flex-col gap-4'>
                <div className='flex items-center text-sm'>
                    <p className='text-gray06 font-medium w-28'>Mật khẩu:</p>
                    <div className='flex cursor-pointer gap-2' onClick={handleToggleUpdatePassword}>
                        <p className='font-normal'>Cập nhật mật khẩu</p>
                        <motion.span
                            className='flex items-center'
                            animate={{
                                rotate: isUpdatePassword ? 180 : 0,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                        >
                            <MdKeyboardArrowDown size={20} />
                        </motion.span>
                    </div>
                </div>
                <AnimatePresence>{isUpdatePassword ? <UpdatePassword /> : null}</AnimatePresence>
            </div>
        </Fragment>
    );
};

export default CurrentUserProfile;
