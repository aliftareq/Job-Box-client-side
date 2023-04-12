import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./Firebase/firebase.config";
import { useDispatch } from "react-redux";
import { setUser, toggleLoading } from "./Features/auth/authslice";
import { Toaster } from "react-hot-toast";

function App() {
  // console.log(process.env);
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user?.email))
      }
      else {
        dispatch(toggleLoading())
      }
    })
  }, [])
  return (
    <div>
      <Toaster />
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
