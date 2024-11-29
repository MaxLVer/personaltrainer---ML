import './App.css'
import CustomerList from './components/CustomerList';
import {Typography, Toolbar, AppBar, CssBaseline, Container} from '@mui/material';

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
      <CustomerList/>
      <CssBaseline />
    </Container>
  );
}

export default App