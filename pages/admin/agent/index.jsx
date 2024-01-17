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
import api from "utils/__api__/dashboard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosJWT from "../../../redux/axiosJWT";
import { REACT_APP_BASE_URL } from "../../../redux/baseURL";
import { FetchAgents } from "../../../redux/agentApiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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

export default function AgentList({ brands }) {
  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID

  const router = useRouter();
  const downSM = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const [searchValue , setSearchValue] = useState('')
 


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

  // const filteredBrands = brands.map((item) => ({
  //   id: item.id,
  //   slug: item.slug,
  //   name: item.name,
  //   logo: item.image,
  //   featured: item.featured,
  // }));



  

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
      <H3 mb={2}>All Agents</H3>

      {/* {userRole[0] === "admin" && (
        <SearchArea
          handleSearch= {}
          buttonText="Add Agent"
          searchPlaceholder="Search Agent..."
          handleBtnClick={() => Router.push("/admin/agent/create")}
          userRole={userRole}
        />
      )} */}



<Card  

backgroundColor='grey.900'


sx={{height:'160px' ,marginBottom:'20px', padding:'14px'}}>
  

  <Box sx={{ display: 'flex' }}>

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
              Search
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
export const getStaticProps = async () => {
  const brands = await api.brands();
  return {
    props: {
      brands,
    },
  };
};
