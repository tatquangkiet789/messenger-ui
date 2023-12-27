import { memo } from 'react';

type AccountItemSkeletonProps = {
    size: number;
};

const AccountItemSkeleton = memo(function AccountItemSkeleton({
    size,
}: AccountItemSkeletonProps) {
    return (
        <>
            {Array(size)
                .fill(size)
                .map((_, index) => (
                    <div key={index} className='flex items-center py-2 pr-[6px] pl-2'>
                        <div className='w-9 h-9 rounded-full bg-[#dddbdd] animate-skeleton' />
                        <div className='flex-1 ml-3 flex flex-col gap-1'>
                            <p className='flex items-center h-[18px] bg-[#dddbdd] rounded-sm animate-skeleton'></p>
                            <p className='bg-[#dddbdd] rounded-sm h-4 animate-skeleton'></p>
                        </div>
                    </div>
                ))}
        </>
    );
});

export default AccountItemSkeleton;
