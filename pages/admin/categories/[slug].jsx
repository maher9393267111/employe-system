import { useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { CategoryForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
// import api from "utils/__api__/products";

// =============================================================================
EditCategory.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

const INITIAL_VALUES = {
  name: "",
  parent: [],
  featured: false
};

// form field validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("required")
});
export default function EditCategory() {
  const {
    query
  } = useRouter();
  const [category, setCategory] = useState({
    ...INITIAL_VALUES
  });

  // useEffect(() => {
  //   api.getProduct(query.slug as string).then((data) => {
  //     setProduct((state) => ({
  //       ...state,
  //       name: data.title,
  //       price: data.price,
  //       category: data.categories,
  //     }));
  //   });
  // }, [query.slug]);

  const handleFormSubmit = () => {};
  return <Box py={4}>
      <H3 mb={2}>Edit Category</H3>

      <CategoryForm initialValues={category} validationSchema={validationSchema} handleFormSubmit={handleFormSubmit} />
    </Box>;
}