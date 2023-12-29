import { MAX_INPUT_LENGTH } from '@src/constants/constants';
import { memo } from 'react';

type InputTypes = 'text' | 'email' | 'password' | 'number' | 'file';

/* eslint-disable @typescript-eslint/no-explicit-any */
type InputProps = {
    name: string;
    label?: string;
    value: any;
    inputType: InputTypes;
    placeholder?: string;
    error?: string;
    onChangeValue: (value: any) => void;
};

const Input = memo(function Input({
    name,
    label,
    value,
    inputType,
    placeholder,
    error,
    onChangeValue,
}: InputProps) {
    return (
        <div className='flex-1 flex flex-col'>
            {label ? <label className='text-xs mb-[5px] font-semibold'>{label}</label> : null}
            <input
                id={name}
                name={name}
                type={inputType}
                className={`caret-primary text-base flex-1 border-2 
                border-gray012 bg-gray006 p-3`}
                placeholder={placeholder}
                value={value}
                onChange={onChangeValue}
                maxLength={MAX_INPUT_LENGTH}
            />
            {error ? (
                <span className='text-xs text-red-500 font-semibold mb-[9px] mt-1'>{error}</span>
            ) : null}
        </div>
    );
});

export default Input;
