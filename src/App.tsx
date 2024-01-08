import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import SocketWrapper from './components/SocketWrapper';
import AppRoutes from './routes/AppRoutes';

const App = () => {
    return (
        <SocketWrapper>
            <BrowserRouter>
                <AppRoutes />
                <ToastContainer position='top-left' autoClose={2000} />
            </BrowserRouter>
        </SocketWrapper>
    );
};

export default App;
