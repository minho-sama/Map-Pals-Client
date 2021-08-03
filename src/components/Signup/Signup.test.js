import { render, screen, fireEvent } from '@testing-library/react';
import Signup from "./Signup"

it('should render input element', () => {
    render(<Signup/>)
    const inputElement = screen.getByPlaceholderText(/Create Username/i);
    expect(inputElement).toBeInTheDocument();
});

it('should be able to type into input', () => {
    render(
        <Signup/>
    );
    const inputElement = screen.getByPlaceholderText(/Create Password/i);
    fireEvent.click(inputElement)
    fireEvent.change(inputElement, { target: { value: "myPassword123" } })
    expect(inputElement.value).toBe("myPassword123");
});

it('should render error messages if username is not long enough', () => {
    render(<Signup/>);
    const buttonElement = screen.getByRole("button", { name: /Sign Up/i});
    fireEvent.click(buttonElement)

    const inputElement = screen.getByPlaceholderText(/Create Username/i);
    fireEvent.change(inputElement, { target: { value: "ha" } })

    const usernameErrMsg = screen.getByTestId("errMsgUsernameLength")
    expect(usernameErrMsg).toBeInTheDocument()
});


it('should render error message when signup button is clicked', () => {
    render(<Signup/>);
    const buttonElement = screen.getByRole("button", { name: /Sign Up/i});
    fireEvent.click(buttonElement)

    const usernameErrMsg = screen.getByTestId("errMsgUsernameRequired")
    const passwordErrMsg = screen.getByTestId("errMsgPasswordRequired")

    expect(usernameErrMsg).toBeInTheDocument()
    expect(passwordErrMsg).toBeInTheDocument()
});