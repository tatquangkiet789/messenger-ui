import { FC, Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const NoLayout: FC = () => {
    return (
        <Fragment>
            <Outlet />
        </Fragment>
    );
};

export default NoLayout;
