import { Link, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Businesses from "./pages/Businesses";
import CreateReview from "./pages/CreateReview";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleBusiness from "./pages/SingleBusiness";
import SingleUsers from "./pages/SingleUsers";
import BusinessRating from "./pages/BusinessesRating";
import Reviews from "./pages/Reviews";
// import StarRating from "./src/components/Rating/StarRating";

import { useFetch, useAuth } from './hooks'; 

function App() {
  const { auth, token, authAction, logout } = useAuth(); 
  const { data: businesses, error: businessError, loading: businessLoading } = useFetch('/api/business', []); // Use fetch hook for businesses
  const { data: users, error: userError, loading: userLoading } = useFetch('/api/users', []); // Use fetch hook for users

  return (
    <>
      <header>
        <h1>Acme Business Reviews</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/businesses">Businesses ({businesses.length})</Link>
          <Link to="/users">Users ({users.length})</Link>
        
          {auth.id ? (
            <>
              <Link to="/createReview">Create Review</Link>
              <button onClick={logout}>Logout {auth.username}</button>
            </>
          ) : (
            <Link to="/login">Login/Register</Link>
          )}
        </nav>
      </header>

      {businessError && <p>Error loading businesses: {businessError}</p>}
      {userError && <p>Error loading users: {userError}</p>}

      {businessLoading && <p>Loading businesses...</p>}
      {userLoading && <p>Loading users...</p>}

      {/* Application Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              authAction={authAction}
              auth={auth}
              businesses={businesses}
              users={users}
            />
          }
        />
        <Route
          path="/businesses"
          element={<Businesses businesses={businesses} token={token} />}
        />
        <Route
          path="/users"
          element={<Users users={users} token={token} />}
        />
        {auth.id && (
          <Route
            path="/createReview"
            element={<CreateReview token={token} businesses={businesses} />}
          />
        )}
        {auth.id && (
          <Route
            path="/reviews"
            element={<CreateReview token={token} businesses={businesses} />}
          />
        )}
        <Route
          path="/login"
          element={<Login authAction={authAction} auth={auth} token={token} />}
        />
        <Route
          path="/register"
          element={<Register authAction={authAction} auth={auth} />}
        />
        <Route
          path="/business/:id"
          element={<SingleBusiness token={token} />}
        />
        <Route
          path="/users/:id"
          element={<SingleUsers token={token} />}
        />
      </Routes>
    </>
  );
}

export default App;