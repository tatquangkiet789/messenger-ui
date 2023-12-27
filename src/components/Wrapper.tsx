import { memo } from 'react';

type WrapperProps = {
    children: React.ReactNode;
};

const Wrapper = memo(function ({ children }: WrapperProps) {
    return (
        <div className='flex w-full flex-col overflow-y-auto bg-white_1'>{children}</div>
    );
});

export default Wrapper;
