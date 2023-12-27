import { memo } from 'react';
import { CallerDetail } from '../../constants/videoConstant';
import Lottie from 'lottie-react';
import { callingIcon } from '@src/assets';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@src/constants/routes';
import { MdCallEnd } from '@src/components/icons';

type ReceivedCallProps = {
    callerDetail: CallerDetail;
    // onDeclineCall: () => void;
};

const ReceivedCall = memo(function ReceivedCall({ callerDetail }: ReceivedCallProps) {
    const { name, avatar } = callerDetail;
    const navigate = useNavigate();

    const handleAnswerCall = () => {
        return navigate(ROUTES.VIDEO_CALL);
    };

    const handleDeclineCall = () => {
        // onDeclineCall();
        console.log('Todo decline call');
    };

    return (
        <div className={`flex flex-col items-center justify-center gap-3`}>
            <div
                className={`w-20 h-20 bg-center bg-no-repeat bg-cover rounded-full mt-4`}
                style={{
                    backgroundImage: `url(${avatar})`,
                }}
            ></div>
            <p>
                <span className={`font-semibold mr-1`}>{name}</span>
                đang gọi cho bạn
            </p>
            <div className={`flex items-center justify-center gap-6`}>
                <Lottie
                    animationData={callingIcon}
                    autoPlay
                    loop
                    onClick={handleAnswerCall}
                    className={`h-24 w-24 cursor-pointer`}
                />
                <span
                    className='flex items-center p-2 rounded-full cursor-pointer
                    bg-red-500 hover:bg-red-600'
                    onClick={handleDeclineCall}
                >
                    <MdCallEnd size={24} className='text-white' />
                </span>
            </div>
        </div>
    );
});

export default ReceivedCall;
