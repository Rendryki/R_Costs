import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Projects from './components/pages/Projects';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import Container from './components/layout/Container';
import NewProject from './components/pages/NewProject';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Project from './components/pages/Project';

function App(){ // main page configs and assets function
  // return pages links and redirections through react routes
  return ( 
    <Router>
      <Navbar/>
        <Container customClass="min_height">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/projects" element={<Projects />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/company" element={<Company />}/>
            <Route path="/newproject" element={<NewProject />}/>
            <Route path="/project/:id" element={<Project />}/>
          </Routes>
        </Container>
        <Footer/>
    </Router>
  );
}

export default App;