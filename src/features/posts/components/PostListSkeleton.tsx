const PostListSkeleton = () => {
    return (
        <>
            {Array(5)
                .fill(5)
                .map((_, index) => (
                    <div key={index} className={`flex flex-col items-center`}>
                        <div
                            key={index}
                            className={`w-full max-w-[600px] bg-white_1 shadow-md rounded-lg mb-6`}
                        >
                            <div className={`py-3 px-4 items-center justify-between`}>
                                <div
                                    className={`flex justify-start items-center w-full bg-white_1`}
                                >
                                    <div
                                        className={`w-14 h-14 rounded-full bg-[#dddbdd] animate-skeleton`}
                                    ></div>
                                    <div className={`flex flex-col flex-1 pl-4 gap-2`}>
                                        <div
                                            className={`h-[14px] bg-[#dddbdd] animate-skeleton`}
                                        ></div>
                                        <div
                                            className={`h-[14px] bg-[#dddbdd] animate-skeleton`}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`mx-4 bg-[#dddbdd] my-2 h-4 animate-skeleton`}
                            ></div>
                            <div
                                className={`w-[600px] h-[600px] pt-3 bg-[#dddbdd] animate-skeleton`}
                            ></div>
                            <div
                                className={`my-4 mx-3 bg-[#dddbdd] h-4 animate-skeleton`}
                            ></div>

                            <div
                                className={`px-4 pt-[6px] pb-3 flex items-center justify-end gap-2`}
                            >
                                <div
                                    className={`p-2 h-7 w-7 bg-[#dddbdd] animate-skeleton`}
                                ></div>
                                <div
                                    className={`p-2 h-7 w-7 bg-[#dddbdd] animate-skeleton`}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default PostListSkeleton;
