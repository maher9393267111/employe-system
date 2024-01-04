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
import {AgentRow} from 'pages-sections/admin'
import useMuiTable from "hooks/useMuiTable";
import api from "utils/__api__/dashboard";
import { useState ,useEffect } from "react";

import axiosJWT from '../../../redux/axiosJWT';
import {REACT_APP_BASE_URL} from '../../../redux/baseURL'
import {FetchAgents } from '../../../redux/agentApiRequest'
import {useDispatch ,useSelector} from 'react-redux'



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

const tableHeading = [{
  id: "_id",
  label: "ID",
  align: "center"
}, {
  id: "username",
  label: "UserName",
  align: "center"
}
, {
  id: "email",
  label: "Email",
  align: "center"
},

{
  id: "adress",
  label: "Adress",
  align: "center"
},

{
  id: "phoneNumber",
  label: "PhoneNumber",
  align: "center"
},


{
  id: "action",
  label: "Action",
  align: "center"
}];




// =============================================================================
AgentList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function AgentList({
  brands
}) {
  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID


  
  const employeesData = useSelector((state) => state.agent?.agent?.allagents);
  const refetch = useSelector((state) => state.agent?.agent?.refetch);
  console.log("??" ,employeesData)

  const dispatch = useDispatch();
  const [employees, setEmployees] = useState(employeesData ?? []);
  const [refresh, setRefesh] = useState(false);
  useEffect(() => {
    // const fetchData = async () => {
    //     try {
    //         const res = await axiosJWT.get(`${REACT_APP_BASE_URL}/employees`);
    //         setEmployees(res.data);
    //         console.log(res?.data)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    // fetchData();

    FetchAgents(dispatch)
    // if (employeesData?.length === 0)  {
    //   FetchAgents(dispatch)
    // console.log("fetch AGAIN")
    
    // }


    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [refetch]);




  const filteredBrands = brands.map(item => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    logo: item.image,
    featured: item.featured
  }));

  const filteredAgents = employees.map(item => ({
    id: item._id,
    slug: item._id,
    username: item.username,
    email:item.email,
    adress:item.adress,
    phoneNumber:item.phoneNumber
    
  }));


  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: filteredAgents,
    //filteredBrands,
    defaultSort: "name"
  });

 









  return <Box py={4}>
      <H3 mb={2}>All Agents</H3>

      <SearchArea handleSearch={() => {}} buttonText="Add Agent" searchPlaceholder="Search Agent..." handleBtnClick={() => Router.push("/admin/brands/create")} />

      <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 600
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} numSelected={selected.length} rowCount={filteredList.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map(agent => <AgentRow agent={agent} key={agent.id} selected={selected} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(filteredList.length / rowsPerPage)} />
        </Stack>
      </Card>
    </Box>;
}
export const getStaticProps = async () => {
  const brands = await api.brands();
  return {
    props: {
      brands
    }
  };
};