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
import CustomerPagination from "./pagination";
import {toast} from 'react-toastify'

import axiosJWT from "../../../redux/axiosJWT";
import { REACT_APP_BASE_URL } from "../../../redux/baseURL";
import { FetchCustomers ,FetchAgentCustomers } from "../../../redux/customerApiRequest";
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

  const { allcustomers, count } = useSelector((state) => state.customer);
  const currentUserId = useSelector(
    (state) => state.auth.login.currentUser.payload.id
  );
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
    
    if (userRole[0] === 'admin'){
    
    dispatch(FetchCustomers(custpage, 2));
    }

    else if (userRole[0] === 'staff'){
dispatch(FetchAgentCustomers(custpage,2))
toast.success("staff fetch customers")

    }


  }, [custpage, refresh]);

  const filteredCustomers = allcustomers?.map((item) => ({
    id: item._id,
    slug: item?._id,
    firstName: item?.firstName,
    email: item?.email,
    address: item?.address,
    phoneNumber: item?.phoneNumber,
    status: item?.status,
    file:item?.file
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
      <H3 mb={2}>All Customers  </H3>

      {/* {userRole} */}

      {/* {count} */}
      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Customer"
        searchPlaceholder="Search Customer..."
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
                  <CustomersRow
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
