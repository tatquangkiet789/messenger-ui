import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import AppRoutes from './routes/AppRoutes';

const App: FC = () => {
    return (
        <BrowserRouter>
            <AppRoutes />
            <ToastContainer position='top-left' autoClose={2000} />
        </BrowserRouter>
    );
};

export default App;
