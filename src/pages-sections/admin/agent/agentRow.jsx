import { useState } from "react";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import BazaarSwitch from "components/BazaarSwitch";
import {
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "../StyledComponents";
import { DeleteAgent } from "../../../../redux/agentApiRequest";
import { useDispatch } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';

// ========================================================================

// ========================================================================

const AgentRow = ({ agent, selected ,userRole  }) => {
  const {
    username,
    address,
    phoneNumber,
    email,

    id,
  } = agent;

  console.log(agent);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(DeleteAgent(id));
  };

  const router = useRouter();
  //   const [featuredCategory, setFeaturedCategory] = useState(featured);
  const isItemSelected = selected.indexOf(username) !== -1;
  const handleNavigate = () => router.push(`/admin/agent/${id}`);
  return (
    <StyledTableRow tabIndex={-1} role="checkbox" selected={isItemSelected}>
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

      {/* <StyledTableCell align="center">
        <BazaarSwitch color="info" checked={featuredCategory} onChange={() => setFeaturedCategory(state => !state)} />
      </StyledTableCell> */}

      <StyledTableCell align="center">


      <StyledIconButton
      onClick={handleNavigate}
       >
          <EditIcon />
        </StyledIconButton>


        <StyledIconButton onClick={()=>router.push(`/admin/customer?agent=${id}`)} >
          <RemoveRedEye />
        </StyledIconButton>

    



{/* //onClick={()=>router.push(`/admin/customer?agent=${id}`) */}

{userRole[0] === 'admin' &&

        <StyledIconButton onClick={handleDelete}>
          <Delete />
        </StyledIconButton>
}



      </StyledTableCell>
    </StyledTableRow>
  );
};
export default AgentRow;
