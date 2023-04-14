import './App.css';
import Navigation from './components/navigation';
import Home from './components/homepageContent';
import AddBlog from './components/post/addPost'

import { Routes, Route} from 'react-router-dom';



function App() {

  return (
      <div className="App">
          <Navigation/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/post/addPost" element={<AddBlog/>}/>
            </Routes>
      </div>
  );
}

export default App;
