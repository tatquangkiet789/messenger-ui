import { FC } from 'react';
import tickIcon from '@src/assets/icons/tick.svg';
import Lottie from 'lottie-react';
import { calling } from '@src/assets';

const CallPending: FC = () => {
    return (
        <div className={`flex-1 bg-transparent flex flex-col items-center justify-center`}>
            <div className='w-40 h-40 flex items-center justify-center rounded-full'>
                <Lottie
                    autoPlay={true}
                    loop={true}
                    animationData={calling}
                    className='rounded-full h-full w-full'
                />
                <div
                    className={`w-24 h-24 bg-center bg-no-repeat bg-cover rounded-full absolute`}
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dnwauajh9/image/upload/v1694517283/tevwwt4xh3cggt1zh0ao.jpg')`,
                    }}
                ></div>
            </div>
            <div className='my-3 flex items-center gap-2'>
                <h3 className='font-semibold text-xl '>Raiden Shogun</h3>
                <img src={tickIcon} />
            </div>
            <p>Đang gọi...</p>
        </div>
    );
};

export default CallPending;
