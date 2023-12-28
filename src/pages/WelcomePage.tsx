import Slider from '@src/components/Slider';

export default function WelcomePage() {
    return (
        <div className='bg-white flex-1 rounded-lg shadow-lg flex flex-col justify-center items-center'>
            <p className='text-xl leading-6 font-normal mb-4'>
                Chào mừng đến với <span className='font-medium'>Messenger UI</span>
            </p>
            <p className='text-sm font-normal leading-6 break-keep w-[415px] text-center mb-[50px]'>
                Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được
                tối ưu hoá cho máy tính của bạn.
            </p>
            <Slider />
        </div>
    );
}
