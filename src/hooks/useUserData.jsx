import { useContext } from 'react'
import { UserDataContext } from '../contexts/UserData'

const useUserData = () => {
    return useContext(UserDataContext)
}

export default useUserData