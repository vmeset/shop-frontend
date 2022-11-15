import { useMemo } from "react"

export const useDevices = (devices, query) => {

    const searchedDevices = useMemo(() => {
        return devices.filter(device => device.label.toLowerCase().includes(query.toLowerCase()))
    }, [query, devices])

    return searchedDevices
}