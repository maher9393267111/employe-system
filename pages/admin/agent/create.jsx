import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { BrandForm, AgentForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AddNewAgents } from "../../../redux/agentApiRequest";
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
  roles: "staff",
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
  const handleFormSubmit = async (values) => {
    console.log("agent created", values);
    AddNewAgents(values);
  };

  const router = useRouter();

  const userRole = useSelector(
    (state) => state.auth.login.currentUser.payload.roles
  );

  useEffect(() => {
    if (userRole[0] !== "admin") {
      router.push("/admin/customers");
    }
  }, [router]);


  

  return (
    <Box py={4}>
      <H3 mb={2}>Create New Agent</H3>

      {userRole}
      <AgentForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
