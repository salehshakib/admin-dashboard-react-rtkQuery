import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";

function App() {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
