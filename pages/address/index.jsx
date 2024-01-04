import Link from "next/link";
import { useState } from "react";
import { Delete, Edit, Place } from "@mui/icons-material";
import { Button, IconButton, Pagination, Typography } from "@mui/material";
import TableRow from "components/TableRow";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/address";

// =======================================================

// =======================================================

const AddressList = ({
  addressList
}) => {
  const [allAddress, setAllAddress] = useState(addressList);

  // SECTION TITLE HEADER BUTTON
  const HEADER_BUTTON = <Button color="primary" sx={{
    bgcolor: "primary.light",
    px: 4
  }}>
      Add New Address
    </Button>;

  // HANDLE ADDRESS DELETE
  const handleAddressDelete = id => {
    setAllAddress(allAddress.filter(item => item.id !== id));
  };
  return <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader icon={Place} title="My Addresses" button={HEADER_BUTTON} navigation={<CustomerDashboardNavigation />} />

      {/* ALL ADDRESS LIST AREA */}
      {allAddress.map(address => <TableRow sx={{
      my: 2,
      padding: "6px 18px"
    }} key={address.id}>
          <Typography whiteSpace="pre" m={0.75} textAlign="left">
            {address.title}
          </Typography>

          <Typography flex="1 1 260px !important" m={0.75} textAlign="left">
            {`${address.street}, ${address.city}`}
          </Typography>

          <Typography whiteSpace="pre" m={0.75} textAlign="left">
            {address.phone}
          </Typography>

          <Typography whiteSpace="pre" textAlign="center" color="grey.600">
            <Link href={`/address/${address.id}`} passHref>
              <IconButton>
                <Edit fontSize="small" color="inherit" />
              </IconButton>
            </Link>

            <IconButton onClick={e => {
          e.stopPropagation();
          handleAddressDelete(address.id);
        }}>
              <Delete fontSize="small" color="inherit" />
            </IconButton>
          </Typography>
        </TableRow>)}

      {/* PAGINATION AREA */}
      <FlexBox justifyContent="center" mt={5}>
        <Pagination count={5} onChange={data => console.log(data)} />
      </FlexBox>
    </CustomerDashboardLayout>;
};
export const getStaticProps = async () => {
  const addressList = await api.getAddressList();
  return {
    props: {
      addressList
    }
  };
};
export default AddressList;