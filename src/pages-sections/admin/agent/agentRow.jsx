import { useState } from "react";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import BazaarSwitch from "components/BazaarSwitch";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../StyledComponents";

// ========================================================================

// ========================================================================

const AgentRow = ({
  agent,
  selected
}) => {
  const {
    username,
    adress,
    phoneNumber,
    email,
   
   
    id,
    
  } = agent;


  console.log(agent)





//   "fullName": "lazer",
//         "email": "lazer@gmail.com",
//         "phoneNumber": "1212",
//         "address": "turkey",
//         "birthday": "2012-12-22T22:00:00.000Z",
//         "username": "lazer",
//         "password": "$2b$10$FEX264k1B3U6r/KWde5gsu3.HjKj68bej.5ZAxMapnLhuckaHy4Ua",
//         "roles": 




  const router = useRouter();
//   const [featuredCategory, setFeaturedCategory] = useState(featured);
  const isItemSelected = selected.indexOf(username) !== -1;
  const handleNavigate = () => router.push(`/admin/categories/${id}`);
  return <StyledTableRow tabIndex={-1} role="checkbox" selected={isItemSelected}>
      <StyledTableCell align="center">#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align="center">{username}</StyledTableCell>

      <StyledTableCell align="center">{email}</StyledTableCell>
      <StyledTableCell align="center">{adress}</StyledTableCell>
      <StyledTableCell align="center">{phoneNumber}</StyledTableCell>

      {/* <StyledTableCell align="center">
        <Avatar src={logo} sx={{
        width: 55,
        height: "auto",
        margin: "auto",
        borderRadius: 0
      }} />
      </StyledTableCell> */}



      <StyledTableCell align="center">
        {/* <BazaarSwitch color="info" checked={featuredCategory} onChange={() => setFeaturedCategory(state => !state)} /> */}
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={handleNavigate}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
};
export default AgentRow;