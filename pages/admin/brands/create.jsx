import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { BrandForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
// import api from "utils/__api__/products";

// =============================================================================
CreateBrand.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

const INITIAL_VALUES = {
  name: "",
  featured: false
};

// form field validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("required")
});
export default function CreateBrand() {
  const handleFormSubmit = () => {};
  return <Box py={4}>
      <H3 mb={2}>Create New Brand</H3>

      <BrandForm initialValues={INITIAL_VALUES} validationSchema={validationSchema} handleFormSubmit={handleFormSubmit} />
    </Box>;
}