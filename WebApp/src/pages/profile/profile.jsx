import { useUser } from "../../context/context"


import { Teacher } from "./teachers/teacher"
import { Admin } from "./admin/admin"
import { Student } from "./students/student"


export const Profile = () => {

    const { user, loading } = useUser()
    console.log(user)

    if (loading || !user || !user.role) {
        return <div>not login</div>
    }

    



    // Now render the appropriate navbar based on the user role
    switch (user.role) {
        case "admin":
            return <Admin />
        case "teacher":
            return <Teacher  />
        case "student":
            return <Student />
        default:
            return <div> no data</div>
    }
   
}
