
import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getPremiumUser } from "../../redux/actions/actions";
import { RootState, useAppDispatch } from "../../redux/store";
import EventModal from "./EventModal";
import "../../Css/top.css"
const Top = () => {
    const user=useSelector((state:RootState)=>state.user.user)
    const dispatch = useAppDispatch();

    const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [showAlert, setShowAlert] = useState(false);
  
  const handleAlertClose = () => {
    setShowAlert(false);
  }

  const handleBuyPremium = () => {
    dispatch(getPremiumUser())
    setShowAlert(true);
  }
  useEffect(() => {
    if (showAlert) {
      // Hide the alert after 4 seconds
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 4000)}})
    return ( <div className="top-container my-5">
    <h1 className="top-h1">Welcome To Event Finder</h1>
    <h4 className="top-desc mt-5">
      Find events you are interested in or create your own!
    </h4>
    <div className="d-flex justify-content-center mt-5">
    {user?.Premium===true?<Button onClick={handleShow2} className="top-event-premium-button">Add Event</Button>:
        <Button onClick={()=>dispatch(()=>handleBuyPremium())}  className="top-event-premium-button" >Buy Premium</Button>
        }
        <EventModal handleClose2={handleClose2} show2={show2}/>    
    </div>
    {showAlert && (
        <Alert variant="success" onClose={handleAlertClose} dismissible>
          You have successfully purchased premium!
        </Alert>
      )}

    </div> );
}
 
export default Top;