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
    
    //lehet kell majd REFRESH USER => fetchelni user._id alapján a usert, mert mondjuk változott vmi (új markert hozzáadott)
    //vagy elég az, ha amikor fetch-csel postolok új adatot,utána a returned use robjectet setUser-elem?

    return {addUser, user, removeUser}
}

export default useUser