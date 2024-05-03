import UserTable from "./UserTable.jsx";
import UserDashboardNavbar from "./UserDashboardNavbar.jsx";
import Divider from "../../ui/Divider.jsx";
import { useState } from "react";

const UserDashboard = () => {

    const [users, setUsers] = useState([]);

    return (
        <main>
            <UserDashboardNavbar setUsers={setUsers} />
            <Divider />
            <UserTable users={users} setUsers={setUsers} />
        </main>
    )
}

export default UserDashboard;
