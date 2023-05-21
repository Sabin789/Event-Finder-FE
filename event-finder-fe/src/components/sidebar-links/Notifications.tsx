import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Button } from "react-bootstrap";
const Notifications = () => {
    const notifs=useSelector((state:RootState)=>state.user.user?.eventReqs)

    return ( <>
    {notifs && notifs.map(notif=>{
        <>
        <p>{notif.name}</p>
        <p>{notif.email}</p>
        <div>
            <Button>Accept</Button>
            <Button>Decline</Button>
        </div>

        </>
    })}
    </> );
}
 
export default Notifications;