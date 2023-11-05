import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import PostSidebar from '../components/PostSidebar/PostSidebar';

const PostLayout: FC = () => {
    return (
        <div className={`bg-gray248_248_248 overflow-y-auto`}>
            <Navbar />
            <div className={`lg:w-[1150px] w-full h-[calc(100vh-60px)] mx-auto flex`}>
                <PostSidebar />
                <Outlet />
            </div>
        </div>
    );
};

export default PostLayout;
