import React, {useContext} from 'react'
import { UserContext, TokenContext } from '../App';
import useFetch from '../customHooks/useFetch';
import {useParams} from 'react-router-dom'
import DefaultAvatar from '../../assets/default-avatar.jpg'
import Profile404 from './Profile404';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import ProfileFriends from './ProfileInfo/ProfileFriends/ProfileFriends'
import ProfileMap from './ProfileMap/ProfileMap'
import ProfileHeader from './ProfileHeader'

function ProfilePage() {
    const {id} = useParams()

    const {user} = useContext(UserContext) //only for conditional rendering! 
    const {data:userFromServer, error:userFSError, refresh:refreshUserFS, setRefresh:setRefreshUserFS} = useFetch(`http://localhost:3000/user/${id}`) //for displaying profile info!
    const {data:userMarkers} = useFetch(`http://localhost:3000/markers/user/${id}`)

    const [isFriends, setIsFriends] = React.useState(false)

    React.useEffect(() => {
        setIsFriends(userFromServer?.friends.some(friend => friend._id === user._id))
    }, [user._id, userFromServer])

    const { token } = useContext(TokenContext);

    //if user cannot be found
    if(userFSError){
        return <Profile404/>
    }

    const setDefaultImg = (e) => {
        e.target.src = DefaultAvatar
    }

    return (
        <article className="flex-grow flex flex-col items-center font-semibold">
        {userFromServer && 
         <>
           <ProfileHeader 
              userFromServer = {userFromServer} 
              setDefaultImg = {setDefaultImg}
              />
           <div className = "w-full flex flex-col lg:flex-row gap-5 p-4">
             <ProfileInfo 
                userFromServer = {userFromServer} 
                user = {user}
                token = {token}
                refreshUserFS = {refreshUserFS}
                setRefreshUserFS = {setRefreshUserFS}
                />
             <ProfileFriends userFromServer = {userFromServer} setDefaultImg = {setDefaultImg}/>
           </div> 

           {/* profile map stuff, csak akkor látható ha friendek! */}
           {user._id === userFromServer._id || isFriends ? 
            <ProfileMap/> : 
            <div>To see {userFromServer.username}'s places you have to be friends</div>
           }
         </>
        }
        </article> 
    )
}

export default ProfilePage
 