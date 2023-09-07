import { FC, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import AppRoutes from './routes/AppRoutes';

const App: FC = () => {
    return (
        <Fragment>
            <AppRoutes />
            <ToastContainer position='bottom-right' autoClose={2000} />
        </Fragment>
    );
};

export default App;
