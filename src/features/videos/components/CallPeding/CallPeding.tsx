import { FC } from 'react';
import tickIcon from '@src/assets/icons/tick.svg';
import Lottie from 'lottie-react';
import { calling } from '@src/assets';

type CallPedingProps = {
    name: string;
    avatar: string;
};

const CallPending: FC<CallPedingProps> = ({ name, avatar }) => {
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
                        backgroundImage: `url(${avatar})`,
                    }}
                ></div>
            </div>
            <div className='my-3 flex items-center gap-2'>
                <h3 className='font-semibold text-xl '>{name}</h3>
                <img className='ml-2' src={tickIcon} />
            </div>
        </div>
    );
};

export default CallPending;
