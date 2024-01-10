import Router from "next/router";
import {
  Box,
  Card,
  Stack,
  Table,
  TableContainer,
  Radio,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import Scrollbar from "components/Scrollbar";
import { H3 } from "components/Typography";
import { CustomersRow } from "pages-sections/admin";
import { AgentRow } from "pages-sections/admin";
import useMuiTable from "hooks/useMuiTable";
import api from "utils/__api__/dashboard";
import { useState, useEffect } from "react";
import CustomerPagination from "./pagination";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Paragraph } from "components/Typography";
import { Add } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { FlexBox } from "components/flex-box";
import Skeleton from "@mui/material/Skeleton";
import SearchInput from "components/SearchInput";

import axiosJWT from "../../../redux/axiosJWT";
import { REACT_APP_BASE_URL } from "../../../redux/baseURL";
import {
  FetchCustomers,
  FetchAgentCustomers,
  ChangeCustomerStatus,
} from "../../../redux/customerApiRequest";
import { closeCustomerModel } from "../../../redux/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useContextApp } from "../../../redux/socket/context";

//import { connectSocket } from '../../../redux/socket/socketConnect';

const tableHeading = [
  {
    id: "_id",
    label: "ID",
    align: "center",
  },
  {
    id: "firstName",
    label: "FirstName",
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    align: "center",
  },

  {
    id: "status",
    label: "Status",
    align: "center",
  },

  {
    id: "phoneNumber",
    label: "PhoneNumber",
    align: "center",
  },

  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

// =============================================================================
CustomerList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function CustomerList({ brands }) {
  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID

  const downSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [status, setStatus] = useState(customerdata?.status || "");
  const [note, setNote] = useState("");

  const [searchstatus, setSearchStatus] = useState("pending");

  const [sortText, setSortText] = useState("sorTBy");
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");

  const handleSort = (event) => {
    setSortText(event.target.value);
    if (event.target.value === "firstnameAsc") {
      setSortBy("firstName");
      setSortDirection("asc");
    } else if (event.target.value === "firstnameDesc") {
      setSortBy("firstName");
      setSortDirection("desc");
    } else if (event.target.value === "emailAsc") {
      setSortBy("email");
      setSortDirection("asc");
    } else if (event.target.value === "emailDesc") {
      setSortBy("email");
      setSortDirection("desc");
    }
  };

  const handleSearchStatusChange = (event) => {
    setSearchStatus(event.target.value);
    console.log("name", event.target.value);
  };

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setStatus(name);
  };

  const onChange = (event) => {
    setNote(event.target.value);
  };

  const { allcustomers, count, open, customerdata ,isFetching } = useSelector(
    (state) => state.customer
  );
  const currentUserId = useSelector(
    (state) => state.auth.login.currentUser.payload.id
  );

  const handleClose = () => {
    dispatch(closeCustomerModel());
    setStatus("");
    setNote("");
  };

  const userRole = useSelector(
    (state) => state.auth.login.currentUser.payload.roles
  );
  console.log("Role", userRole[0]);
  console.log("customer redux toolkit", allcustomers);

  const [soctext, setSocText] = useState("");
  const { socket } = useContextApp();

  useEffect(() => {
    socket.on("fetch", (data) => {
      console.log("data Socket 📌✏✒🖋🖊🖌🖍", data);
      setSocText(data);
    });

    if (userRole[0] === "admin") {
      socket.on("createcustomer", (data) => {
        toast.info("new POST CREATED");
      });
    }
  }, []);

  const [custpage, setcustPage] = useState(0);

  const handleChange = (evt, value) => {
    evt.preventDefault();
    setcustPage(value);
  };

  const dispatch = useDispatch();
  const [customers, setCustomers] = useState(allcustomers ?? []);
  const [refresh, setRefesh] = useState(false);
  useEffect(() => {
    console.log("refetch execute", custpage);

    if (userRole[0] === "admin") {
      dispatch(
        FetchCustomers(custpage, 2, searchstatus, sortBy, sortDirection)
      );
    } else if (userRole[0] === "staff") {
      dispatch(FetchAgentCustomers(custpage, 2, sortBy, sortDirection));
      toast.success("staff fetch customers");
    }
  }, [custpage, refresh, searchstatus, sortBy, sortDirection]);

  const filteredCustomers = allcustomers?.map((item) => ({
    id: item._id,
    slug: item?._id,
    firstName: item?.firstName,
    email: item?.email,
    address: item?.address,
    phoneNumber: item?.phoneNumber,
    status: item?.status,
    file: item?.file,
    files: item?.files,
    audio: item?.audio,
    employe_id: item?.employe_id,
  }));

  console.log("filterdcystomers", filteredCustomers);

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
    page,
  } = useMuiTable({
    listData: filteredCustomers,
    //filteredBrands,
    defaultSort: "name",
    refresh,
    setRefesh,
  });

  console.log("??", page);

  const handleChange1 = (evt, value) => {
    evt.preventDefault();

    setcustPage(value);
  };

  //FetchAgentCustomers

  return (
    <Box py={4}>
      <H3 mb={2}>All Customers </H3>
      {/* 
      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Customer"
        searchPlaceholder="Search Customer..."
        handleBtnClick={() => Router.push("/admin/customer/create")}
      /> */}

      <div>
        {/* <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap"> */}
        <Grid container spacing={3}>
          <Grid item sx={12} lg={3}>
            <SearchInput
            //  placeholder={searchPlaceholder}
            />
          </Grid>

          <Grid item sx={12} lg={2}>
            {/* <FormControl
              style={{ width: "100% !important" }}
              sx={{ width: "full" }}
              size="small"
            >
              <InputLabel
                sx={{ width: "full" }}
                id="bucket-simple-select-label"
                size="small"
                color="info"
                variant="outlined"
              >
                SortBy
              </InputLabel>
              <Select
                sx={{ width: "full" }}
                color="info"
                labelId="bucket-simple-select-label"
                id="bucket-simple-select"
             
                label="Bucket"
                value={sortText}
                onChange={handleSort}
               // onChange={handleSort}
                fullWidth
              >
                <MenuItem value="firstnameAsc" sx={{ alignItems: "center" }}>
                  sortBy FirstName Asc
                </MenuItem>

                <MenuItem value="firstnameDesc" sx={{ alignItems: "center" }}>
                  sortBy FirstName Desc
                </MenuItem>

                <MenuItem value="emailAsc">sortBy Email Asc</MenuItem>

                <MenuItem value="emailDesc">sortBy Email Desc</MenuItem>
              </Select>
            </FormControl> */}

            <div>
              <Select
                sx={{
                  height: 44,
                  paddingRight: 0,
                  borderRadius: 300,
                  color: "grey.700",
                  overflow: "hidden",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.info",
                  },
                }}
                labelId="SortBy"
                id="sort-by-select"
                value={sortText}
                onChange={handleSort}
                placeholder="SortBy"
                fullWidth
                variant="outlined"
                color="info"
              >
                <MenuItem value={"firstnameAsc"} sx={{ alignItems: "center" }}>
                  sortBy FirstName Asc
                </MenuItem>

                <MenuItem value="firstnameDesc" sx={{ alignItems: "center" }}>
                  sortBy FirstName Desc
                </MenuItem>

                <MenuItem value="emailAsc">sortBy Email Asc</MenuItem>

                <MenuItem value="emailDesc">sortBy Email Desc</MenuItem>
              </Select>
            </div>
          </Grid>

          {userRole[0] === "admin" && (
            <Grid item sx={12} lg={3}>
              <FormControl
                style={{ width: "100% !important" }}
                sx={{ width: "full" }}
                size="medium"
              >
                <InputLabel
                  sx={{ width: "full" }}
                  id="bucket-simple-select-label"
                  size="small"
                  color="info"
                  variant="outlined"
                >
                  Status
                </InputLabel>
                <Select
                  sx={{
                    height: 44,
                    paddingRight: 0,
                    borderRadius: 300,
                    color: "grey.700",
                    overflow: "hidden",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.info",
                    },
                  }}
                  // sx={{ width: "full" }}
                  color="info"
                  labelId="bucket-simple-select-label"
                  id="bucket-simple-select"
                  value={searchstatus}
                  label="FilterBy"
                  onChange={handleSearchStatusChange}
                  fullWidth
                >
                  <MenuItem color="info" value="">
                    All
                  </MenuItem>

                  <MenuItem
                    color="info"
                    value="accepted"
                    sx={{ alignItems: "center" }}
                  >
                    Accepted
                  </MenuItem>
                  <MenuItem color="info" value="pending">
                    Pending
                  </MenuItem>

                  <MenuItem color="info" value="admincustomers">
                    admin customers
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item sx={12} lg={4}>
            <Button
              color="info"
              fullWidth={downSM}
              variant="contained"
              startIcon={<Add />}
              onClick={() => Router.push("/admin/customer/create")}
              sx={
                {
                  // minHeight: 44,
                }
              }
            >
              Add Customer
            </Button>
          </Grid>
        </Grid>
        {/* </FlexBox> */}
      </div>

{isFetching ?  <div>

<Card sx={{marginTop:'12px'}}>


<Skeleton
              variant="rounded"
              width={"full"}
              height={60}
              sx={{ margin: "12px" }}
            />
            <Skeleton
              variant="rounded"
              width={"full"}
              height={60}
              sx={{ margin: "12px" }}
            />

</Card>

</div>   
: 

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 600,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                numSelected={selected.length}
                rowCount={filteredList.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredCustomers?.map((customer) => (
                  <CustomersRow
                  userRole ={ userRole}
                    customer={customer}
                    key={customer.id}
                    selected={selected}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <CustomerPagination
            count={Math.ceil(count / rowsPerPage)}
            // {count / rowsPerPage}

            handleChange={handleChange1}
          />
        </Stack>
      </Card>

                }




      {/* -----status update modal--- */}
      {customerdata?.status === "pending" && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit customer status</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              Customer information
            </DialogContentText> */}

            <Stack spacing={3} mb={3}>
              <div>
                <FormControlLabel
                  name="accepted"
                  sx={{
                    mb: 3,
                  }}
                  value={status}
                  onChange={handlePaymentMethodChange}
                  label={<Paragraph fontWeight={600}>Accept</Paragraph>}
                  control={
                    <Radio
                      checked={status === "accepted"}
                      color="info"
                      size="small"
                    />
                  }
                />

                <FormControlLabel
                  name="rejected"
                  sx={{
                    mb: 3,
                  }}
                  value={status}
                  onChange={handlePaymentMethodChange}
                  label={<Paragraph fontWeight={600}>Reject</Paragraph>}
                  control={
                    <Radio
                      checked={status === "rejected"}
                      color="info"
                      size="small"
                    />
                  }
                />
              </div>

              <TextField
                label="Note"
                name="note"
                rows={2}
                multiline
                value={note}
                onChange={onChange}
                variant="outlined"
                size="medium"
                color="info"
              />
            </Stack>

            {/* <TextField rows={6} multiline fullWidth color="info" size="medium" name="description" onBlur={handleBlur} onChange={handleChange} value={values.description} label="Description (optional)" error={Boolean(errors.description && touched.description)} helperText={touched.description && errors.description} /> */}
          </DialogContent>
          <DialogActions>
            <Button className="   text-indigo-600" onClick={handleClose}>
              Close
            </Button>

            {customerdata?.status === "pending" && (
              <Button
                sx={{ backgroundColor: "primary.info" }}
                className=" "
                onClick={() =>
                  dispatch(ChangeCustomerStatus(customerdata, status, note))
                }
              >
                Change status
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
export const getStaticProps = async () => {
  const brands = await api.brands();
  return {
    props: {
      brands,
    },
  };
};
