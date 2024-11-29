import './App.css'
import {Typography, Toolbar, AppBar, CssBaseline, Container} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import "./NavBar.css";

function App() {

  return (
    <Container maxWidth="x1">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Personal Trainer
          </Typography>  
        </Toolbar>
      </AppBar>
      <nav>
      <Link className="nav-link" to={"/"}>Homepage</Link>
      <Link className="nav-link" to={"/customer"}>Customers</Link>
      <Link className="nav-link"  to={"/training"}>Training</Link>
    </nav>
    <Outlet />
      <CssBaseline />
    </Container>
  );
}

export default App