import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type ButtonVariants = 'primary' | 'outlined' | 'default';
type ButtonSizes = 'md' | 'lg' | 'sm';
type ButtonTypes = 'button' | 'submit';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IButtonProps {
    variant: ButtonVariants;
    text: string;
    loading?: boolean;
    size: ButtonSizes;
    type?: ButtonTypes;
    to?: string;
    iconLeft?: any;
    iconRight?: any;
    disabled?: boolean;
    onClick?: () => void;
}

const Button: FC<IButtonProps> = ({
    variant,
    text,
    loading,
    size,
    type,
    to,
    iconLeft,
    iconRight,
    disabled,
    onClick,
}) => {
    let Element: any = 'button';
    let btnClass: string = '';
    const props = {
        onClick,
        to,
        type,
        disabled,
    };

    if (variant === 'primary') btnClass = 'primary-btn';
    if (variant === 'outlined') btnClass = 'outlined-btn';
    if (variant === 'default') btnClass = 'default-btn';

    if (size === 'lg') btnClass += ' ' + 'lg-btn';
    if (size === 'md') btnClass += ' ' + 'md-btn';
    if (size === 'sm') btnClass += ' ' + 'sm-btn';

    if (to) {
        props.to = to;
        Element = Link;
    }

    return (
        <Element className={`${btnClass}`} {...props}>
            {iconLeft ? (
                <span className='mr-[10px] flex items-center justify-center'>{iconLeft}</span>
            ) : null}
            {loading ? (
                <span className='flex items-center animate-spin'>
                    <AiOutlineLoading3Quarters size={22} />
                </span>
            ) : (
                <span className='text-base font-semibold leading-6'>{text}</span>
            )}
            {iconRight ? (
                <span className='ml-[10px] flex items-center justify-center'>{iconRight}</span>
            ) : null}
        </Element>
    );
};

export default Button;
