import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Navbar as BootstrapNavbar } from "react-bootstrap";
import { BiLogIn } from 'react-icons/bi'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../Css/Navbar.css"
import { getCurrentUser} from "../redux/actions/actions";
import { RootState, useAppDispatch } from "../redux/store";
import AvatarEdit from "./Home/UserEdit";


const Navbar = () => {

const navigate=useNavigate()
  const user=useSelector((state:RootState)=>state.user.user)
  const dispatch=useAppDispatch()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getCurrentUser())
  }, []);

  const logOut = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      await axios
        .delete("http://localhost:3001/Users/me/session", { headers })
        .then((response) => {
          const { data } = response as AxiosResponse;
          console.log(data);
          localStorage.setItem("accessToken", data.accessToken);
          navigate("/");
        })
        .catch((err: Error | AxiosError) => {
          if (axios.isAxiosError(err)) {
            console.log(err.config);
            console.log(err.request);
            console.log(err.response);
          } else {
            console.log(err.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <BootstrapNavbar  variant="dark" className="fluid navbar-with-padding">
        <BootstrapNavbar.Brand href="home">Event Finder</BootstrapNavbar.Brand>
      
        <div className="user">
           <p style={{color:"white", marginTop:"1em"}}>{user?.name}</p>
          <img src={user?.avatar} 
          alt="Avatar" 
          onClick={()=>setShow(true)}
         />
          {/* <Button onClick={()=>logOut()}></Button> */}
          <BiLogIn 
          onClick={()=>logOut()}
          color={"white"}
          size={40}/>
        </div>
      </BootstrapNavbar>
      {user && (
            <AvatarEdit handleClose={handleClose} show={show} user={user} />
          )}
    </>
  );
};

export default Navbar;