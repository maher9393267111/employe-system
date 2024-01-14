// import Router from "next/router";
import { useRouter } from "next/router";
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
  Pagination,
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
  CustomerSerch,
} from "../../../redux/customerApiRequest";


import { closeCustomerModel } from "../../../redux/customerSlice";
import {  useDispatch, useSelector } from "react-redux";
import { useContextApp } from "../../../redux/socket/context";
import { stat } from "fs";

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

  const [searchstatus, setSearchStatus] = useState("");

  const [sortText, setSortText] = useState("sorTBy");
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");

  const [size, setSize] = useState(2);

  const [size_list, setSizeList] = useState([1, 2, 3, 4, 5, 6, 8, 9]);

  //////search customer  IIIIIIII
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("");





  const handleSearchTypeChange = ({ target: { name } }) => {
    setSearchType(name);
  };

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setStatus(name);
  };

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

  const handleSize = (event) => {
    setSize(event.target.value);
  };

  const onChange = (event) => {
    setNote(event.target.value);
  };

  const { allcustomers, count, open, customerdata, isFetching } = useSelector(
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

  const userData = useSelector(
    (state) => state.auth.login?.currentUser?.payload
  );

  console.log("Role", userRole[0]);
  console.log("customer redux toolkit", allcustomers);

  const [soctext, setSocText] = useState("");
  const { socket } = useContextApp();

const router =useRouter()
console.log(router.query.agent,'qu💍🕶👓💍🕶👓ery')
const handleChangeStatus=(customerdata , status ,note)=>{

  
dispatch(ChangeCustomerStatus(customerdata, status, note))

dispatch(FetchCustomers(custpage, size, searchstatus, sortBy, sortDirection ,router.query?.agent ))


}





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
        FetchCustomers(custpage, size, searchstatus, sortBy, sortDirection ,router.query?.agent)
      );
    } else if (userRole[0] === "staff") {
      dispatch(FetchAgentCustomers(custpage, size, sortBy, sortDirection));
      toast.success("staff fetch customers");
    }
  }, [custpage, refresh, searchstatus, sortBy, sortDirection, size]);

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

  

  return (
    <Box py={4}>
      <H3 mb={2}>All Customers </H3>

  

      <div>
        {/* <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap"> */}
        <Grid container spacing={3}>
          {/* <Grid item sx={12} lg={2}>
            <SearchInput
         
            />
          </Grid> */}

          <Grid item xs={12} lg={3}>
            <FormControl fullWidth size="small">
              <InputLabel color="info" id="demo-simple-select-label">
                SortBy
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                color="info"
                label="FilterBy"
                value={sortText}
                onChange={handleSort}
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
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={2}>
            <FormControl fullWidth size="small">
              <InputLabel color="info" id="demo-simple-select-label">
                Size
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={size}
                label="Size"
                color="info"
                onChange={handleSize}
              >
                {size_list.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {userRole[0] === "admin" && (
            <Grid item xs={12} lg={2}>
              <FormControl fullWidth size="small">
                <InputLabel color="info" id="demo-simple-select-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  color="info"
                  value={searchstatus}
                  label="FilterBy"
                  onChange={handleSearchStatusChange}
                >
                  <MenuItem color="info" value="all">
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

                  <MenuItem color="info" value="rejected">
                    Rejected
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

      {isFetching ? (
        <div>
          <Card sx={{ marginTop: "12px" }}>
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
      ) : (
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

{filteredCustomers &&

                <TableBody>
                  {filteredCustomers?.map((customer) => (
                    <CustomersRow
                      userRole={userRole}
                      customer={customer}
                      key={customer.id}
                      selected={selected}
                    />
                  ))}
                </TableBody>

                  }



              </Table>
            </TableContainer>
          </Scrollbar>

          <Stack alignItems="center" my={4}>
            {/* <CustomerPagination
              count={Math.ceil(count / size)}
              

              handleChange={handleChange1}
            /> */}
            <Pagination
              count={Math.ceil(count / size)}
              variant="outlined"
              color="info"
              page={custpage}
              onChange={handleChange1}
              sx={{ "& ul": { justifyContent: "center" }, my: 3 }}
            />
          </Stack>
        </Card>
      )}

      {/* -----status update modal--- */}

      {userRole[0] === "admin" && (
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

            {/* {customerdata?.status === "pending" && ( */}
            <Button
              sx={{ backgroundColor: "primary.info" }}
              className=" "
              onClick={() =>
                handleChangeStatus(customerdata ,status ,note)
                // dispatch(ChangeCustomerStatus(customerdata, status, note))
              }
            >
              Change status
            </Button>
            {/* )} */}
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






// import Router from "next/router";
// import { useRouter } from "next/router";
// import {
//   Box,
//   Card,
//   Stack,
//   Table,
//   TableContainer,
//   Radio,
//   TextField,
//   Grid,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Pagination,
// } from "@mui/material";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import TableBody from "@mui/material/TableBody";
// import SearchArea from "components/dashboard/SearchArea";
// import TableHeader from "components/data-table/TableHeader";
// import TablePagination from "components/data-table/TablePagination";
// import VendorDashboardLayout from "components/layouts/vendor-dashboard";
// import Scrollbar from "components/Scrollbar";
// import { H3 } from "components/Typography";
// import { CustomersRow } from "pages-sections/admin";
// import { AgentRow } from "pages-sections/admin";
// import useMuiTable from "hooks/useMuiTable";
// import api from "utils/__api__/dashboard";
// import { useState, useEffect } from "react";
// import CustomerPagination from "./pagination";
// import { toast } from "react-toastify";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Paragraph } from "components/Typography";
// import { Add } from "@mui/icons-material";
// import { useMediaQuery } from "@mui/material";
// import { FlexBox } from "components/flex-box";
// import Skeleton from "@mui/material/Skeleton";
// import SearchInput from "components/SearchInput";

// import axiosJWT from "../../../redux/axiosJWT";
// import { REACT_APP_BASE_URL } from "../../../redux/baseURL";
// import {
//   FetchCustomers,
//   FetchAgentCustomers,
//   ChangeCustomerStatus,
//   CustomerSerch,
// } from "../../../redux/customerApiRequest";


// import { closeCustomerModel } from "../../../redux/customerSlice";
// import {  useDispatch, useSelector } from "react-redux";
// import { useContextApp } from "../../../redux/socket/context";
// import { router } from "json-server";

// //import { connectSocket } from '../../../redux/socket/socketConnect';

// const tableHeading = [
//   {
//     id: "_id",
//     label: "ID",
//     align: "center",
//   },
//   {
//     id: "firstName",
//     label: "FirstName",
//     align: "center",
//   },
//   {
//     id: "email",
//     label: "Email",
//     align: "center",
//   },

//   {
//     id: "status",
//     label: "Status",
//     align: "center",
//   },

//   {
//     id: "phoneNumber",
//     label: "PhoneNumber",
//     align: "center",
//   },

//   {
//     id: "action",
//     label: "Action",
//     align: "center",
//   },
// ];

// // =============================================================================
// CustomerList.getLayout = function getLayout(page) {
//   return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
// };
// // =============================================================================

// // =============================================================================

// export default function CustomerList({ }) {
//   // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID

//   const downSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

//   const [status, setStatus] = useState(customerdata?.status || "");
//   const [note, setNote] = useState("");

//   const [searchstatus, setSearchStatus] = useState("pending");

//   const [sortText, setSortText] = useState("sorTBy");
//   const [sortBy, setSortBy] = useState("");
//   const [sortDirection, setSortDirection] = useState("desc");

//   const [size, setSize] = useState(2);

//   const [size_list, setSizeList] = useState([1, 2, 3, 4, 5, 6, 8, 9]);

//   //////search customer  IIIIIIII
//   const [searchValue, setSearchValue] = useState("");
//   const [searchType, setSearchType] = useState("");


//   const handleSearchTypeChange = ({ target: { name } }) => {
//     setSearchType(name);
//   };

//   const handlePaymentMethodChange = ({ target: { name } }) => {
//     setStatus(name);
// // if(status === "admincustomers")

// // router.push('/admin/customer')





//   };

//   const handleSort = (event) => {
//     setSortText(event.target.value);
//     if (event.target.value === "firstnameAsc") {
//       setSortBy("firstName");
//       setSortDirection("asc");
//     } else if (event.target.value === "firstnameDesc") {
//       setSortBy("firstName");
//       setSortDirection("desc");
//     } else if (event.target.value === "emailAsc") {
//       setSortBy("email");
//       setSortDirection("asc");
//     } else if (event.target.value === "emailDesc") {
//       setSortBy("email");
//       setSortDirection("desc");
//     }
//   };

//   const handleSearchStatusChange = (event) => {
//     setSearchStatus(event.target.value);
//     console.log("name", event.target.value);
//   };

//   const handleSize = (event) => {
//     setSize(event.target.value);
//   };

//   const onChange = (event) => {
//     setNote(event.target.value);
//   };

//   const { allcustomers, count, open, customerdata, isFetching } = useSelector(
//     (state) => state.customer
//   );
//   const currentUserId = useSelector(
//     (state) => state.auth.login.currentUser.payload.id
//   );

//   const handleClose = () => {
//     dispatch(closeCustomerModel());
//     setStatus("");
//     setNote("");
//   };

//   const userRole = useSelector(
//     (state) => state.auth.login.currentUser.payload.roles
//   );

//   const userData = useSelector(
//     (state) => state.auth.login?.currentUser?.payload
//   );

//   console.log("Role", userRole[0]);
//   console.log("customer redux toolkit", allcustomers);

//   const [soctext, setSocText] = useState("");
//   const { socket } = useContextApp();


//   const { query } = useRouter();





//   const [custpage, setcustPage] = useState(0);

//   const handleChange = (evt, value) => {
//     evt.preventDefault();
//     setcustPage(value);
//   };

//   const dispatch = useDispatch();
//   const [customers, setCustomers] = useState(allcustomers ?? []);
//   const [refresh, setRefesh] = useState(false);
//   useEffect(() => {
//     console.log("refetch execute", custpage);

//     if (userRole[0] === "admin") {
//       dispatch(
//         FetchCustomers(custpage, size, searchstatus, sortBy, sortDirection ,query?.agent && query?.agent )
//       );
//     } else if (userRole[0] === "staff") {
//       dispatch(FetchAgentCustomers(custpage, size, sortBy, sortDirection));
//       toast.success("staff fetch customers");
//     }
//   }, [custpage, refresh, searchstatus, sortBy, sortDirection, size ,query]);

//   const filteredCustomers = allcustomers?.map((item) => ({
//     id: item._id,
//     slug: item?._id,
//     firstName: item?.firstName,
//     email: item?.email,
//     address: item?.address,
//     phoneNumber: item?.phoneNumber,
//     status: item?.status,
//     file: item?.file,
//     files: item?.files,
//     audio: item?.audio,
//     employe_id: item?.employe_id,
//   }));

//   console.log("filterdcystomers", filteredCustomers);

//   const {
//     order,
//     orderBy,
//     selected,
//     rowsPerPage,
//     filteredList,
//     handleChangePage,
//     handleRequestSort,
//     page,
//   } = useMuiTable({
//     listData: filteredCustomers,
//     //filteredBrands,
//     defaultSort: "name",
//     refresh,
//     setRefesh,
//   });

//   console.log("??", page);

//   const handleChange1 = (evt, value) => {
//     evt.preventDefault();

//     setcustPage(value);
//   };

  
// const handleChangeStatus=()=>{

  
// dispatch(ChangeCustomerStatus(customerdata, status, note))

// dispatch(FetchCustomers(custpage, size, searchstatus, sortBy, sortDirection ,query?.agent && query?.agent ))


// }




//   return (
//     <Box py={4}>
//       <H3 mb={2}>All Customers </H3>

  

//       <div>
//         {/* <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap"> */}
//         <Grid container spacing={3}>
//           {/* <Grid item sx={12} lg={2}>
//             <SearchInput
         
//             />
//           </Grid> */}

//           <Grid item xs={12} lg={3}>
//             <FormControl fullWidth size="small">
//               <InputLabel color="info" id="demo-simple-select-label">
//                 SortBy
//               </InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 color="info"
//                 label="FilterBy"
//                 value={sortText}
//                 onChange={handleSort}
//               >
//                 <MenuItem value={"firstnameAsc"} sx={{ alignItems: "center" }}>
//                   sortBy FirstName Asc
//                 </MenuItem>

//                 <MenuItem value="firstnameDesc" sx={{ alignItems: "center" }}>
//                   sortBy FirstName Desc
//                 </MenuItem>

//                 <MenuItem value="emailAsc">sortBy Email Asc</MenuItem>

//                 <MenuItem value="emailDesc">sortBy Email Desc</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} lg={2}>
//             <FormControl fullWidth size="small">
//               <InputLabel color="info" id="demo-simple-select-label">
//                 Size
//               </InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={size}
//                 label="Size"
//                 color="info"
//                 onChange={handleSize}
//               >
//                 {size_list.map((item) => (
//                   <MenuItem value={item}>{item}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           {userRole[0] === "admin" && (
//             <Grid item xs={12} lg={2}>
//               <FormControl fullWidth size="small">
//                 <InputLabel color="info" id="demo-simple-select-label">
//                   Status
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   color="info"
//                   value={searchstatus}
//                   label="FilterBy"
//                   onChange={handleSearchStatusChange}
//                 >
//                   <MenuItem color="info" value="">
//                     All
//                   </MenuItem>

//                   <MenuItem
//                     color="info"
//                     value="accepted"
//                     sx={{ alignItems: "center" }}
//                   >
//                     Accepted
//                   </MenuItem>
//                   <MenuItem color="info" value="pending">
//                     Pending
//                   </MenuItem>

//                   <MenuItem color="info" value="rejected">
//                     Rejected
//                   </MenuItem>

//                   <MenuItem color="info" value="admincustomers">
//                     admin customers
//                   </MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           )}

//           <Grid item sx={12} lg={4}>
//             <Button
//               color="info"
//               fullWidth={downSM}
//               variant="contained"
//               startIcon={<Add />}
//               onClick={() => Router.push("/admin/customer/create")}
//               sx={
//                 {
//                   // minHeight: 44,
//                 }
//               }
//             >
//               Add Customer
//             </Button>
//           </Grid>
//         </Grid>
//         {/* </FlexBox> */}
//       </div>

//       {isFetching ? (
//         <div>
//           <Card sx={{ marginTop: "12px" }}>
//             <Skeleton
//               variant="rounded"
//               width={"full"}
//               height={60}
//               sx={{ margin: "12px" }}
//             />
//             <Skeleton
//               variant="rounded"
//               width={"full"}
//               height={60}
//               sx={{ margin: "12px" }}
//             />
//           </Card>
//         </div>
//       ) : (
//         <Card>
//           <Scrollbar>
//             <TableContainer
//               sx={{
//                 minWidth: 600,
//               }}
//             >
//               <Table>
//                 <TableHeader
//                   order={order}
//                   hideSelectBtn
//                   orderBy={orderBy}
//                   heading={tableHeading}
//                   numSelected={selected.length}
//                   rowCount={filteredList.length}
//                   onRequestSort={handleRequestSort}
//                 />

// {filteredCustomers &&

//                 <TableBody>
//                   {filteredCustomers?.map((customer) => (
//                     <CustomersRow
//                       userRole={userRole}
//                       customer={customer}
//                       key={customer.id}
//                       selected={selected}
//                     />
//                   ))}
//                 </TableBody>

//                   }



//               </Table>
//             </TableContainer>
//           </Scrollbar>

//           <Stack alignItems="center" my={4}>
//             {/* <CustomerPagination
//               count={Math.ceil(count / size)}
              

//               handleChange={handleChange1}
//             /> */}
//             <Pagination
//               count={Math.ceil(count / size)}
//               variant="outlined"
//               color="info"
//               page={custpage}
//               onChange={handleChange1}
//               sx={{ "& ul": { justifyContent: "center" }, my: 3 }}
//             />
//           </Stack>
//         </Card>
//       )}

//       {/* -----status update modal--- */}

//       {userRole[0] === "admin" && (
//         <Dialog open={open} onClose={handleClose}>
//           <DialogTitle>Edit customer status</DialogTitle>
//           <DialogContent>
//             {/* <DialogContentText>
//               Customer information
//             </DialogContentText> */}

//             <Stack spacing={3} mb={3}>
//               <div>
//                 <FormControlLabel
//                   name="accepted"
//                   sx={{
//                     mb: 3,
//                   }}
//                   value={status}
//                   onChange={handlePaymentMethodChange}
//                   label={<Paragraph fontWeight={600}>Accept</Paragraph>}
//                   control={
//                     <Radio
//                       checked={status === "accepted"}
//                       color="info"
//                       size="small"
//                     />
//                   }
//                 />

//                 <FormControlLabel
//                   name="rejected"
//                   sx={{
//                     mb: 3,
//                   }}
//                   value={status}
//                   onChange={handlePaymentMethodChange}
//                   label={<Paragraph fontWeight={600}>Reject</Paragraph>}
//                   control={
//                     <Radio
//                       checked={status === "rejected"}
//                       color="info"
//                       size="small"
//                     />
//                   }
//                 />
//               </div>

//               <TextField
//                 label="Note"
//                 name="note"
//                 rows={2}
//                 multiline
//                 value={note}
//                 onChange={onChange}
//                 variant="outlined"
//                 size="medium"
//                 color="info"
//               />
//             </Stack>

//             {/* <TextField rows={6} multiline fullWidth color="info" size="medium" name="description" onBlur={handleBlur} onChange={handleChange} value={values.description} label="Description (optional)" error={Boolean(errors.description && touched.description)} helperText={touched.description && errors.description} /> */}
//           </DialogContent>
//           <DialogActions>
//             <Button className="   text-indigo-600" onClick={handleClose}>
//               Close
//             </Button>

//             {/* {customerdata?.status === "pending" && ( */}
//             <Button
//               sx={{ backgroundColor: "primary.info" }}
//               className=" "
//               onClick={() =>
//               handleChangeStatus(customerdata, status, note)
//                 // dispatch(ChangeCustomerStatus(customerdata, status, note))
//               }
//             >
//               Change status
//             </Button>
//             {/* )} */}
//           </DialogActions>
//         </Dialog>
//       )}
//     </Box>
//   );
// }

