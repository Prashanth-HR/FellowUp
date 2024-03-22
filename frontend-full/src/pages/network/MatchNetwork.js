import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon
} from "@mui/icons-material";
import {
  Box, Checkbox, Grid, IconButton, TableCell, TableHead, TableRow, TableSortLabel,
  Toolbar
} from "@mui/material";
import Button from '@mui/material/Button';
import { lighten } from '@mui/material/styles';
import { makeStyles, useTheme } from '@mui/styles';
import cn from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Cell, Pie, PieChart, ResponsiveContainer, Tooltip
} from "recharts";
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";
// styles
import useStyles from "./styles";






const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" }
];


const TicketChartData = [
  { name: "Client 1", value: 2, color: "primary" },
  { name: "Client 2", value: 2, color: "primary" },
  { name: "Client 3", value: 2, color: "primary" },
  { name: "Client 4", value: 2, color: "primary" },
  { name: "Client 5", value: 2, color: "primary" },
  { name: "Client 6", value: 2, color: "primary" },
  { name: "Client 7", value: 2, color: "primary" },
  { name: "Client 8", value: 2, color: "primary" },
  { name: "Client 9", value: 2, color: "primary" },
  { name: "Client 10", value: 2, color: "primary" },
  { name: "Client 11", value: 2, color: "primary" },
  { name: "Client 12", value: 2, color: "primary" },
  { name: "Client 13", value: 2, color: "primary" },
  { name: "Client 14", value: 2, color: "primary" },
  { name: "Client 15", value: 2, color: "primary" },
  { name: "Client 16", value: 2, color: "primary" },
  { name: "Client 17", value: 2, color: "primary" },
  { name: "Client 18", value: 2, color: "primary" },
  { name: "Client 19", value: 2, color: "primary" },
  { name: "Client 20", value: 2, color: "primary" }
];

// Recent Orders

const rows = [
  {
    id: 1,
    orderId: Math.floor(Math.random(0) * 3000000),
    customer: "Victoria Cantrel",
    office: "Croatia",
    weight: "1.4 kg",
    price: 23.87,
    purDate: "12 Jan 2019",
    delDate: "-",
    status: "Pending",
    color: "primary"
  },
  {
    id: 2,
    orderId: Math.floor(Math.random(0) * 3000000),
    customer: "Cherokee Ware",
    office: "Belgium",
    weight: "0.8 kg",
    price: 987,
    purDate: "11 Jan 2019",
    delDate: "14 Jan 2019",
    status: "Delivered",
    color: "success"
  },
  {
    id: 3,
    orderId: Math.floor(Math.random(0) * 3000000),
    customer: "Constance Clayton",
    office: "Peru",
    weight: "105 kg",
    price: 1.876,
    purDate: "09 Jan 2019",
    delDate: "-",
    status: "Canceled",
    color: "secondary"
  },
  {
    id: 4,
    orderId: Math.floor(Math.random(0) * 3000000),
    customer: "Cherokee Ware",
    office: "Belgium",
    weight: "0.8 kg",
    price: 987,
    purDate: "11 Jan 2019",
    delDate: "14 Jan 2019",
    status: "Delivered",
    color: "success"
  },
  {
    id: 5,
    orderId: Math.floor(Math.random(0) * 3000000),
    customer: "Constance Clayton",
    office: "Peru",
    weight: "105 kg",
    price: 1.876,
    purDate: "06 Jan 2019",
    delDate: "19 Jan 2019",
    status: "In a process",
    color: "warning"
  },
  {
    id: 6,
    orderId: Math.floor(Math.random() * 3000000),
    customer: "Constance Clayton",
    office: "Peru",
    weight: "105 kg",
    price: 1.876,
    purDate: "06 Jan 2019",
    delDate: "19 Jan 2019",
    status: "In a process",
    color: "warning"
  }
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "Order ID"
  },
  { id: "customer", numeric: true, disablePadding: false, label: "Customer" },
  { id: "office", numeric: true, disablePadding: false, label: "Office" },
  { id: "weight", numeric: true, disablePadding: false, label: "Netto Weight" },
  { id: "price", numeric: true, disablePadding: false, label: "Price" },
  {
    id: "purchase-date",
    numeric: true,
    disablePadding: false,
    label: "Date of purchase"
  },
  {
    id: "delivery-date",
    numeric: true,
    disablePadding: false,
    label: "Date of Delivery"
  },
  { id: "status", numeric: true, disablePadding: false, label: "Status" },
  { id: "actions", numeric: true, disablePadding: false, label: "Actions" }
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ "aria-label": "select all rows" }}
            />
          </TableCell>
          {headCells.map(headCell => (
              <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "left" : "right"}
                  padding={headCell.disablePadding ? "none" : null}
                  sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={order}
                    onClick={createSortHandler(headCell.id)}
                    style={{
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      fontSize: "0.85rem",
                    }}
                >
                  <Typography uppercase color="text" variant={"body2"} colorBrightness="hint">{headCell.label}</Typography>
                  {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
          ))}
        </TableRow>
      </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  highlight:
      theme.palette.type === "light"
          ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
          : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
  title: {
    flex: "1 1 100%"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
      <Toolbar
        className={cn(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
          >
            {numSelected} selected
          </Typography>
        ) : (
            <Box display={"flex"} className={classes.title}>
              <Typography
                variant="h6"
                color="text"
                colorBrightness={"secondary"}
                id="tableTitle"
                style={{ display: "flex" }}
                block
              >
                Recent Orders
                <Box display="flex" alignSelf={"flex-end"} ml={1}>
                  <Typography
                    color="text"
                    colorBrightness={"hint"}
                    variant={"caption"}
                  >
                    1.340 total
                  </Typography>
                </Box>
              </Typography>
            </Box>
        )}

        {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
        ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
        )}
      </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

