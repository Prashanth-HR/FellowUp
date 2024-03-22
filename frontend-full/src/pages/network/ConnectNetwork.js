import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon, MoreVert as MoreIcon
} from "@mui/icons-material";
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Box, Checkbox, Grid, IconButton, Menu, MenuItem, Table,
  TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar
} from "@mui/material";
import { lighten } from '@mui/material/styles';
import { makeStyles, useTheme } from '@mui/styles';
import cn from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Tooltip
} from "recharts";
import Widget from "../../components/Widget";
import { Avatar, Typography } from "../../components/Wrappers";
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
    customer: "EcoDyne",
    office: "India",
    weight: "Green Tech",
    price: "Social",
    purDate: "10 March 2024",
    delDate: "Need guidance on value creation"
    // status: "Call",
  },
  {
    id: 2,
    orderId: Math.floor(Math.random(0) * 3000000),
    customer: "FrescoFeast",
    office: "Nigeria",
    weight: "Agri Tech/Food",
    price: "Social | User",
    purDate: "11 March 2024",
    delDate: "On track"
    // status: "Call",

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

  { id: "startup", numeric: true, disablePadding: false, label: "StartUp" },
  { id: "location", numeric: true, disablePadding: false, label: "Location" },
  { id: "industry", numeric: true, disablePadding: false, label: "Industry" },
  { id: "impact", numeric: true, disablePadding: false, label: "Impact" },
  {
    id: "checkin",
    numeric: true,
    disablePadding: false,
    label: "Last check-in"
  },
  {
    id: "notes",
    numeric: true,
    disablePadding: false,
    label: "Notes"
  }
  // { id: "action", numeric: true, disablePadding: false, label: "Connect" }

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
            Your connections
            <Box display="flex" alignSelf={"flex-end"} ml={1}>
              <Typography
                color="text"
                colorBrightness={"hint"}
                variant={"caption"}
              >
                2 total
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

function ConnectNetwork() {
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
  const [actionsButtonRefID, setActionsButtonRefID] = React.useState(null);
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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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

      </Grid>

      <Grid item xs={12}>
        <Widget noBodyPadding bodyClass={classes.tableWidget}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="recent orders"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `orders-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        {/* <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                        >
                          {row.orderId}
                        </TableCell> */}
                        <TableCell>
                          <Box
                            display={"flex"}
                            flexWrap={"nowrap"}
                            alignItems={"center"}
                          >
                            <Avatar
                              alt={row.customer}
                              color={row.color}
                              style={{ marginRight: 8 }}
                            >
                              {row.customer[0]}
                            </Avatar>
                            <Typography style={{ whiteSpace: "nowrap" }}>
                              {row.customer}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{row.office}</TableCell>
                        <TableCell>{row.weight}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.purDate}</TableCell>
                        <TableCell>{row.delDate}</TableCell>
                        <TableCell>
                          <IconButton aria-label="call">
                            <PhoneIcon />
                          </IconButton>
                          <IconButton aria-label="chat">
                            <ChatIcon />
                          </IconButton>
                        </TableCell>

                        <TableCell align={"center"}>
                          <IconButton
                            className={classes.actionsIcon}
                            aria-owns="actions-menu"
                            aria-haspopup="true"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActionsMenu(true);
                              setActionsButtonRefID(e.currentTarget)
                            }}
                            ref={setActionsButtonRefID}
                          >
                            <MoreIcon />
                          </IconButton>

                          <Menu
                            id="actions-menu"
                            open={isActionsMenu}
                            anchorEl={actionsButtonRefID}
                            onClose={() => setActionsMenu(false)}
                            disableAutoFocusItem
                          >
                            <MenuItem>
                              <Typography>Edit</Typography>
                            </MenuItem>
                            <MenuItem>
                              <Typography>Delete</Typography>
                            </MenuItem>
                          </Menu>

                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "previous page"
            }}
            nextIconButtonProps={{
              "aria-label": "next page"
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Widget>
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

export default ConnectNetwork;
