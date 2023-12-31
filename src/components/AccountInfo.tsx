import { tickIcon } from '@src/assets';
import { memo } from 'react';
import { Link } from 'react-router-dom';

type AccountInfoProps = {
    firstName: string;
    lastName: string;
    username: string;
    isVerified: boolean;
    avatar: string;
    postCreatedDate: Date;
};

const AccountInfo = memo(function AccountInfo({
    firstName,
    lastName,
    avatar,
    isVerified,
    username,
    postCreatedDate,
}: AccountInfoProps) {
    return (
        <div className={`flex justify-start items-center w-full bg-white_1`}>
            <div
                className={`w-14 h-14 rounded-full bg-center bg-cover bg-no-repeat`}
                style={{ backgroundImage: `url(${avatar})` }}
            ></div>
            <div className={`flex flex-col flex-1 pl-4`}>
                <Link
                    to={`/${username}`}
                    className={`flex items-center text-lg font-bold [&_svg]:ml-[3px] hover:opacity-70`}
                >
                    {lastName} {firstName}
                    {isVerified ? <img className='ml-2' src={tickIcon} /> : null}
                </Link>
                <span className={`text-sm font-normal text-gray075`}>{postCreatedDate}</span>
            </div>
        </div>
    );
});

export default AccountInfo;
