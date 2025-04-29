import { useUser } from "../../context/context"
import { StudentCalendar } from "./StudentCalendar"
import { TeacherCalendar } from "./TeacherCalendar"

export const MainCalendar = () => {

    const { user, loading,logout } = useUser()
    console.log(user)

  
    if (loading || !user || !user.role) {
        return (<div>
            <h1>no data</h1>
        </div>)
    }

    




    switch (user.role) {
    
        case "teacher":
            return <TeacherCalendar logout={logout} />
        case "student":
            return <StudentCalendar  logout={logout}/>
        default:
            return <StudentCalendar />
    }
   
}
