import Router from "next/router";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import Scrollbar from "components/Scrollbar";
import { H3 } from "components/Typography";
import { BrandRow } from "pages-sections/admin";
import { AgentRow } from "pages-sections/admin";
import useMuiTable from "hooks/useMuiTable";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosJWT from "../redux/axiosJWT";
import { REACT_APP_BASE_URL } from "../redux/baseURL";
import { FetchAgents } from "../redux/agentApiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import HomeChart from 'components/homeChart'
import { Search } from "@mui/icons-material";
import { Add } from "@mui/icons-material";
import { Button, useMediaQuery } from "@mui/material";
import { FlexBox } from "components/flex-box";
import SearchInput from "components/SearchInput";



const tableHeading = [
  {
    id: "_id",
    label: "ID",
    align: "center",
  },
  {
    id: "username",
    label: "UserName",
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    align: "center",
  },

  // {
  //   id: "adress",
  //   label: "Adress",
  //   align: "center",
  // },

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
AgentList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function AgentList({  }) {
  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID

  const downSM = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const [searchValue , setSearchValue] = useState('')

  const router = useRouter();

  const employeesData = useSelector((state) => state.agent?.agent?.allagents);
  const name = useSelector((state) => state.auth?.login.nane);
  const refetch = useSelector((state) => state.agent?.agent?.refetch);

  const userRole = useSelector(
    (state) => state.auth.login.currentUser?.payload?.roles
  );

  const dispatch = useDispatch();
  const [employees, setEmployees] = useState(employeesData ?? []);
  const [refresh, setRefesh] = useState(false);
  useEffect(() => {
 

    dispatch(FetchAgents(searchValue));
  }, []);



  

  const filteredAgents = employeesData?.map((item) => ({
    id: item._id,
    slug: item._id,
    username: item.username,
    email: item.email,
    address: item.address,
    phoneNumber: item.phoneNumber,
  }));

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredAgents,
    //filteredBrands,
    defaultSort: "name",
  });

  useEffect(() => {
    if (userRole[0] !== "admin") {
      router.push("/admin/customer");
    }
  }, [router]);

  return (
    <Box py={4}>


<HomeChart/>


      <H3 mb={2}>All Agents</H3>

      {/* {userRole[0] === "admin" && (
        <SearchArea
          handleSearch={() => {}}
          buttonText="Add Agent"
          searchPlaceholder="Search Agent..."
          handleBtnClick={() => Router.push("/admin/agent/create")}
          userRole={userRole}
        />
      )} */}

<Card  

backgroundColor='grey.900'


sx={{height:'160px' ,marginBottom:'20px', padding:'14px'}}>
  

  <Box sx={{ display: 'flex' ,gap:'22px' }}>

<SearchInput
         sx={{ flexGrow: 1}}

         onChange={(e)=>setSearchValue(e.target.value)}

         />


<Button

              color="info"
              fullWidth={downSM}
              variant="contained"
              // startIcon={<Add />}
              onClick={() => dispatch(FetchAgents(searchValue))}
              sx={
                {
                  // minHeight: 44,
                }
              }
            >
              Search..
            </Button>


            <Button

color="info"
fullWidth={downSM}
variant="contained"
// startIcon={<Add />}
onClick={() => router.push('/admin/agent/create')}
sx={
  {
    // minHeight: 44,
  }
}
>
Add agent
</Button>




</Box>




</Card>





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
                rowCount={filteredList?.length}
                onRequestSort={handleRequestSort}
              />

              {filteredList && (
                <TableBody>
                  {filteredList?.map((agent) => (
                    <AgentRow
                      userRole={userRole}
                      agent={agent}
                      key={agent.id}
                      selected={selected}
                    />
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(filteredAgents.length / rowsPerPage)}
          />
        </Stack>
      </Card>





    </Box>
  );
}




















// "use client";

// import dynamic from "next/dynamic";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// // AgentCustomersCharts
// import { AgentCustomersCharts } from "../redux/agentApiRequest";
// import { useSelector, useDispatch } from "react-redux";
// import NextImage from "next/image";
// import { Box, Card } from "@mui/material";
// import { H3, H5, Paragraph } from "components/Typography";
// import { currency } from "lib";
// import VendorDashboardLayout from "components/layouts/vendor-dashboard";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Home.getLayout = function getLayout(page) {
//   return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
// };

// export default function Home() {
//   const dispatch = useDispatch();
//   const agents = useSelector((state) => state.agent.agent.agentsChart);
//   const totalCustomers = useSelector(
//     (state) => state.agent.agent.totalCustomers
//   );

//   const totalAgents = useSelector((state) => state.agent.agent.totalAgents);

//   const user = useSelector((state) => state.auth.login.currentUser.payload);

//   console.log("selector", agents);

//   useEffect(() => {
//     dispatch(AgentCustomersCharts());
//   }, [dispatch]);

//   const pieOptions = {
//     colors: ["rgb(46, 150, 255)", "rgb(184, 0, 216)", "rgb(2, 178, 175)"],

//     labels: agents?.map((agent, index) => {
//       return agent.data.fullName;
//     }),
//   };

//   console.log("LABELS", pieOptions.labels);

//   const pieSeries = agents?.map((agent, index) => {
//     return agent.count;
//   });

//   console.log("SEARIES", pieSeries);

//   return (
//     <Box
//       sx={{
//         p: 4,
//         height: "100%",
//         // width:"70%",
//         // marginX:'auto',
//         // marginY:"15px",
//       }}
//     >
//       {agents &&
//       <Card
//         sx={{
//           p: 4,
//           height: "100%",
//           width: "70%",

//           width: {
//             xs: "100%",
//             md: "80%",
//           },

//           marginX: "auto",
//           marginY: "15px",

//           display: "flex",
//           position: "relative",
//           flexDirection: "column",
//           justifyContent: "center",
//         }}
//       >
//         <H5 color="info.main" mb={0.5}>
//           Good Morning, {user?.fullName}
//         </H5>
//         <Paragraph color="grey.600">
//           Here’s what happening with your store today!
//         </Paragraph>

//         <H3 mt={3}>{totalAgents && totalAgents}</H3>
//         <Paragraph color="grey.600">Today’s Agents</Paragraph>

//         <H3 mt={1.5}>{totalCustomers && totalCustomers}</H3>
//         <Paragraph color="grey.600">Today’s total Customers</Paragraph>

//         <Box
//           sx={{
//             right: 24,
//             bottom: 0,
//             // position: "absolute",

//             position: {
//               xs: "relative",
//               md: "absolute",
//             },

//             display: {
//               // xs: "none",
//               sm: "block",
//             },
//           }}
//         >
//           {/* {agents && ( */}
//             <Chart
//               options={pieOptions}
//               series={pieSeries}
//               type="donut"
//               width={380}
//             />
//            {/* )} */}
//         </Box>
//       </Card>
// }
//       ;




//     </Box>
//   );
// }

