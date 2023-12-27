import HeadlessTippy from '@tippyjs/react/headless';
import useDebounce from 'hooks/useDebounce';
import { useState } from 'react';
// import { AxiosError } from 'axios';
import Wrapper from 'components/Wrapper';
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters, CiSearch } from '../icons';
// import AccountItem from 'components/ui/AccoutItem/AccountItem';
// import { findAllUsersByKeywordService } from 'features/users/services/userService';
// import { IUser } from 'features/users/models/userModel';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);

    // useEffect(() => {
    //     if (debouncedValue.trim() === '') {
    //         setSearchResult([]);
    //         return;
    //     }

    //     const findAllUsersByKeyword = async () => {
    //         try {
    //             setIsLoading(true);
    //             const data = await findAllUsersByKeywordService(debouncedValue);

    //             setSearchResult(data.content);
    //             setIsLoading(false);
    //             setIsShow(true);
    //         } catch (error) {
    //             const err = error as AxiosError;
    //             if (err.response) toast.error((err.response.data as any).message);
    //             else toast.error(err.message);
    //             return Promise.reject();
    //         }
    //     };

    //     findAllUsersByKeyword();
    // }, [debouncedValue]);

    const handleCloseSearchWrapper = () => {
        setIsShow(false);
    };

    const handleClearSearchValue = () => {
        setIsShow(false);
        setSearchValue('');
    };

    return (
        <HeadlessTippy
            interactive
            visible={searchResult && isShow ? true : false}
            onClickOutside={handleCloseSearchWrapper}
            render={(attrs) => (
                <div
                    tabIndex={-1}
                    {...attrs}
                    className='w-[361px] bg-white_1 rounded-[10px] shadow-md'
                >
                    <Wrapper>
                        <h4 className='py-[5px] px-3 text-sm font-semibold text-gray05'>
                            Tài khoản
                        </h4>
                        {/* {searchResult.map(
                            ({ id, firstName, lastName, avatar, username, tick }) => (
                                <AccountItem
                                    key={id}
                                    firstName={firstName}
                                    lastName={lastName}
                                    avatar={avatar}
                                    username={username}
                                    tick={tick}
                                    size='md'
                                />
                            ),
                        )} */}
                    </Wrapper>
                </div>
            )}
        >
            <div className='flex items-center w-[361px] h-[46px] bg-gray241_241_242_1 border border-transparent focus-within:border-gray03 rounded-full'>
                <input
                    className='flex-1 bg-transparent caret-primary text-base rounded-l-[92px] pl-5 pr-3 placeholder:text-gray06 focus:outline-none'
                    type='text'
                    placeholder='Tìm kiếm tài khoản'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {searchValue && isLoading !== true ? (
                    <span onClick={handleClearSearchValue}>
                        <AiOutlineCloseCircle size={16} />
                    </span>
                ) : null}
                {isLoading ? (
                    <span className='mx-3 animate-spin flex items-center'>
                        <AiOutlineLoading3Quarters size={16} />
                    </span>
                ) : null}
                <span className='h-7 w-[1px] bg-gray012'></span>
                <span
                    className={`py-3 pr-3 pl-4 round-r-[92px] hover:bg-gray003 hover:cursor-pointer 
                    flex items-center justify-center hover:rounded-r-[92px]`}
                >
                    <CiSearch size={24} />
                </span>
            </div>
        </HeadlessTippy>
    );
};

export default Search;
