import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Task from "../Task"
import { db, storage } from '../firebase'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { ref, uploadBytes } from 'firebase/storage'
import './DevDash.css'





export default function DevDash() {

    const [loggedOut, setLoggedOut] = useState(!sessionStorage.getItem('accessToken'))
    const [tasks, setTasks] = useState([])
    const [open, setOpen] = useState({ edit: false, view: false })


    /* function to get all tasks from firestore in realtime */
    useEffect(() => {
        const taskColRef = query(collection(db, 'tasks'), orderBy('created', 'desc'))
        onSnapshot(taskColRef, (snapshot) => {
            setTasks(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    function handleLogOut() {
        sessionStorage.removeItem('accessToken')

        setLoggedOut(true)
    }

    if (loggedOut && sessionStorage.getItem("accessToken") === null) {
        return <Navigate to="/login" />
    }

    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0]
        uploadFiles(file)
    };
    const uploadFiles = (file) => {
        //
        if (!file) return;
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytes(storageRef, file)
    }

    const handleClose = () => {
        setOpen({ edit: false, view: false })
    }


    return (
        <>
            <Navbar bg="black" variant="dark">

                <Container>
                    <img src={process.env.PUBLIC_URL + "/QC.jpeg"} width="100" alt="" />
                    <Navbar.Brand >Queens College Tech Incubator Developer Task Manager</Navbar.Brand>
                    <Nav className="text-right">

                        <Button variant="danger" onClick={handleLogOut}>Log Out</Button>

                    </Nav>
                </Container>
            </Navbar>
            <form className="DevForm" onSubmit={formHandler}>
                <label className="custom-file-upload">
                    <input type="file" className='input' />
                </label>
                <Button variant="danger" type='submit'>Upload Submissions</Button>
            </form>


            <div className='taskManager__container'>
                <div className='taskManager__tasks'>


                    {
                        tasks.map((task) => (
                            <Task
                                id={task.id}
                                key={task.id}
                                completed={task.data.completed}
                                title={task.data.title}
                                description={task.data.description}
                            />
                        ))
                    }


                </div>
            </div>
        </>
    )
}
