import React, {useState, useEffect, useContext} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { observer } from 'mobx-react-lite';
import CreateDevice from '../modals/CreateDevice';
import CreateType from '../modals/CreateType';
import CreateBrand from '../modals/CreateBrand';
import { Context } from '../../..';
import { deleteDevice, deleteBrand, deleteType } from '../../../http/deviceAPI';

const ItemList = observer( () => {

    const [cols, setCols] = useState([])
    const [rows, setRows] = useState([])
    const {device} = useContext(Context)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [selectionModel, setSelectionModel] = useState([])

    useEffect(() => {
        switch (device.category) {
            case 'brands':
                setCols(Object.keys(device.brands[0]))
                setRows(device.brands.map(item => {return {...item, id: item._id}}))
                break;
            case 'types':
                setCols(Object.keys(device.types[0]))
                setRows(device.types.map(item => {return {...item, id: item._id}}))
                break;
            case 'devices':
                setCols(Object.keys(device.devices[0]))
                setRows(device.devices.map(item => {return {...item, id: item._id}}))
                break;
            default:
                setCols([])
                setRows([])
                break;
        }
    }, [device.category])

    const columns = cols.filter(item => item !== '__v').map(item => {
        return {field: item, headerName: item, width: 150}
    })

    const setVisible = () => {
        switch (device.category) {
            case 'devices':
                setDeviceVisible(true)
                break;
            case 'brands':
                setBrandVisible(true)
                break;
            case 'types':
                setTypeVisible(true)
                break;
            default:
                alert('choose category')
                break;
        }
    }

    const addNew = (newItem) => {
        setRows([...rows, newItem])
    }

    const handleDeleteRow = () => {
        switch (device.category) {
            case 'devices':
                selectionModel.map(item => {
                    deleteDevice(item)
                    device.deleteDevice(item)
                })
                break;
            case 'brands':
                selectionModel.map(item => {
                    deleteBrand(item)
                    device.deleteBrand(item)
                })
                break;
            case 'types':
                selectionModel.map(item => {
                    deleteType(item)
                    device.deleteType(item)
                })
                break;
            default:
                alert('choose category')
                break;
        }
        let myArray = rows.filter(row => !selectionModel.find(element => (element === row._id )))
        setRows(myArray)
    }

    return (
        <Box sx={{ width: '100%', mt: 1 }}>
            <Stack direction="row" spacing={2}>
                <Button size="small" onClick={handleDeleteRow}>
                    Delete selected items
                </Button>
                <Button size="small" onClick={setVisible}>
                    Add new item
                </Button>
            </Stack>
            <Box sx={{ height: 400, mt: 1 }}>
                <DataGrid rows={rows} columns={columns} checkboxSelection
                    onSelectionModelChange={(newSelection) => {
                        setSelectionModel(newSelection)
                    }}
                    selectionModel={selectionModel}
                />
            </Box>
            <CreateType show={typeVisible} addNew={addNew} onHide={() => setTypeVisible(false)} />
            <CreateDevice show={deviceVisible} addNew={addNew} onHide={() => setDeviceVisible(false)} />
            <CreateBrand show={brandVisible} addNew={addNew} onHide={() => setBrandVisible(false)} />
        </Box>
    );
});

export default ItemList;