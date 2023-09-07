import { FC, Fragment } from 'react';
import { IFriend } from '../../models/friend';
import FriendItem from '../FriendItem/FriendItem';

interface IFriendListProps {
    friendList: IFriend[];
    loading: boolean;
    error: string;
    // hasNextPage: boolean;
    // onChangePage: (page: any) => void;
}

const FriendList: FC<IFriendListProps> = ({ friendList, loading, error }) => {
    // const [element, setElement] = useState<HTMLDivElement | null>(null);
    // const observer = useRef(
    //     new IntersectionObserver(
    //         (entries) => {
    //             const first = entries[0];
    //             if (first.isIntersecting) onChangePage((prev: any) => prev + 1);
    //         },
    //         {
    //             threshold: 1,
    //         },
    //     ),
    // );

    // useEffect(() => {
    //     const currentElement = element;
    //     const currentObserver = observer.current;

    //     if (!currentElement) return;

    //     currentObserver.observe(currentElement);

    //     if (!hasNextPage) currentObserver.unobserve(currentElement);

    //     return () => currentObserver.unobserve(currentElement);
    // }, [element, hasNextPage]);

    return (
        <div className='flex flex-col'>
            {friendList.length === 0 && loading ? (
                <p>Đang tải danh sách bạn bè</p>
            ) : friendList.length === 0 ? (
                <p>Không tìm thấy danh sách bạn vè</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Fragment>
                    {friendList.map(
                        ({ avatar, firstName, lastName, id, lastestMessage, tick }) => (
                            <FriendItem
                                key={id}
                                avatar={avatar}
                                userId={id}
                                fullname={`${lastName} ${firstName}`}
                                lastestMessage={lastestMessage}
                                tick={tick}
                            />
                        ),
                    )}
                    {/* <div ref={setElement} className='w-full h-[10px] bg-red-100'></div> */}
                </Fragment>
            )}
        </div>
    );
};

export default FriendList;
