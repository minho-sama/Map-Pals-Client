import React from 'react'
import {render,screen} from '@testing-library/react'
import Navbar from './Navbar'
import { BrowserRouter } from 'react-router-dom'

export const UserContext = React.createContext()
export const TokenContext = React.createContext()

const MockNavbar = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImJvb2ttYXJrcyI6W10sImltZ1VybCI6Imh0dHBzOi8vaS5pbWd1ci5jb20vV2R0TXBmbC5qcGciLCJmcmllbmRzIjpbXSwiZnJpZW5kUmVxdWVzdHMiOltdLCJfaWQiOiI2MTA3ZjA3ODA1MTAxMTJlZjA2YmI0ZGEiLCJ1c2VybmFtZSI6Im1pbmhvIiwicGFzc3dvcmQiOiIkMmIkMTAkc3JRUGdUNWR0UDJ5TkNEN2RDeTRBT0tXLkhtVnNYdWFWNHhoSDZpNTBvbC9wS05MZm8uSXkiLCJqb2luX2RhdGUiOiIyMDIxLTA4LTAyVDEzOjE3OjQ0LjEwNloiLCJfX3YiOjAsImpvaW5fZGF0ZV9mb3JtYXR0ZWQiOiJBdWcgMiwgMjAyMSIsImlkIjoiNjEwN2YwNzgwNTEwMTEyZWYwNmJiNGRhIn0sImlhdCI6MTYyODAwMDEzMSwiZXhwIjoxNjI4MDEwOTMxfQ.ijldPK1hbJz3WQasf-cDI8AkM04OCSnyuxvt9s0U81Q'
    const user = {
        bookmarks: [],
        friendRequests: [],
        friends: [],
        id: "6107f0780510112ef06bb4da",
        imgUrl: "https://i.imgur.com/WdtMpfl.jpg",
        join_date: "2021-08-02T13:17:44.106Z",
        join_date_formatted: "Aug 2, 2021",
        password: "$2b$10$srQPgT5dtP2yNCD7dCy4AOKW.HmVsXuaV4xhH6i50ol/pKNLfo.Iy",
        username: "minho",
        __v: 0,
        _id: "6107f0780510112ef06bb4da"
    }

    return(
     <BrowserRouter>
         <TokenContext.Provider value={token}>
             <UserContext.Provider value = {user}>
                 <Navbar/>
             </UserContext.Provider>
         </TokenContext.Provider>
     </BrowserRouter>
    )
}

test('renders profile page button', async () => {
    render(<MockNavbar/>)
    const profileBtn = await screen.findByText(/minho/i)
    expect(profileBtn).toBeInTheDocument()
})