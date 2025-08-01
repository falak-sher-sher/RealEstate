import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/about'
import Profile from './pages/profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'


function App() {

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-In' element={<SignIn/>} />
        <Route path='/sign-Up' element={<SignUp/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/listing/:listingId' element={<Listing/>} />
        <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>} />
        <Route path='/create-listing/:id' element={<CreateListing/>} />
        <Route path='/update-listing/:id' element={<UpdateListing/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
