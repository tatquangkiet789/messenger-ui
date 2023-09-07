import HomePage from 'pages/HomePage/HomePage';
import { FC } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import WelcomePage from '@src/pages/WelcomePage/WelcomePage';
import { useAppSelector } from '@src/hooks/useAppSelector';

const MainLayout: FC = () => {
    const { receiver } = useAppSelector((state) => state.friends);

    return (
        <div className='bg-gray248_248_248'>
            <Navbar />
            <div className='flex p-[18px] w-full gap-[18px] h-[calc(100vh-60px)] bg-gray241_241_242_1'>
                <Sidebar />
                {receiver ? <HomePage /> : <WelcomePage />}
            </div>
        </div>
    );
};

export default MainLayout;
