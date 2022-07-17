import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from '../firebase'
import AddTask from '../AddTask'
import { Navigate } from 'react-router-dom'
import '../taskManager.css'
import Task from '../Task'




export default function CompDash() {
    const [loggedOut, setLoggedOut] = useState(!sessionStorage.getItem('accessToken'))
    const [openAddModal, setOpenAddModal] = useState(false)
    const [tasks, setTasks] = useState([])

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
        return <Navigate to="/CompLogin" />
    }


    return (
        <>

            <Navbar bg="black" variant="dark">

                <Container>
                    <img src={process.env.PUBLIC_URL + "/QC.jpeg"} width="100" alt="" />
                    <Navbar.Brand >Queens College Tech Incubator Company Task Manager</Navbar.Brand>
                    <Nav className="text-right">

                        <Button variant="danger" onClick={handleLogOut}>Log Out</Button>

                    </Nav>
                </Container>
            </Navbar>
            <div className='taskManager__container'>
                <button
                    onClick={() => setOpenAddModal(true)}>
                    Add task +
                </button>
                <div className='taskManager__tasks'>

                    {tasks.map((task) => (
                        <Task
                            id={task.id}
                            key={task.id}
                            completed={task.data.completed}
                            title={task.data.title}
                            description={task.data.description}
                        />
                    ))}


                </div>
            </div>

            {openAddModal &&
                <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
            }





        </>




    )
}
