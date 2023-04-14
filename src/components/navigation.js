import './navigation.css'
import { Link, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';

const Nav = () =>{
    const nav = useNavigate()
    const [user, setUser] = useState('user', null)

   useEffect(()=>{
    let user = JSON.parse(localStorage.getItem('user'))
    if(!user){
        setUser(null)
    }else{
        setUser(user)
    }
   },[nav])

   let logout = async () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null);
    nav('/login')

   }

    return(
      <nav className="navbar navbar-expand-lg navbar-light  extraColor" >
          <div className='container'>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item"> <Link className="nav-link btn btn-primary joinNavClass" to="/post/addPost">Add Post</Link></li>
            </ul>
          </div>
          </div>
        </nav>
    )
}


export default Nav;
