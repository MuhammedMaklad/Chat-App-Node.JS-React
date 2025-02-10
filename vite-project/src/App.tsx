import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/index";
function App() {
  return (
    <>
      <main>
        {/* <Heading> Hello </Heading> */}
        <RouterProvider router={router}></RouterProvider>
      </main>
    </>
  );
}

export default App;
