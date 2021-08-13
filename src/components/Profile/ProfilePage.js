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
import FriendCard from './ProfileInfo/ProfileFriends/FriendCard'
import { FaMapMarked } from 'react-icons/fa';

function ProfilePage() {
    const {id} = useParams()

    const {user} = useContext(UserContext) //only for conditional rendering! 
    const {data:userFromServer, error:userFSError, refresh:refreshUserFS, setRefresh:setRefreshUserFS} = useFetch(`https://mappals.herokuapp.com/user/${id}`) //for displaying profile info!

    const [isFriends, setIsFriends] = React.useState(false)
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    React.useEffect(() => {
        setIsFriends(userFromServer?.friends.some(friend => friend._id === user._id))
    }, [user?._id, userFromServer])

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
             <ProfileFriends 
                userFromServer = {userFromServer} 
                setDefaultImg = {setDefaultImg}
                isModalOpen = {isModalOpen}
                setIsModalOpen = {setIsModalOpen}
                />
           </div> 

           {/* profile map and markers, csak akkor látható ha friendek! */}
           {user._id === userFromServer._id || isFriends ? 
            <ProfileMap
                userFromServer = {userFromServer}
                user = {user}/> : 
            <div className = "h-full w-full bg-berlin-map border-t-2 border-grray-300">
                <div className = "w-full h-full backdrop-filter backdrop-blur-sm flex flex-col items-center justify-center gap-2 text text-shadow-md">
                    <h1>To see {userFromServer.username}'s places you have to be Friends</h1>
                    <FaMapMarked className = "text-2xl"/> 
                </div>
            </div>
           }
           { //all friends popup
            isModalOpen && 
              <section 
                className = "absolute top-1/4 overlay-shadow bg-white max-h-80 overflow-scroll p-4 rounded-sm w-4/5 md:w-1/5" >
                {
                 userFromServer.friends.map((friend) => {
                     return <FriendCard key = {friend._id} 
                                        friend = {friend} 
                                        setDefaultImg = {setDefaultImg}
                                        setIsModalOpen = {setIsModalOpen}
                                        />
                 })
                }
                <button
                    className = "text-sm bg-fb-blue text-white px-2 py-1 rounded-sm float-right mr-4"
                    onClick = {() => setIsModalOpen(false)}>
                    close
                </button>
              </section>
          }
         </>
        }
        </article> 
    )
}

export default ProfilePage
 