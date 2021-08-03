import {render,screen} from '@testing-library/react'
import Footer from './Footer'

test('renders github link', () => {
    render(<Footer/>)
    const ghLink = screen.getByText(/minh/i)
    expect(ghLink).toBeInTheDocument()
})