import {useState} from 'react'

function useUser() {
    const getUser = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        return user
    }

    const [user, setUser] = useState(getUser())

    const addUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }

    const removeUser = () => {
        localStorage.removeItem('user')
        setUser(null)
    } 

    return {addUser, user, removeUser, setUser}
}

export default useUser