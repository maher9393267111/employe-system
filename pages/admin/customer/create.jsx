import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { CustomerForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useDispatch ,useSelector } from "react-redux";
import { AddCustomer} from "../../../redux/customerApiRequest";

// import api from "utils/__api__/products";

// =============================================================================
CreateCustomer.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================



const INITIAL_VALUES = {
  firstName:"",
  lastName:"",
  email: "",
  address: "",
  phoneNumber: "",
};

// form field validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),

  email: yup.string().email("invalid email").required("Email is required"),
  address: yup.string().required("required"),
  phoneNumber: yup.number().required("required"),
});

export default function CreateCustomer() {
  const dispatch = useDispatch();
  const agentId = useSelector((state) => state.auth?.login?.currentUser?.payload?.id);

console.log('id' ,agentId)
  const handleFormSubmit = async (values) => {
    console.log("Customer Create", values);
    dispatch(AddCustomer(values ,agentId))
  };
  return (
    <Box py={4}>
      <H3 mb={2}>Create New Customer</H3>

      <CustomerForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
