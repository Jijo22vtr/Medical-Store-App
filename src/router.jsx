import { createBrowserRouter } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ListMedicine from "./medicine/ListMedicine";
import AddMedicine from "./medicine/AddMedicine";
import EditMedicine from "./medicine/EditMedicine";
import ViewMedicine from "./medicine/ViewMedicine";
import App from "./App";

const router = createBrowserRouter([

    { path:'register', element:<Register/>},
    { path:'login', element:<Login/>},
    { path:'/medicines', element:<ListMedicine/>},
    { path:'/medicines/add', element:<AddMedicine/>},
    { path:'/medicines/:medicineId/edit', element:<EditMedicine/>},
    { path:'/medicines/:medicineId/view', element:<ViewMedicine/>},
    { path:'', element:<App/>}

]);

export default router;