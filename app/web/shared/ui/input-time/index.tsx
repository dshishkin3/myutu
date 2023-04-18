import React, { FC, HTMLAttributes } from 'react';
import { TextField } from '../text-field';

export const InputTime: FC<{ label: string; type: string } & HTMLAttributes<HTMLInputElement>> = ({ type, ...props }) => {
    return (
        <div>
            <label>От</label>
            <TextField  {...props} />
        </div>
    );
};