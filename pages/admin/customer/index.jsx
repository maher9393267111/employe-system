import Router from "next/router";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
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
import CustomerPagination from './pagination'

import axiosJWT from "../../../redux/axiosJWT";
import { REACT_APP_BASE_URL } from "../../../redux/baseURL";
import { FetchCustomers } from "../../../redux/customerApiRequest";
import { useDispatch, useSelector } from "react-redux";

// TABLE HEADING DATA LIST
// const tableHeading = [{
//   id: "id",
//   label: "ID",
//   align: "center"
// }, {
//   id: "name",
//   label: "Name",
//   align: "center"
// }, {
//   id: "logo",
//   label: "Logo",
//   align: "center"
// }, {
//   id: "featured",
//   label: "Featured",
//   align: "center"
// }, {
//   id: "action",
//   label: "Action",
//   align: "center"
// }];

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

  const {allcustomers ,count} = useSelector((state) => state.customer);
console.log("customer redux toolkit" ,allcustomers)
 


const [custpage ,setcustPage] = useState(0)


const handleChange = (evt, value) => {
  evt.preventDefault();
  setcustPage(value)

};




  const dispatch = useDispatch();
  const [customers, setCustomers] = useState(allcustomers?? []);
  const [refresh, setRefesh] = useState(false);
  useEffect(() => {
console.log("refetch execute" ,custpage)
    dispatch(FetchCustomers(custpage ,2))


  }, [custpage ,refresh]);



  const filteredCustomers = allcustomers?.map((item) => ({
    id: item._id,
    slug: item?._id,
    firstName: item?.firstName,
    email: item?.email,
    address: item?.address,
    phoneNumber: item?.phoneNumber,
    status: item?.status
  }));

  console.log("filterdcystomers" , filteredCustomers)

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
    page
  } = useMuiTable({
    listData: filteredCustomers,
    //filteredBrands,
    defaultSort: "name",
    refresh, setRefesh
  });

  console.log("??",  page);




  const handleChange1 = (evt, value) => {
    evt.preventDefault();

    setcustPage(value)
  };





  return (
    <Box py={4}>
      <H3 mb={2}>All Cusomes  {custpage}</H3>

{filteredList?.length}
      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Agent"
        searchPlaceholder="Search Agent..."
        handleBtnClick={() => Router.push("/admin/customer/create")}
      />

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
                  <CustomersRow customer={customer} key={customer.id} selected={selected} />
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
