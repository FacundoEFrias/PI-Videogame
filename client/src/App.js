import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Landing from "./components/landing.jsx"
import Home from "./components/home.jsx"
import VideoDetail from './components/videoDetail.jsx';
import Formulario from './components/formulario';


function App() {
  return (
<div className='App'>
    <BrowserRouter >
    <div>
    <Routes>
     
      <Route exact path="/" element={<Landing />}/>
      <Route path="/home" element={<Home />} />
      <Route path='/home/:id' element= {<VideoDetail/>}/>
      <Route path = "/videogames" element= {<Formulario/>}/>
      
    </Routes>
   </div>
   </BrowserRouter>
   </div>

  );
}

export default App;
