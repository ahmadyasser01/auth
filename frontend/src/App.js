import './App.css';
import Container from '@mui/material/Container';
import NavBar from './components/NavBar';
import Login from './pages/Login';
function App() {
  return (
    <div className='main'>
      <Container maxWidth="sm" className='container'>
        {/* <NavBar/> */}
        <Login/>
      </Container>

    </div>
  );
}

export default App;
