// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
// core components/views for Admin layout
import DashboardPage from "../src/components/material-ui/views/Dashboard/Dashboard.jsx";
import TableList from "../src/components/material-ui/views/TableList/TableList.jsx";
import Typography from "../src/components/material-ui/views/Typography/Typography.jsx";
import Icons from "../src/components/material-ui/views/Icons/Icons.jsx";
import Maps from "../src/components/material-ui/views/Maps/Maps.jsx";
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Overview",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Billing",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Request Services",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Support",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
];

export default dashboardRoutes;
