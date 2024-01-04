import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { BrandForm, AgentForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
 import { useDispatch } from 'react-redux'
import { AddNewAgents } from "../../../redux/agentApiRequest"
// import api from "utils/__api__/products";

// =============================================================================
CreateAgent.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

const INITIAL_VALUES = {
  fullName: "",

  username: "",
  email: "",
  adress: "",
  phoneNumber: "",
  roles: "admin",
};

// form field validation schema
const validationSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  username: yup.string().required("required"),

  email: yup.string().email("invalid email").required("Email is required"),
  address: yup.string().required("required"),
  phoneNumber: yup.number().required("required"),
  password: yup.string().required("Password is required"),
  
});





export default function CreateAgent() {
     const dispatch = useDispatch();
  const handleFormSubmit = async(values) => {
    console.log("agent created" ,values);
     AddNewAgents(dispatch ,values)
  };
  return (
    <Box py={4}>
      <H3 mb={2}>Create New Agent</H3>

      <AgentForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
