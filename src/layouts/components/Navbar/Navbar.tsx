import logo from '@src/assets/icons/logo.svg';
import Modal from '@src/components/ui/Modal/Modal';
import { ROUTES } from '@src/constants/routes';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { logout } from '@src/redux/reducers/authSlice';
import HeadlessTippy from '@tippyjs/react/headless';
import { FC, useState } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoLanguageOutline } from 'react-icons/io5';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Navbar: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLanguage, setIsOpenLanguage] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { currentUser } = useAppSelector((state) => state.auth);

    const handleCloseModal = () => {
        setIsOpenLanguage(false);
        setIsOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        return navigate(ROUTES.LOGIN);
    };

    return (
        <div className='w-screen h-[60px] shadow-[0_1px_1px_rgba(22, 24, 35, 0.12)] z-10 bg-white'>
            <div className='h-[60px] w-full lg:w-[1150px] mx-auto flex justify-between items-center pl-5 pr-6'>
                <span>
                    <img src={logo} alt='Logo' />
                </span>
                {currentUser ? (
                    <HeadlessTippy
                        visible={isOpen ? true : false}
                        interactive
                        placement='bottom-end'
                        onClickOutside={handleCloseModal}
                        render={(attrs) => (
                            <div
                                tabIndex={-1}
                                {...attrs}
                                className='bg-white_1 w-full flex flex-col overflow-y-auto rounded-lg shadow-md'
                            >
                                <div className='w-full flex items-center justify-between py-[10px] px-4 cursor-pointer'>
                                    <p className='text-base font-semibold'>Chế độ tối</p>
                                    <label className='relative inline-flex items-center cursor-pointer'>
                                        <input
                                            type='checkbox'
                                            value=''
                                            className='sr-only peer'
                                        />
                                        <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <div
                                    onClick={() => {
                                        setIsOpenProfile(true);
                                        handleCloseModal();
                                    }}
                                    className='w-full flex items-center justify-start py-[10px] px-4 cursor-pointer hover:bg-gray012'
                                >
                                    <span className='mr-2'>
                                        <HiOutlineUserCircle size={20} />
                                    </span>
                                    <p className='text-base font-semibold'>
                                        Thông tin cá nhân
                                    </p>
                                </div>
                                <HeadlessTippy
                                    visible={isOpenLanguage ? true : false}
                                    interactive
                                    placement='right-start'
                                    onClickOutside={handleCloseModal}
                                    render={(attrs) => (
                                        <div
                                            tabIndex={-1}
                                            {...attrs}
                                            className='bg-white_1 flex flex-col 
                                        rounded-lg shadow-md'
                                        >
                                            <div
                                                className='w-full flex items-center justify-start 
                                            py-[10px] px-4 cursor-pointer hover:bg-gray012'
                                            >
                                                <p className='text-base font-semibold px-4'>
                                                    Tiếng Việt
                                                </p>
                                            </div>
                                            <div
                                                className='w-full flex items-center justify-start 
                                            py-[10px] px-4 cursor-pointer hover:bg-gray012'
                                            >
                                                <p className='text-base font-semibold px-4'>
                                                    Tiếng Anh
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                >
                                    <div
                                        onClick={() => setIsOpenLanguage(true)}
                                        className={`w-full flex items-center 
                                            justify-start py-[10px] px-4 
                                            cursor-pointer hover:bg-gray012
                                            ${isOpenLanguage ? 'bg-gray012' : ''}`}
                                    >
                                        <span className='mr-2 flex items-center'>
                                            <IoLanguageOutline size={20} />
                                        </span>
                                        <p className='text-base font-semibold'>
                                            Ngôn ngữ
                                        </p>
                                        <span className='flex items-center ml-auto'>
                                            <MdKeyboardArrowRight size={20} />
                                        </span>
                                    </div>
                                </HeadlessTippy>
                                <div
                                    onClick={handleLogout}
                                    className='w-full flex items-center justify-start py-[10px] px-4 cursor-pointer hover:bg-gray012'
                                >
                                    <span className='mr-2'>
                                        <BiLogOutCircle size={20} />
                                    </span>
                                    <p className='text-base font-semibold'>Đăng xuất</p>
                                </div>
                            </div>
                        )}
                    >
                        <div
                            onClick={() => setIsOpen(true)}
                            className='w-8 h-8 ml-6 cursor-pointer bg-center bg-contain rounded-full bg-no-repeat'
                            style={{
                                backgroundImage: `url(${currentUser.avatar})`,
                            }}
                        ></div>
                    </HeadlessTippy>
                ) : null}
            </div>
            {isOpenProfile ? (
                <Modal onCloseModal={setIsOpenProfile}>Profile</Modal>
            ) : null}
        </div>
    );
};

export default Navbar;
