import { table } from "console";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";

type handleInputChange=ChangeEvent<HTMLInputElement>//definiendo el evento

function DataGrid() {
    //se crea una interface para describir los datos que se van a recibir
    interface User {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        status: boolean;
    }
    
    //se crea un componente de función que renderice los datos recibidos de la API.
    const [users, setUsers] = useState<User[]>([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [user, setUser] = useState({
        id: users.length + 1,
        firstName: "",
        lastName: "",
        email: "",
        status: false,
    })

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(
                "https://api.fake-rest.refine.dev/users"
            );
            const data = await response.json();
            setUsers(data);
        };
        fetchPost();
    }, []);

   const mostrarModalInsertar=()=> {
        setModalInsertar(true);
    }
   
    
    const handleChange = (e: handleInputChange)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    
    const insert=()=>{
        setUsers([...users, user])
        console.log(user)
        setModalInsertar(false)
    }
    return (
        <>
            <div className="container">
                <h1>lista de programadores</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter((user) => user.status === true)
                            .map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className="btn btn-danger">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <button
                    className="btn btn-primary"
                    onClick={mostrarModalInsertar}
                >
                    {" "}
                    Agregar Nuevo
                </button>
            </div>

            <Modal isOpen={modalInsertar}>
                <ModalHeader>
                    <div>
                        <h3>Insertar Usuario</h3>
                    </div>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <label>Id:</label>

                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={users.length + 1}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Nombre:</label>
                        <input
                            className="form-control"
                            name="firstName"
                            type="text"
                            value={user.firstName}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Apellido:</label>
                        <input
                            className="form-control"
                            name="lastName"
                            type="text"
                            value={user.lastName}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Email:</label>
                        <input
                            className="form-control"
                            name="email"
                            type="text"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Activo: </label>
                        <input
                            className="form-check-input"
                            name="status"
                            type="checkbox"
                            value={user.status ? 'true' : 'false'}
                            //onChange={this.handleChange}
                        />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={insert}
                    >
                        Insertar
                    </Button>
                    <Button className="btn btn-danger">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DataGrid;
