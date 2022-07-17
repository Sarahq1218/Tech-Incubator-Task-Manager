import React, { useState } from 'react'
import { Form, Card, Alert, Container } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'


export default function Signup() {
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [error, setError] = useState('')
    const [registered, setRegistered] = useState(false)


    const register = async (e) => {
        e.preventDefault() //the default of forms is to refresh the page on submit
        //by putting e.preventDefault we are stopping it from doing so and to send the data to firebase

        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            setRegistered(true)
            console.log(user);
        } catch {

            setError('Failed to create an account')
        }
    }

    if (registered) {
        return <Navigate to="/login" />
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
                            <h2 className='text-center mb-4'>Sign Up</h2>

                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={register}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" onChange={(event) => {
                                        setRegisterEmail(event.target.value)
                                    }} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={(event) => {
                                        setRegisterPassword(event.target.value)
                                    }} required />
                                </Form.Group>

                                <button type="submit" className="btn btn-primary btn-sm w-100 mt-2" onClick={register}>Sign Up</button>

                            </Form>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}
