import { table } from "console";
import { useEffect, useState } from "react";
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
function DataGrid() {
    //se crea una interface para describir los datos que se van a recibir
    interface User {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        status: boolean;
    }
    const column = [
        {
            title: "Nombre",
            fiel: "firstName",
        },
        {
            title: "apellido",
            fiel: "lastName",
        },
        {
            title: "email",
            fiel: "email",
        },
    ];
    //se crea un componente de función que renderice los datos recibidos de la API.
    const [users, setUsers] = useState<User[]>([]);
    const [modalInsertar, setModalInsertar] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(
                "https://api.fake-rest.refine.dev/users"
            );
            const post = await response.json();
            setUsers(post);
        };
        fetchPost();
    }, []);

    function mostrarModalInsertar() {
        setModalInsertar(true);
    }
    function insertar() {
        const inputNombre = document.querySelector(
            'input[name="nombre"]'
        ) as HTMLInputElement; // asegurarse de que el tipo sea HTMLInputElement
        const nombre = inputNombre.value;
        let newUser: User = {
            firstName: nombre,
            lastName: "apellido",
            email: "email",
            id: users.length + 1,
            status: true,
        };
        setUsers([...users, newUser]);
        setModalInsertar(false);
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
                            name="nombre"
                            type="text"
                            //onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Apellido:</label>
                        <input
                            className="form-control"
                            name="apellido"
                            type="text"
                            //onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Email:</label>
                        <input
                            className="form-control"
                            name="email"
                            type="text"
                            //onChange={this.handleChange}
                        />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="primary"
                        //onClick={insertar}
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
