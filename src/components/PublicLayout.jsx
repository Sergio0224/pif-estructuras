import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useUserData from "../hooks/useUserData"

const PublicLayout = () => {

    const { isUserEmpty } = useUserData();

    return (
        (isUserEmpty === false)
            ?
            <Navigate to="/home" />
            :
            <Outlet />
    )
}

export default PublicLayout