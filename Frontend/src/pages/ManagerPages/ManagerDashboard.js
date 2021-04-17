import React from "react";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StoreIcon from "@material-ui/icons/Store";
import TrainIcon from "@material-ui/icons/Train";
import ManagerReports from "./ManagerReports";
import ManagerRides from "./ManagerRides";
import ManagerAttractions from "./ManagerAttractions";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ManagerAddRide from "./ManagerAddRide";
import ManagerInfoRide from "./ManagerInfoRide";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

export default function ManagerDashboard() {
  const classes = useStyles();
  let history = useHistory();
  let { url, path } = useRouteMatch();

  const logout = () => {
    localStorage.clear();
    setTimeout(1000, history.push("/"));
  };
  console.log(path);

  const options = [
    { text: "Reports", url: `${url}`, icon: <AssessmentIcon /> },
    { text: "Rides", url: `${url}/rides`, icon: <TrainIcon /> },
    { text: "Attractions", url: `${url}/attractions`, icon: <StoreIcon /> },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {localStorage.getItem("user_name")}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {options.map((item, index) => (
              <Link to={item.url} key={item.index} className={classes.link}>
                <ListItem>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem onClick={logout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route path={`${path}`} component={ManagerReports} exact />
          <Route path={`${path}/rides`} component={ManagerRides} exact />
          <Route path={`${path}/rides/add-ride`} component={ManagerAddRide} />
          <Route
            path={`${path}/rides/info-ride/:id`}
            component={ManagerInfoRide}
          />
          <Route path={`${path}/attractions`} component={ManagerAttractions} />
        </Switch>
      </main>
    </div>
  );
}
