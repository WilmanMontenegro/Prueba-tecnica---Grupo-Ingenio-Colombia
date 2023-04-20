import { table } from "console";
import { useEffect, useState } from "react";

function Table() {
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
            fiel: "fisrtName",
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

    return (
        <div>
            <h1>lista de programadores</h1>
            hola babys
        </div>
    );
}

export default Table;
