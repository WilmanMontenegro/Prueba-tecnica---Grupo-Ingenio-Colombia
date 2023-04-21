import { ChangeEvent, useEffect,useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import "./styles/dataGrid.css"
type handleInputChange = ChangeEvent<HTMLInputElement>; //definiendo el evento
interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status: boolean;
}
const initialUserState: User = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    status: false,
}; //definiendo el estado inicial
function DataGrid() {
    //se crea una interface para describir los datos que se van a recibir

    //se crea un componente de función que renderice los datos recibidos de la API.
    const [users, setUsers] = useState<User[]>([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [user, setUser] = useState<User>(initialUserState);
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(
                "https://api.fake-rest.refine.dev/users"
            );
            const data = await response.json();
            setUsers(data);
            //setUser({ ...user, id: data.length + 1 });
            setUser((prevUser) => ({ ...prevUser, id: data.length + 1 }));
        };
        fetchPost();
    }, []);
    const mostrarModalInsertar = () => {
        setModalInsertar(true);
    };
    const cerrarModalInsertar = () => {
        setModalInsertar(false);
    };

    const handleChange = (e: handleInputChange) => {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const handleCheckChange = (e: handleInputChange) => {
        const { checked } = e.target;
        setIsChecked(checked);
        setUser({ ...user, status: checked });
    };
    const insert = () => {
        console.log(user);
        setUsers([...users, user]);
        setModalInsertar(false);
    };
    const deleteUser = (id: number) => {
        var opcion = window.confirm("¿Está seguro que desea eliminar el usuario con id: " + id + "?");
        if (opcion === true) {
            const newUsers = users.filter((user) => user.id !== id);
            setUsers(newUsers);
        }
    };
    return (
        <>
            <div className="container">
                <h1 className="text-center">LISTA DE USUARIOS</h1>
                <table className="table ">
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
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-primary"
                        onClick={mostrarModalInsertar}
                    >
                        Agregar Nuevo
                    </button>
                </div>
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
                            checked={isChecked}
                            onChange={handleCheckChange}
                        />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={insert}>
                        Insertar
                    </Button>
                    <Button
                        className="btn btn-danger"
                        onClick={cerrarModalInsertar}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DataGrid;
