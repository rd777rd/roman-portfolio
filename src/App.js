import './App.css';
import {Navbar} from './Components/Navbar/navbar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { ShopContextProvider} from './Context/ShopContext';
import { Home } from './Pages/Home/home';
import { About } from './Pages/About/about';
import { Portfolio } from './Pages/Projects/portfolio';
import { Skills } from './Pages/Skills/skills';
import { ProjectDetails } from './Pages/Projects/project';
function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/projects" element={<Portfolio/>} />
            <Route path="/skills" element={<Skills/>} />
            <Route path="project/:projectId" element={<ProjectDetails/>}/>
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
