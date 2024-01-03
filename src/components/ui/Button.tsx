import cn from 'lib/clsx';
import { memo } from 'react';
import { AiOutlineLoading3Quarters } from '@src/components/icons';
import { Link } from 'react-router-dom';

type ButtonVariants = 'primary' | 'outlined' | 'default' | 'base';
type ButtonSizes = 'md' | 'lg' | 'sm';
type ButtonTypes = 'button' | 'submit';

type ButtonProps = {
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
};

const Button = memo(function Button({
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
}: ButtonProps) {
    let Element: any = 'button';
    const props = {
        onClick,
        to,
        type,
        disabled,
    };
    if (to) {
        props.to = to;
        Element = Link;
    }

    return (
        <Element
            {...props}
            className={cn(
                'flex items-center justify-center hover:cursor-pointer disabled:hover:cursor-not-allowed',
                {
                    'bg-primary text-white_1 rounded font-extrabold hover:bg-primaryHover disabled:hover:bg-primary':
                        variant === 'primary',
                    'border border-primary text-primary font-semibold hover:bg-pinkHover rounded-sm disabled:hover:bg-white_1':
                        variant === 'outlined',
                    'border border-gray012 font-semibold hover:bg-gray003 rounded-sm disabled:hover:bg-white_1':
                        variant === 'default',
                    'text-primary disabled:text-gray05': variant === 'base',
                    'py-[6px] px-2 min-w-[100px]': size === 'md',
                    'w-full text-lg font-semibold py-4': size === 'lg',
                },
            )}
        >
            {iconLeft ? (
                <span className='flex justify-center items-center mr-[10px]'>{iconLeft}</span>
            ) : null}
            {iconRight ? (
                <span className='flex justify-center items-center ml-[10px]'>{iconRight}</span>
            ) : null}
            {loading ? (
                <span className='flex items-center animate-spin'>
                    <AiOutlineLoading3Quarters size={20} />
                </span>
            ) : (
                <span className='text-base font-semibold'>{text}</span>
            )}
        </Element>
    );
});

export default Button;
