import { Button } from "react-bootstrap";
import "./EmployeePage.css";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import UserService from "../../services/user/user.service";
import AuthService from "../../services/auth/auth.service";
import BusinessService from "../../services/business/business.service";
import cogoToast from "cogo-toast";

function EmployeePage() {
  const currLoggedUser = AuthService.getLoggedUser();
  const [show, setShow] = useState(false);
  const [employeesArray, setEmployeesArray] = useState([]);
  const [businessArray, setBusinessArray] = useState([]);
  const [username, setUsername] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    BusinessService.getBusinessesByUserId(
      currLoggedUser.id,
      currLoggedUser.token
    ).then((res) => {
      const resData = res.data;
      setBusinessArray(resData);
    });
  }, []);

  useEffect(() => {
    UserService.getEmployeesByOwnerId(
      currLoggedUser.id,
      currLoggedUser.token
    ).then((res) => {
      const resData = res.data;
      setEmployeesArray(resData);
    });
  }, []);

  const handleDeleteEmployee = (username) => {
    const reqBody = {
      userName: username,
    };
    UserService.removeEmployee(reqBody, currLoggedUser.token)
      .then((res) => {
        console.log(res);
        cogoToast.success(res.message);
        window.location.reload();
      })
      .catch((err) => {
        cogoToast.error(err.message);
      });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    let serviceId = document.querySelector(".businessList").value;
    console.log(serviceId);
    UserService.addEmployee(serviceId, currLoggedUser.token, {
      userName: username,
    })
      .then((res) => {
        cogoToast.success(res.message);
        window.location.reload();
      })
      .catch((err) => {
        cogoToast.error(err.message);
      });
  };

  return (
    <div className="employees-page-container">
      <div className="employee-page">
        <Button className="add-employee-btn" onClick={handleShow}>
          Add employee
        </Button>
        <Table striped bordered hover variant="primary">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Birthday</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {employeesArray.map((employee) => {
              return (
                <>
                  <tr key={employee.id}>
                    <td>{employee.username}</td>
                    <td>{employee.email}</td>
                    <td>{employee.userDetails.birthday}</td>
                    <td>
                      <Button
                        onClick={() => handleDeleteEmployee(employee.username)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new employee account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formService">
              <Form.Label>Business</Form.Label>
              <Form.Text className="text-muted">
                Choosing a business for which you want to add an employee.
              </Form.Text>

              {businessArray.map((business) => {
                return (
                  <>
                    <Form.Control
                      as="select"
                      controlid="businessListOptions"
                      className="businessList"
                    >
                      <option
                        key={business.serviceId}
                        value={business.serviceId}
                      >
                        {business.serviceName}
                      </option>
                    </Form.Control>
                  </>
                );
              })}
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter employee username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleAddEmployee(e)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EmployeePage;
