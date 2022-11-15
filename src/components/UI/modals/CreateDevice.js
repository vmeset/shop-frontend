import { observer } from 'mobx-react-lite';
import React, {useState, useContext} from 'react';
import { Context } from '../../..';
import { createDevice, fetchDevices } from '../../../http/deviceAPI';
import MyInput from '../MyInput';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button, Box, FormGroup, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CreateDevice = observer( ({show, onHide, addNew}) => {

    const {device} = useContext(Context)
    const [label, setLabel] = useState('')
    const [selectedBrand, setSelectedBrand] = useState({name: ''})
    const [selectedType, setSelectedType] = useState({name: ''})
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        try {
            const formData = new FormData()
            formData.append('label', label)
            formData.append('price', `${price}`)
            formData.append('img', file)
            formData.append('brandId', selectedBrand._id)
            formData.append('typeId', selectedType._id)
            formData.append('info', info)
            if(!label || !`${price}` || !file || !selectedBrand._id || !selectedType._id) {
                alert("fill all fields required")
            } else {
                createDevice(formData).then(res => {
                    device.addDevice(res)
                    addNew({...res, id: res._id})
                    onHide()
                    setLabel('')
                    setSelectedBrand({name: ''})
                    setSelectedType({name: ''})
                    setPrice('')
                    setFile(null)
                })
            }
        } catch(e) {
            console.log(e)
        }
    }

    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.default', 
        color: 'text.primary',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const Input = styled('input')({
        display: 'none',
    });

    return (
        <Modal
            open={show}
            onClose={onHide}
        >
            <Box sx={style}
                component="form"
            >
                <Typography variant="h6" component="h2">
                    Add new Device
                </Typography>
                <FormGroup>
                    <InputLabel>Select type</InputLabel>
                    <Select
                        value={selectedType.name}
                        label="Type"
                        // onChange={e => setType(e.target.value)}
                        size='small'
                    >
                        {device.types.map(type => 
                            <MenuItem key={type._id} 
                                value={type.name}
                                onClick={() => {
                                    setSelectedType(type)
                                }}
                            >
                                {type.name}
                            </MenuItem>)
                        }
                    </Select>
                    <InputLabel>Select brand</InputLabel>
                    <Select
                        value={selectedBrand.name}
                        // onChange={e => setBrand(e.target.value)}
                        label="Brand"
                        size='small'
                    >
                        {device.brands.map(brand => 
                            <MenuItem key={brand._id}
                                value={brand.name}
                                onClick={() => {
                                    setSelectedBrand(brand)
                                }}
                            >
                                {brand.name}
                            </MenuItem>
                        )}
                    </Select>
                    <MyInput placeholder={"Enter label"} 
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        sx={{mt: 2, mb: 2}}
                    />
                    <MyInput placeholder={"Enter price"} 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        sx={{mb: 2}}
                    />
                    <Button
                        variant="outline-dark"
                        onClick={addInfo}
                        sx={{mb: 2}}
                    >
                        Add info
                    </Button>
                    {info.map(i => {
                        return <Box key={i.number} 
                                sx={{display: 'flex', alignItems: 'center', justifyContent: 'stretch'}}
                            >
                                <TextField 
                                    placeholder={"Введите название"}
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    fullWidth
                                    size='small'
                                />
                                <TextField 
                                    placeholder={"Введите описание"}
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    fullWidth
                                    size='small'
                                />
                                 <IconButton aria-label="delete"
                                    onClick={() => removeInfo(i.number)}
                                 >
                                    <DeleteIcon />
                                </IconButton>
                        </Box>
                    })}
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', mt: 1}}>
                        {file ? 
                            'file uploaded'
                            : <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" onChange={selectFile} />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        }
                        <Button variant="outline-danger" onClick={onHide}>Close</Button>
                        <Button variant="outline-success" onClick={addDevice}>Add</Button>
                    </Box>
                </FormGroup>
            </Box>
        </Modal>
    );
});

export default CreateDevice;