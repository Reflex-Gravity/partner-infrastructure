/* eslint-disable no-script-url */

import React, {useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { TableSortLabel, Input, Select, MenuItem } from '@material-ui/core';
import Utils from './utils/Utils'

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  searchBox: {
    paddingLeft : theme.spacing(1),
    marginBottom : theme.spacing(3),
    marginTop : theme.spacing(3),
  },
  input: {
    margin: theme.spacing(1),
  },
}));

function ScoreTable( props ) {
  const classes = useStyles();
  const [orderType, setOrderType] = React.useState('asc');
  const [orderField, setOrderField] = React.useState('');
  const [showMore, setShowMore] = React.useState(false);
  const [searchType, setSearchType] = React.useState('last_name');
  const [peopleData, setPeopleData] = React.useState([]);

  useEffect(() => {
    // If show more is clicked, then display all data.
    if (showMore === true) {
      setPeopleData(props.peopleData)

    }
  }, [showMore, props.peopleData]);

  useEffect(() => {
    // Initial mount/render show only 10 items.
    setPeopleData([...props.peopleData].splice(0, 10))
  }, [props.peopleData]);


  const sortData = (sortField ) => (evt) => {
    setOrderField(sortField);
    
    setOrderType( orderType == 'asc' ? 'desc' : 'asc');
    let sortedPeopleData = [...peopleData];

    // Sort the data based on field.
    sortedPeopleData.sort(( a, b)=>{
        
        if( b[sortField] < a[sortField] ){
          // If earlier sorting/order type was ascending then, order by descending, vice-versa.
          return orderType == 'asc' ? -1 : 1;
        }
        
        if( b[sortField] > a[sortField]){
          // If earlier sorting/order type was ascending then, order by descending, vice-versa.
          return orderType == 'asc' ? 1 : -1;
        }

      return 0;
    });

    setPeopleData(sortedPeopleData);
  };

  const searchData = (evt) => {
    // Filter the data based on search
    setPeopleData(Utils.filterArrayByString([...props.peopleData], searchType, evt.target.value))
  };

  const showMoreData = () =>{
    setShowMore(true);
  };

  const handleSearchTypeChange = (evt)=>{
    setSearchType(evt.target.value);
  };

  return (
    <React.Fragment>
      <Title>Scores listing</Title>
      <div className={classes.searchBox}>
        <Select
          value={searchType}
          onChange={handleSearchTypeChange}
        >
          <MenuItem value="last_name">Last Name</MenuItem>
          <MenuItem value="first_name">First Name</MenuItem>
          <MenuItem value="country">Country</MenuItem>
        </Select>
        <Input
          placeholder="Search listing..."
          className="searchField"
          onChange={searchData}
          inputProps={{
            'aria-label': 'Search the scores',
          }}
        />
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active = {orderField === "last_name"}
                direction={orderType}
                onClick={sortData( "last_name" )}
              >
                Last name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active = {orderField === "first_name"}
                direction={orderType}
                onClick={sortData( "first_name" )}
              >
                First name
              </TableSortLabel>
            </TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>City</TableCell>
            <TableCell>
              <TableSortLabel
                className="country-head"
                active = {orderField === "country"}
                direction={orderType}
                onClick={sortData( "country" )}
              >
                Country
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              Score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="scoreTableBody">
          {peopleData.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" onClick={showMoreData} href="#">
          See more scores
        </Link>
      </div>
    </React.Fragment>
  );
}

export default React.memo(ScoreTable)