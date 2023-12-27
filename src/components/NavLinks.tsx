import { ROUTES } from '@src/constants/routes';
import cn from 'lib/clsx';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, IoVideocamOutline, LuUsers } from './icons';

const NavLinks = () => {
    const navLinkItems = [
        { to: `${ROUTES.HOME}`, text: 'Dành cho bạn', icon: <AiOutlineHome size={32} /> },
        {
            to: `${ROUTES.FRIEND}`,
            text: 'Bạn bè',
            icon: <LuUsers size={32} />,
        },
        {
            to: `${ROUTES.WATCH}`,
            text: 'Watch',
            icon: <IoVideocamOutline size={32} />,
        },
    ];

    return (
        <>
            {navLinkItems.map(({ to, text, icon }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={(nav) =>
                        cn(
                            'flex items-center p-2 w-full ease-in-out duration-200 hover:bg-gray003 hover:rounded-[5px]',
                            {
                                'text-primary [&_svg]:text-primary': nav.isActive,
                            },
                        )
                    }
                >
                    {icon}
                    <p className='ml-2 text-lg font-bold'>{text}</p>
                </NavLink>
            ))}
        </>
    );
};

export default NavLinks;
