import TimelyGreeting from '../Miscellaneous/Greeting';
import { Link } from 'react-router-dom';
import "./NavBar.css";

export default function Home() {
    return(
      <>
      <TimelyGreeting />
      <nav>
      <h4>Find what you are looking for in the links below</h4>
      <Link className="nav-link" to={"/customer"}>Customers</Link>
      <Link className="nav-link"  to={"/training"}>Training</Link>
    </nav>
      </>
    );
  }