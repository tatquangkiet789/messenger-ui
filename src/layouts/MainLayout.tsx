import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='bg-gray248_248_248 overflow-y-scroll overflow-x-hidden'>
            <Navbar />
            <div className='flex w-[1150px] p-[18px] gap-[18px] h-[calc(100vh-60px)] mx-auto mt-[60px]'>
                <Sidebar />
                <div className='h-[cal(100vh-60px)] ml-[358px] flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
