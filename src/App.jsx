import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen bg-blue-900 text-white w-full">
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div className="min-h-screen bg-blue-900 text-white w-full">
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div className="min-h-screen bg-blue-900 text-white w-full">
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
]);

function App() {
  return (
    <div className="min-h-screen bg-blue-900 w-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
