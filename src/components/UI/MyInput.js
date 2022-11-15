import { TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, {useState} from 'react';

const MyInput = observer( ({...props}) => {

    return (
        <TextField
            {...props}
            variant='standard'
            fullWidth
        />
    );
});

export default MyInput;