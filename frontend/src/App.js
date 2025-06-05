import ContactForm from "./Components/ContactForm";
import ContactList from "./Components/ContactList";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UpdateContactForm from "./Components/UpdateContactForm";
import SignIn from "./Components/NewLogin/SignIn";
import SignUp from "./Components/NewLogin/SignUp";
import { useState } from "react";
import RefrshHandler from "./Components/RefrshHandler";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />
  }

  return (
    <>
      <Router>
        <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          {/* Default route redirects to login if not authenticated */}
          <Route path='/' element={<Navigate to={isAuthenticated ? "/ContactList" : "/login"} />} />

          {/* Protected Routes - Only accessible if authenticated */}
          <Route path='/ContactList' element={<PrivateRoute element={<ContactList />} />} />
          <Route path='/ContactForm' element={<PrivateRoute element={<ContactForm />} />} />
          <Route path='/UpdateContact' element={<PrivateRoute element={<UpdateContactForm />} />} />

          {/* Public Routes */}
          <Route path='/login' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
