import { Navbar as BootstrapNavbar,Nav,Form,FormControl,Button } from "react-bootstrap";

const Navbar = () => {
    return ( 
        <>
         <BootstrapNavbar bg="dark" variant="dark" fluid>
    <BootstrapNavbar.Brand href="#home">Event Finder</BootstrapNavbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Events</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </BootstrapNavbar>
        </>
     );
}
 
export default Navbar;