function MatchNetwork() {
  let classes = useStyles();
  let theme = useTheme();

  // local
  let [mainChartState, setMainChartState] = useState("monthly");

  // Recent Orders table

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("price");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [actionsButtonRefID, setActionsButtonRefID] =  React.useState(null);
  const [isActionsMenu, setActionsMenu] = React.useState(false)


  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const addFilter = () => {
  //   let newItem = {
  //     id: uniqueId(),
  //     fields: {
  //       filterValue: '',
  //       filterValueFrom: '',
  //       filterValueTo: '',
  //     },
  //   };
  //   newItem.fields.selectedField = filters[0].title;
  //   setFilterItems([...filterItems, newItem]);
  // };



  
  // const [isClicked, setIsClicked] = useState(false);
  // const [buttonText, setButtonText] = useState("Match!");
  
  // const initialButtonText = "Match!"; // Initial text for all buttons
  // const [buttonTexts, setButtonTexts] = useState(new Array(4).fill(initialButtonText));

  // const handleClick = (index) => {
  //   // Change text of only the clicked button by updating the state at the specific index
  //   setButtonTexts(buttonTexts.map((text, i) => i === index ? "Match!" : text));
  // };

  const CustomButton = ({ buttonName }) => {
    const [isClicked, setIsClicked] = useState(false);
    // const [iconIndex, setIconIndex] = useState(0); // Start with the first icon
  
    const handleClick = () => {
      setIsClicked(true); // Set the button as clicked
      // Set a new random icon index
      // setIconIndex(Math.floor(Math.random() * icons.length));
    };
  
    // Define styles based on the isClicked state
    const buttonStyles = {
      backgroundColor: isClicked ? 'green' : 'blue',
      color: isClicked ? 'white' : 'white'
    };
  
    return (
      <Button
        variant="outlined"
        style={buttonStyles}
        onClick={handleClick}
        // startIcon={icons[iconIndex]}
      >
        {buttonName}
      </Button>
    );
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const randomData = React.useMemo(() => getRandomData(10), []);

  const mainChartData = React.useMemo(() => {
    let resultArray = [];
    let tablet = getRandomData(31, 3500, 6500, 7500, 1000);
    let desktop = getRandomData(31, 1500, 7500, 7500, 1500);
    let mobile = getRandomData(31, 1500, 7500, 7500, 1500);

    for (let i = 0; i < tablet.length; i++) {
      resultArray.push({
        tablet: tablet[i].value,
        desktop: desktop[i].value,
        mobile: mobile[i].value
      });
    }

    return resultArray;
  }, [mainChartState]); // eslint-disable-line

  return (
    <Grid container spacing={3}>
      <Grid item lg={3} sm={6} xs={12}>
        <Widget
            title="EcoDyne"
            bodyClass={classes.fullHeightBody}
            className={classes.card}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Box display="flex">
                <Typography variant="h6" weight="medium">
                A software eco-tech startup that offers AI-enabled solutions to businesses for tracking, reducing and offsetifying their carbon footprint. 
                </Typography>
              </Box>
              <Typography
                    color="text"
                    variant={"caption"}
                    noWrap
                    style={{ alignSelf: "flex-end" }}
                >
                  <b>Industry: </b> Green Tech
                </Typography>
                <Typography
                    color="text"
                    variant={"caption"}
                    noWrap
                    style={{ alignSelf: "flex-end" }}
                >
                  <b>Model: </b> B2B
                </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex">
                <Typography variant="h6" weight="medium">
                Impact: Social | User
                </Typography>
              </Box>
            </Grid>
            <Grid
                item
                xs={6}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex"
                }}
            >
              <Typography
                  variant="caption"
                  weight={"medium"}
                  style={{ position: "absolute" }}
              >
                64%
              </Typography>
              <ResponsiveContainer width="100%" height={80}>
                <PieChart>
                  <Pie
                      data={TicketChartData}
                      startAngle={230}
                      endAngle={0}
                      paddingAngle={5}
                      innerRadius={30}
                      outerRadius={35}
                      dataKey="value"
                      style={{ border: 0, color:"green"}}
                  >
                    {TicketChartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill="green"
                            stroke={""}
                        />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Grid>
            <Grid
                item
                xs={6}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex"
                }}
            >
              
              {/* <Button
              variant="contained"
              sx={{
                backgroundColor: isClicked ? 'green' : 'blue',
                color: isClicked ? 'white' : 'white',
                // text: isClicked ? 'Match!' : 'Unmatch',
                '&:hover': { backgroundColor: isClicked ? 'darkgreen' : 'darkblue' }
              }}
                onClick={handleClick}
            
              >
                
                {buttonText}
              </Button>  */}
              <CustomButton 
              variant="contained" 
              buttonName="Match!" />
            </Grid>
            
          </Grid>
          {/* <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              wrap={"nowrap"}
          > */}
            {/* <Grid item>
              <Typography
                  color="text"
                  colorBrightness={"hint"}
                  variant={"caption"}
                  style={{ marginRight: 5 }}
                  noWrap
              >
                New Tickets
              </Typography>
              <Box display="flex" alignItems="center" justifyContent={"center"}>
                <Typography
                    size="md"
                    weight={"medium"}
                    style={{ marginRight: 8 }}
                >
                  45
                </Typography>
                <Dot color="success" />
              </Box>
            </Grid> */}
            {/* <Grid item>
              <Typography
                  color="text"
                  colorBrightness={"hint"}
                  variant={"caption"}
                  style={{ marginRight: 5 }}
              >
                Open
              </Typography>
              <Box display="flex" alignItems="center" justifyContent={"center"}>
                <Typography
                    size="md"
                    weight={"medium"}
                    style={{ marginRight: 8 }}
                >
                  147
                </Typography>
                <Dot color="warning" />
              </Box>
            </Grid>
            <Grid item>
              <Typography
                  color="text"
                  colorBrightness={"hint"}
                  variant={"caption"}
              >
                Completed
              </Typography>
              <Box display="flex" alignItems="center" justifyContent={"center"}>
                <Typography
                    size="md"
                    weight={"medium"}
                    style={{ marginRight: 8 }}
                >
                  351
                </Typography>
                <Dot color="primary" />
              </Box>
            </Grid> */}
          {/* </Grid> */}
        </Widget>
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
      <Widget
            title="FrescoFeast"
            bodyClass={classes.fullHeightBody}
            className={classes.card}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Box display="flex">
                <Typography variant="h6" weight="medium">
                An online platform that directly connects farmers and consumers offering fresh and organic produce at a competitive price. 
                </Typography>
              </Box>
              <Typography
                    color="text"
                    variant={"caption"}
                    noWrap
                    style={{ alignSelf: "flex-end" }}
                >
                  <b>Industry: </b> Agri Tech/Food
                </Typography>
                <Typography
                    color="text"
                    variant={"caption"}
                    noWrap
                    style={{ alignSelf: "flex-end" }}
                >
                  <b>Model: </b> B2B
                </Typography>
            </Grid>
            <Grid item xs={12}>
            <Box display="flex">
                <Typography variant="h6" weight="medium">
                </Typography>
              </Box>
              <Box display="flex">
                <Typography variant="h6" weight="medium">
                Impact: User
                </Typography>
              </Box>
            </Grid>
            <Grid
                item
                xs={6}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex"
                }}
            >
              <Typography
                  variant="caption"
                  weight={"medium"}
                  style={{ position: "absolute" }}
              >
                44%
              </Typography>
              <ResponsiveContainer width="100%" height={80}>
                <PieChart>
                  <Pie
                      data={TicketChartData}
                      startAngle={162}
                      endAngle={0}
                      paddingAngle={5}
                      innerRadius={30}
                      outerRadius={35}
                      dataKey="value"
                      style={{ border: 0 }}
                  >
                    {TicketChartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill="orange"
                            stroke={""}
                        />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Grid>
            <Grid
                item
                xs={6}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex"
                }}
            >
              {/* <Button
              variant="contained"
              sx={{
                backgroundColor: isClicked ? 'green' : 'blue',
                color: isClicked ? 'white' : 'white',
                // text: isClicked ? 'Match!' : 'Unmatch',
                '&:hover': { backgroundColor: isClicked ? 'darkgreen' : 'darkblue' }
              }}
                onClick={handleClick}
            
              >
                
                {buttonText}
              </Button>  */}
              <CustomButton buttonName="Match!" />
              {/* You can use more CustomButton instances here */}
            </Grid>
          </Grid>
          {/* <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              wrap={"nowrap"}
          >
            <Grid item>
              <Typography
                  color="text"
                  colorBrightness={"hint"}
                  variant={"caption"}
                  style={{ marginRight: 5 }}
                  noWrap
              >
                New Tickets
              </Typography>
              <Box display="flex" alignItems="center" justifyContent={"center"}>
                <Typography
                    size="md"
                    weight={"medium"}
                    style={{ marginRight: 8 }}
                >
                  45
                </Typography>
                <Dot color="success" />
              </Box>
            </Grid>
            <Grid item>
              <Typography
                  color="text"
                  colorBrightness={"hint"}
                  variant={"caption"}
                  style={{ marginRight: 5 }}
              >
                Open
              </Typography>
              <Box display="flex" alignItems="center" justifyContent={"center"}>
                <Typography
                    size="md"
                    weight={"medium"}
                    style={{ marginRight: 8 }}
                >
                  147
                </Typography>
                <Dot color="warning" />
              </Box>
            </Grid>
            <Grid item>
              <Typography
                  color="text"
                  colorBrightness={"hint"}
                  variant={"caption"}
              >
                Completed
              </Typography>
              <Box display="flex" alignItems="center" justifyContent={"center"}>
                <Typography
                    size="md"
                    weight={"medium"}
                    style={{ marginRight: 8 }}
                >
                  351
                </Typography>
                <Dot color="primary" />
              </Box>
            </Grid>
          </Grid> */}
        </Widget>
        {/* <Widget
            title="Revenue Breakdown"
            className={classes.card}
            bodyClass={classes.alignStandaloneElement}
        >
          <Grid container spacing={3}>
            <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 6
                }}
            >
              <Typography
                  variant={"caption"}
                  weight={"medium"}
                  style={{ position: "absolute" }}
              >
                1700
              </Typography>
              <ResponsiveContainer width="100%" height={144}>
                <PieChart>
                  <Pie
                      data={PieChartData}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                  >
                    {PieChartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={theme.palette[entry.color].main}
                            stroke={""}
                        />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.pieChartLegendWrapper}>
                {PieChartData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} style={{ marginRight: 5 }} />
                      <Typography
                          color="text"
                          colorBrightness={"hint"}
                          variant={"caption"}
                          noWrap
                      >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" weight={"medium"}>
                        &nbsp;{value}
                      </Typography>
                    </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Widget> */}
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
                <Widget
            title="AccuHealth"
            bodyClass={classes.fullHeightBody}
            className={classes.card}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Box display="flex">
                <Typography variant="h6" weight="medium">
                A healthcare tech company that provides accurate and instant diagnostic tools through AI and machine learning. 
                </Typography>
              </Box>
              <Typography
                    color="text"
                    variant={"caption"}
                    noWrap
                    style={{ alignSelf: "flex-end" }}
                >
                  <b>Industry: </b> Health Tech
                </Typography>
                <Typography
                    color="text"
                    variant={"caption"}
                    noWrap
                    style={{ alignSelf: "flex-end" }}
                >
                  <b>Model: </b> B2C
                </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex">
                <Typography variant="h6" weight="medium">
                Impact: Social
                </Typography>
              </Box>
            </Grid>
            <Grid
                item
                xs={6}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex"
                }}
            >
              <Typography
                  variant="caption"
                  weight={"medium"}
                  style={{ position: "absolute" }}
              >
                45%
              </Typography>
              <ResponsiveContainer width="100%" height={80}>
                <PieChart>
                  <Pie
                      data={TicketChartData}
                      startAngle={162}
                      endAngle={0}
                      paddingAngle={5}
                      innerRadius={30}
                      outerRadius={35}
                      dataKey="value"
                      style={{ border: 0 }}
                  >
                    {TicketChartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill="orange"
                            stroke={""}
                        />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Grid>
            <Grid
                item
                xs={6}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex"
                }}
            >
              {/* <Button
              variant="contained"
              sx={{
                backgroundColor: isClicked ? 'green' : 'blue',
                color: isClicked ? 'white' : 'white',
                // text: isClicked ? 'Match!' : 'Unmatch',
                '&:hover': { backgroundColor: isClicked ? 'darkgreen' : 'darkblue' }
              }}
                onClick={handleClick}
            
              >
                
                {buttonText}
              </Button>  */}
              <CustomButton buttonName="Match!" />
            </Grid>
          </Grid>
          {/* <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              wrap={"nowrap"}
          >
            <Grid item>
              <Typography
                  color="text"
                  colorBrightness={"hint"}
                  variant={"caption"}
                  style={{ marginRight: 5 }}
                  noWrap
              >
                New Tickets
              </Typography>
              <Box display="flex" alignItems="center" justifyContent={"center"}>
                <Typography
                    size="md"
                    weight={"medium"}
                    style={{ marginRight: 8 }}
                >
                  45
                </Typography>
                <Dot color="success" />
              </Box>
            </Grid>
            <Grid item>
              <Typography
                  color="text"
                  colorBrightness={"hint"}
                  variant={"caption"}
                  style={{ marginRight: 5 }}
              >
                Open
              </Typography>
              <Box display="flex" alignItems="center" justifyContent={"center"}>
                <Typography
                    size="md"
                    weight={"medium"}
                    style={{ marginRight: 8 }}
                >
                  147
                </Typography>
                <Dot color="warning" />
              </Box>
            </Grid>
            <Grid item>
              <Typography
                  color="text"
                  colorBrightness={"hint"}
                  variant={"caption"}
              >
                Completed
              </Typography>
              <Box display="flex" alignItems="center" justifyContent={"center"}>
                <Typography
                    size="md"
                    weight={"medium"}
                    style={{ marginRight: 8 }}
                >
                  351
                </Typography>
                <Dot color="primary" />
              </Box>
            </Grid>
          </Grid> */}
        </Widget>

      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
      <Widget
            title="TravelChapter"
            bodyClass={classes.fullHeightBody}
            className={classes.card}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Box display="flex">
                <Typography variant="h6" weight="medium">
                An online booking platform that offers exclusive, local and off-beat travel experiences for wanderlusters. 
                </Typography>
              </Box>
              <Typography
                    color="text"
                    variant={"caption"}
                    noWrap
                    style={{ alignSelf: "flex-end" }}
                >
                  <b>Industry: </b> Travel Tech
                </Typography>
                <Typography
                    color="text"
                    variant={"caption"}
                    noWrap
                    style={{ alignSelf: "flex-end" }}
                >
                  <b>Model: </b> B2B
                </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex">
                <Typography variant="h6" weight="medium">
                Impact: User
                </Typography>
              </Box>
            </Grid>
            <Grid
                item
                xs={6}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex"
                }}
            >
              <Typography
                  variant="caption"
                  weight={"medium"}
                  style={{ position: "absolute" }}
              >
                35%
              </Typography>
              <ResponsiveContainer width="100%" height={80}>
                <PieChart>
                  <Pie
                      data={TicketChartData}
                      startAngle={126}
                      endAngle={0}
                      paddingAngle={5}
                      innerRadius={30}
                      outerRadius={35}
                      dataKey="value"
                      style={{ border: 0 }}
                  >
                    {TicketChartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill="#8B8000"
                            stroke={""}
                        />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
            </Grid>
            <Grid
                item
                xs={6}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex"
                }}
            >
            {/* <Button
              sx={{
                backgroundColor: isClicked ? 'green' : 'blue',
                color: isClicked ? 'white' : 'white',
                // text: isClicked ? 'Match!' : 'Unmatch',
                '&:hover': { backgroundColor: isClicked ? 'darkgreen' : 'darkblue' }
              }}
                onClick={handleClick}
            
              >
                
                {buttonText}
              </Button>   */}
              <CustomButton buttonName="Match!" />
            </Grid>
          </Grid>
          {/* <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              wrap={"nowrap"}
          >
            <Grid item>
              <Typography
                  color="text"
                  colorBrightness={"hint"}
                  variant={"caption"}
                  style={{ marginRight: 5 }}
                  noWrap
              >
                New Tickets
              </Typography>
              <Box display="flex" alignItems="center" justifyContent={"center"}>
                <Typography
                    size="md"
                    weight={"medium"}
                    style={{ marginRight: 8 }}
                >
                  45
                </Typography>
                <Dot color="success" />
              </Box>
            </Grid>
            <Grid item>
              <Typography
                  color="text"
                  colorBrightness={"hint"}
                  variant={"caption"}
                  style={{ marginRight: 5 }}
              >
                Open
              </Typography>
              <Box display="flex" alignItems="center" justifyContent={"center"}>
                <Typography
                    size="md"
                    weight={"medium"}
                    style={{ marginRight: 8 }}
                >
                  147
                </Typography>
                <Dot color="warning" />
              </Box>
            </Grid>
            <Grid item>
              <Typography
                  color="text"
                  colorBrightness={"hint"}
                  variant={"caption"}
              >
                Completed
              </Typography>
              <Box display="flex" alignItems="center" justifyContent={"center"}>
                <Typography
                    size="md"
                    weight={"medium"}
                    style={{ marginRight: 8 }}
                >
                  351
                </Typography>
                <Dot color="primary" />
              </Box>
            </Grid>
          </Grid> */}
        </Widget>
        {/* <Widget
            title="Revenue Breakdown"
            className={classes.card}
            bodyClass={classes.alignStandaloneElement}
        >
          <Grid container spacing={3}>
            <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 6
                }}
            >
              <Typography
                  variant={"caption"}
                  weight={"medium"}
                  style={{ position: "absolute" }}
              >
                1700
              </Typography>
              <ResponsiveContainer width="100%" height={144}>
                <PieChart>
                  <Pie
                      data={PieChartData}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                  >
                    {PieChartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={theme.palette[entry.color].main}
                            stroke={""}
                        />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.pieChartLegendWrapper}>
                {PieChartData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} style={{ marginRight: 5 }} />
                      <Typography
                          color="text"
                          colorBrightness={"hint"}
                          variant={"caption"}
                          noWrap
                      >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" weight={"medium"}>
                        &nbsp;{value}
                      </Typography>
                    </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Widget> */}
      </Grid>

    </Grid>
  );
}

// #######################################################################

function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  let array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
        randomValue <= min ||
        randomValue >= max ||
        (lastValue && randomValue - lastValue > maxDiff)
        ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

export default MatchNetwork;
