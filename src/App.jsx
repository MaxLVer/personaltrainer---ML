import './App.css'
import { Container} from '@mui/material';
import { Outlet } from 'react-router-dom';
import MenuAppBar from './components/Miscellaneous/MenuAppBar';

function App() {

  return (
    <Container maxWidth="x1">
      <MenuAppBar />
      <Outlet />
    </Container>
  );
}

export default App