import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';

// Main dashboard lists
export const MainListItems = ( props ) => {
  return (<div>
    <ListItem
     button
     onClick={props.handleSortType("none")}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </div>
);
}

// Saved reports list
export const SecondaryListItems = (props) => {
  return (
    <div> 
      <ListSubheader inset>Saved reports</ListSubheader>
      <ListItem 
        button
        onClick={ props.handleSortType("genderSort")}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Scores by gender" />
      </ListItem>
      <ListItem
       button
       onClick={ props.handleSortType("countrySort")}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Scores by country" />
      </ListItem>
    </div>
  )
};
