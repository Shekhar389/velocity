import { useEffect, useState } from "react";
import { baseUrl } from "../../../axios/baseUrl.js";

const UserTable = ({ users, setUsers }) => {

    const fetchUsers = async () => {
        const res = await baseUrl.get(`/users`);
        setUsers(res.data);
    }

    const changeRole = async (id) => {
        await baseUrl.put(`/users/${id}`);
        await fetchUsers();
    }

    const deleteUser = async (id) => {
        await baseUrl.delete(`/users/${id}`);
        await fetchUsers();
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <main>

            <div className="px-12">
                <table className="table table-zebra table-lg">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user._id}>
                                    <td>
                                        {user._id}
                                    </td>
                                    <td>
                                        {user.username}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.roleAdmin ? "Admin" : "User"}
                                    </td>
                                    <td>
                                        {
                                            !(user.email === "admin@gmail.com" && user.username === "admin")
                                            &&
                                            <button onClick={() => changeRole(user._id)} className="btn btn-outline btn-primary btn-sm">
                                                Change Role
                                            </button>
                                        }
                                    </td>
                                    {
                                        user.roleAdmin ? (
                                            <>
                                                <td></td>
                                            </>
                                        ) : (
                                            <>
                                                <td>
                                                    <button onClick={() => deleteUser(user._id)}
                                                        className="btn btn-outline btn-error btn-sm">Delete
                                                    </button>
                                                </td>
                                            </>
                                        )
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* <Pagination/> */}

        </main>
    )
}

export default UserTable;
