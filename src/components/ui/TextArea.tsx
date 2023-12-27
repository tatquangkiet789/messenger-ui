import cn from '@src/lib/clsx';
import { memo } from 'react';

type TextAreaProps = {
    name: string;
    value: any;
    placeholder?: string;
    onChangeValue: (value: any) => void;
    numberOfRow: number;
    numberOfCol: number;
};

const TextArea = memo(function TextArea({
    name,
    value,
    placeholder,
    onChangeValue,
}: TextAreaProps) {
    return (
        <div className={cn('w-full flex flex-col')}>
            <textarea
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                rows={7}
                className={cn(
                    'w-full rounded-md caret-primary p-3 text-base bg-gray006 border border-gray012 resize-none',
                )}
                onChange={onChangeValue}
            />
        </div>
    );
});

export default TextArea;
