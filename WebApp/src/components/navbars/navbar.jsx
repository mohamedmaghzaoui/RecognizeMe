import { useUser } from "../../context/context"
import { AdminNavbar } from "./adminNavbar"
import { ClientNavbar } from "./clientNavbar"
import { StudentNavbar } from "./studentNavbar"
import { TeacherNavbar } from "./teacherNavbar"

export const Navbar = () => {

    const { user, loading,logout } = useUser()
    console.log(user)

    // If the user is still loading, you could show a loading spinner or a fallback UI.
    if (loading || !user || !user.role) {
        return <ClientNavbar/>
    }

    



    // Now render the appropriate navbar based on the user role
    switch (user.role) {
        case "admin":
            return <AdminNavbar logout={logout} />
        case "teacher":
            return <TeacherNavbar logout={logout} />
        case "student":
            return <StudentNavbar  logout={logout}/>
        default:
            return <ClientNavbar />
    }
   
}
