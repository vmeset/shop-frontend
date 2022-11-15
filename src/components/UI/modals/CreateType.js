import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import React, {useState, useContext} from 'react';
import { createType } from '../../../http/deviceAPI';
import MyInput from '../MyInput';
import { Context } from '../../..';

const CreateType = observer( ({show, onHide, addNew}) => {

    const [value, setValue] = useState("")
    const {device} = useContext(Context)

    const addType = () => {
        try {
            createType({name: value}).then(res => {
                device.addBrand(res)
                addNew({...res, id: res._id})
                setValue("")
                onHide()
            })
        } catch(e) {
            console.log(e)
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.default', 
        color: 'text.primary',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

    return (
        <Modal
            open={show}
            onClose={onHide}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add new type
                </Typography>
                <MyInput placeholder={"Enter type"} 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={() => addType(value)}>Add</Button>
            </Box>
        </Modal>
    );
});

export default CreateType;