import { onlineChat, videoCall, welcome } from '@src/assets';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from '@src/components/icons';
import Lottie from 'lottie-react';
import { FC, useEffect, useRef, useState } from 'react';

interface ISildeItem {
    id: number;
    image: any;
    title: string;
    des: string;
}

const Slider: FC = () => {
    const intervalRef = useRef(null) as any;
    const [activeIndex, setActiveIndex] = useState(0);
    const items: ISildeItem[] = [
        {
            id: 0,
            image: welcome,
            title: 'Nhắn tin nhiều hơn, soạn thảo ít hơn',
            des: 'Lưu trữ sẵn các tin nhắn thường dùng và gửi nhanh trong hội thoại bất kỳ',
        },
        {
            id: 1,
            image: onlineChat,
            title: 'Giải quyết công việc hiểu quả đến 40%',
            des: 'Với Messenger UI',
        },
        {
            id: 2,
            image: videoCall,
            title: 'Gọi và làm việc hiểu quả với Messenger Call',
            des: 'Trao đổi công việc mọi lúc mọi nơi',
        },
    ];

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
        }, 8000);

        return () => clearInterval(intervalRef.current);
    }, [items.length]);

    const resetInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
        }, 8000);
    };

    const handleNextSlide = () => {
        setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
        resetInterval();
    };

    const handlePreviousSlide = () => {
        setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
        resetInterval();
    };

    return (
        <div className='w-full flex flex-col justify-center items-center relative'>
            <button className='absolute left-8' onClick={handlePreviousSlide}>
                <MdKeyboardArrowLeft size={50} className='fill-primary' />
            </button>
            <button className='absolute right-8' onClick={handleNextSlide}>
                <MdKeyboardArrowRight size={50} className='fill-primary' />
            </button>
            <div className='w-[380px] h-[228px] overflow-x-hidden'>
                <div
                    className={`h-full flex ease-out duration-500`}
                    style={{
                        transform: `translateX(${-(activeIndex * 380)}px)`,
                        width: `${items.length * 380}px`,
                    }}
                >
                    {items.map(({ id }, index) => (
                        <Lottie
                            key={id}
                            animationData={items[index].image}
                            autoPlay={true}
                            loop={true}
                            className='f-full w-full'
                        />
                    ))}
                </div>
            </div>
            <p className='text-sm font-medium leading-6 text-primary text-center mt-5 mb-[10px] mx-0'>
                {items[activeIndex].title}
            </p>
            <p className='text-center'>{items[activeIndex].des}</p>
            <div className='mt-[30px] mb-[10px] flex items-center justify-center gap-3'>
                {items.map(({ id }) => (
                    <div
                        onClick={() => setActiveIndex(id)}
                        key={id}
                        className={`p-1 rounded-full cursor-pointer ${
                            id === activeIndex ? 'bg-primary' : 'bg-gray006'
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Slider;
