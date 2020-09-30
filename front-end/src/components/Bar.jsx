import React from "react";
import "./Bar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

function Bar(props) {
  return (
    <Navbar className="nav" expand="md">
      <Navbar.Brand href="/">To-Do List</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link onClick={() => props.addList()}>New</Nav.Link>
          {props.lists.length !== 0 && (
            <NavDropdown alignRight title="Lists" className="nav-dropdown">
              {props.lists.map((list) => {
                return (
                  <NavDropdown.Item key={list._id} href={`/lists/${list._id}`}>
                    {list.title}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Bar;
