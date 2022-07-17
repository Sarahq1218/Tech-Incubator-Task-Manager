import React from 'react'
import "./StartUpPage.css"
import { Card, Container } from 'react-bootstrap'
import { Link } from "react-router-dom"


export default function StartUpPage() {
  return (
    <>
      <Container className="d-flex align-items-center
    justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card className="shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Body>
              <img src={process.env.PUBLIC_URL + "/TechIncubator.png"} width="192" alt="" />
              <h1 className='text-center mb-4'>Tech Incubator Task Manager</h1>
              <Link to="/CompSignUp">
                <button type="button" className="btn btn-danger">Company Manager</button>
              </Link>
              <Link to="/signup">
                <button type="button" className="btn btn-danger">Developer</button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  )
}
