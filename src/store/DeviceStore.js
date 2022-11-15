import { ThermostatOutlined } from "@mui/icons-material"
import { makeAutoObservable } from "mobx"

export default class DeviceStore {
    constructor() {
        this._types = []
        this._selectedType = {}
        this._brands = []
        this._selectedBrand = {}
        this._devices = []
        this._order = []
        this._category = ''
        this._query = ''
        this._limit = 6
        this._page = 1
        this._totalCount = 0
        makeAutoObservable(this)
    }

    setLimit(limit) {
        this._limit = limit
    }
    get limit () {
        return this._limit
    }
    setPage(page) {
        this._page = page
    }
    get page () {
        return this._page
    }
    setTotalCount(total) {
        this._totalCount = total
    }
    get totalCount () {
        return this._totalCount
    }

    setTypes(types) {
        this._types = types
    }
    addType(type) {
        this._types.push(type)
    }
    deleteType(id) {
        this._types = this._types.filter(type => type._id !== id)
    }
    setSelectedType(type) {
        this._selectedType = type
    }
    get types() {
        return this._types
    }
    get selectedType () {
        return this._selectedType
    }

    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }
    setBrands(brands) {
        this._brands = brands
    }
    addBrand(brand) {
        this._brands.push(brand)
    }
    deleteBrand(id) {
        this._brands = this._brands.filter(brand => brand._id !== id)
    }
    get brands() {
        return this._brands
    }
    get selectedBrand() {
        return this._selectedBrand
    }

    setDevices(devices) {
        this._devices = devices
    }
    addDevice(device) {
        this._devices.push(device)
    }
    deleteDevice(id) {
        this._devices = this._devices.filter(device => device._id !== id)
    }
    get devices() {
        return this._devices
    }

    setCategory(category) {
        this._category = category
    }
    get category() {
        return this._category
    }

    setToOrder(device) {
        let quantity = 1;

        const indexInOrder = this._order.findIndex(
            (item) => item._id === device._id
        );

        if (indexInOrder > -1) {
            quantity = this._order[indexInOrder].quantity + 1;

            this._order = this._order.map((item) => {
                if (item._id !== device._id) return item

                return {
                    _id: item._id,
                    label: item.label,
                    price: item.price,
                    quantity,
                };
            })
        } else {
            this._order = [
                ...this._order,
                {
                    _id: device._id,
                    label: device.label,
                    price: device.price,
                    quantity,
                },
            ]
        }
    };
    
    lowQuantity(device) {
        let quantity = 1;
        const indexInOrder = this._order.findIndex(
            (item) => item._id === device._id
        );
        if (this._order[indexInOrder].quantity > 1) {
            quantity = this._order[indexInOrder].quantity - 1;

            this._order = this._order.map((item) => {
                if (item._id !== device._id) return item

                return {
                    _id: item._id,
                    label: item.label,
                    price: item.price,
                    quantity,
                };
            })
        } else {
            this._order = this._order.filter(item => item._id !== device._id)
        }
    }
    get order() {
        return this._order
    }

    setQuery(query) {
        this._query = query
    }
    get query() {
        return this._query
    }
}