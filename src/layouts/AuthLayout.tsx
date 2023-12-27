import wave from '@src/assets/images/waves.svg';
import { AiOutlineClose } from '@src/components/icons';
import { ROUTES } from '@src/constants/routes';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AuthLayout() {
    const { pathname } = useLocation();

    return (
        <div className='h-screen w-full z-20 flex items-center justify-center relative overflow-hidden'>
            <div
                className='absolute w-[calc(2*100vw)] h-full bg-cover bg-center left-0 animate-wave'
                style={{ backgroundImage: `url(${wave})` }}
            ></div>
            <div className='w-[483px] rounded-lg shadow-lg flex flex-col items-center h-[75vh] z-10 bg-white'>
                <Link
                    to={ROUTES.HOME}
                    className='flex self-end rounded-full bg-gray003 p-[10px] mt-[15px] mr-[15px]'
                >
                    <AiOutlineClose size={24} />
                </Link>
                <div className='py-0 px-[54px] w-full h-full overflow-y-auto'>
                    <Outlet />
                </div>
                {pathname === '/auth/login' ? (
                    <div className='justify-self-end w-full text-center text-[15px] leading-[18px] py-5 border-t-[1px] border-t-gray012'>
                        Bạn không có tài khoản?
                        <Link
                            className='text-primary ml-[5px] font-semibold'
                            to={`${ROUTES.REGISTER}`}
                        >
                            Đăng ký
                        </Link>
                    </div>
                ) : null}
                {pathname === '/auth/register' ? (
                    <div className='justify-self-end w-full text-center text-[15px] leading-[18px] py-5 border-t-[1px] border-t-gray012'>
                        Bạn đã có tài khoản?
                        <Link
                            className='text-primary ml-[5px] font-semibold'
                            to={`${ROUTES.LOGIN}`}
                        >
                            Đăng nhập
                        </Link>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
