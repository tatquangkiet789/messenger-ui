import { AiOutlineMessage } from '@src/components/icons';
import { ROUTES } from '@src/constants/routes';
import cn from '@src/lib/clsx';
import Tippy from '@tippyjs/react';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

type MessageIconProps = {
    totalUnreadMessages: number;
};

const MessageIcon = memo(function MessageIcon({ totalUnreadMessages }: MessageIconProps) {
    return (
        <Tippy content='Tin nhắn'>
            <NavLink
                data-count={totalUnreadMessages}
                to={ROUTES.MESSAGE}
                className={(nav) =>
                    cn(
                        'flex items-center p-2 rounded-lg hover:cursor-pointer relative hover:bg-gray006',
                        {
                            '[&_svg]:fill-primary': nav.isActive,
                            'before:content-[attr(data-count)] before:bg-red-500 before:absolute before:top-0 before:right-0 before:w-5 before:h-5 before:flex before:items-center before:justify-center before:rounded-full before:text-white':
                                totalUnreadMessages > 0,
                        },
                    )
                }
            >
                <AiOutlineMessage size={25} />
            </NavLink>
        </Tippy>
    );
});

export default MessageIcon;
