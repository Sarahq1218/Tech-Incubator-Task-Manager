import React, { useState } from 'react'
import { Form, Card, Alert, Container } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'


export default function Login() {
    const [loginEmail, setLoginEmail] = useState(null)
    const [loginPassword, setLoginPassword] = useState("")
    const [error, setError] = useState('')
    const [loggedIn, setLoggedIn] = useState(!!sessionStorage.getItem('accessToken'))




    const Login = async (e) => {
        e.preventDefault();

        try {
            const response = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)

            sessionStorage.setItem('accessToken', response.user.accessToken)
            setLoggedIn(true)

        } catch {
            setError('Failed to log in')
        };
    }

    if (loggedIn && sessionStorage.getItem('accessToken')) {
        return <Navigate to="/CompDash" />
    }



    return (
        <>
            <Container className="d-flex align-items-center
    justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: '400px' }}>

                    <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                        <Card.Body>
                            <h2 className='text-center mb-4'>Log In</h2>

                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={Login}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" onChange={(event) => {
                                        setLoginEmail(event.target.value)
                                    }} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={(event) => {
                                        setLoginPassword(event.target.value)
                                    }} required />
                                </Form.Group>

                                <button type="submit" className="btn btn-primary btn-sm w-100 mt-2" onClick={Login} >Log In</button>


                            </Form>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        Need an account? <Link to="/CompSignUp">Sign Up</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}
