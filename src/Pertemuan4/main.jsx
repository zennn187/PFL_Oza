import { createRoot } from "react-dom/client";
import './tailwind.css';
import FrameworkList from "./FrameworkList";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import ResponsiveDesign from "./ResponsiveDesign";
import Dashboard from "../pertemuan-5/pages/Dashboard";

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <FrameworkListSearchFilter></FrameworkListSearchFilter> */}
            {/* <ResponsiveDesign></ResponsiveDesign> */}
             <Dashboard/>
        </div>
    )