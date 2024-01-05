import { useState } from "react";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import BazaarSwitch from "components/BazaarSwitch";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../StyledComponents";
import {DeleteAgent ,FetchAgents} from '../../../../redux/agentApiRequest'
import {useDispatch} from 'react-redux'
// ========================================================================

// ========================================================================

const AgentRow = ({
  agent,
  selected
}) => {
  const {
    username,
    address,
    phoneNumber,
    email,
   
   
    id,
    
  } = agent;


  console.log(agent)

const dispatch =useDispatch()

const handleDelete =async()=>{

await DeleteAgent(id)
await FetchAgents(dispatch)


}




  const router = useRouter();
//   const [featuredCategory, setFeaturedCategory] = useState(featured);
  const isItemSelected = selected.indexOf(username) !== -1;
  const handleNavigate = () => router.push(`/admin/agent/${id}`);
  return <StyledTableRow tabIndex={-1} role="checkbox" selected={isItemSelected}>
      <StyledTableCell align="center">#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align="center">{username}</StyledTableCell>

      <StyledTableCell align="center">{email}</StyledTableCell>
      {/* <StyledTableCell align="center">{address}</StyledTableCell> */}
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

        <StyledIconButton onClick={handleDelete}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
};
export default AgentRow;