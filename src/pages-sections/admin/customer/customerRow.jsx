import { useState } from "react";
import { Avatar, Box, Chip } from "@mui/material";
import { useRouter } from "next/router";
import { Delete, RemoveRedEye } from "@mui/icons-material";

import BazaarSwitch from "components/BazaarSwitch";
import {
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "../StyledComponents";
import { DeleteCustomer } from "../../../../redux/customerApiRequest";
import { openCustomerModel } from "../../../../redux/customerSlice";
import { useDispatch } from "react-redux";
// ========================================================================

// ========================================================================

const CustomersRow = ({ customer, selected, userRole }) => {
  const {
    firstName,
    address,
    phoneNumber,
    email,
    status,
    file,
    files,
    audio,
    SearchedBy,
    note,
    process,
    employe_id,

    id,
  } = customer;

  console.log(customer, "CUSTOMER");
  const getColor = (status) => {
    switch (status) {
      case "Pending":
        return "secondary";
      // case "p":
      //   return "secondary";
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      default:
        return "";
    }
  };

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    console.log("IDDDDDDDD", customer);
    dispatch(DeleteCustomer(id, customer?.files , audio));
  };

  const router = useRouter();
  //   const [featuredCategory, setFeaturedCategory] = useState(featured);
  const isItemSelected = selected.indexOf(firstName) !== -1;
  const handleNavigate = () => router.push(`/admin/customer/${id}`);
  return (
    <StyledTableRow tabIndex={-1} role="checkbox" selected={isItemSelected}>
      <StyledTableCell align="center">#{id.split("-")[0]}</StyledTableCell>

      {/* <StyledTableCell align="center">{firstName}</StyledTableCell> */}

      <StyledTableCell align="center">{email}</StyledTableCell>
      <StyledTableCell align="center">{note?.slice(0, 40)}</StyledTableCell>

      {/* <StyledTableCell align="center">{address}</StyledTableCell> */}

      <StyledTableCell align="center">
        {/* {status} */}
        <Box m={0.75}>
          <Chip
            onClick={() => {
              dispatch(openCustomerModel(customer));
            }}
            size="small"
            label={status}
            sx={{
              p: "0.25rem 0.5rem",
              fontSize: 12,
              color: !!getColor(status) ? `${getColor(status)}.900` : "inherit",
              backgroundColor: !!getColor(status)
                ? `${getColor(status)}.100`
                : "none",
            }}
          />
        </Box>
      </StyledTableCell>

      {/* <StyledTableCell align="center">{phoneNumber}</StyledTableCell> */}

      {userRole[0] === "admin" ? (
        <StyledTableCell align="center">{SearchedBy} </StyledTableCell>
      ) : (
        <StyledTableCell align="center">{phoneNumber} </StyledTableCell>
      )}

      <StyledTableCell align="center">
        {process === true ? "true" : "false"}
      </StyledTableCell>

      {/* employe_id */}

  


{userRole[0] === "admin" ? (
        <StyledTableCell align="center">{employe_id?.username} </StyledTableCell>
      ) : (
        <StyledTableCell align="center">{firstName} </StyledTableCell>
      )}




      <StyledTableCell align="center">
        <StyledIconButton onClick={handleNavigate}>
          <RemoveRedEye />
        </StyledIconButton>

        {(userRole[0] === "admin" || status === "rejected") && (
          <StyledIconButton onClick={() => handleDelete(id)}>
            <Delete />
          </StyledIconButton>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
};
export default CustomersRow;
