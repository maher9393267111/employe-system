import Link from "next/link";
import { Formik } from "formik";
import * as yup from "yup";
import { Place } from "@mui/icons-material";
import { Box, Button, Grid, TextField } from "@mui/material";
import Card1 from "components/Card1";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/address";

// =============================================================

// =============================================================

const AddressEditor = ({
  address
}) => {
  const INITIAL_VALUES = {
    name: address.title || "",
    address: address.street || "",
    contact: address.phone || ""
  };
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    address: yup.string().required("required"),
    contact: yup.string().required("required")
  });

  // handle form submit
  const handleFormSubmit = async values => {
    console.log(values);
  };

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = <Link href="/address" passHref>
      <Button color="primary" sx={{
      bgcolor: "primary.light",
      px: 4
    }}>
        Back to Address
      </Button>
    </Link>;
  return <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader icon={Place} button={HEADER_LINK} title="Edit Address" navigation={<CustomerDashboardNavigation />} />

      {/* FORM AREA */}
      <Card1>
        <Formik onSubmit={handleFormSubmit} initialValues={INITIAL_VALUES} validationSchema={checkoutSchema}>
          {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField fullWidth name="name" label="Name" onBlur={handleBlur} value={values.name} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField fullWidth name="address" onBlur={handleBlur} label="Address Line" value={values.address} onChange={handleChange} error={!!touched.address && !!errors.address} helperText={touched.address && errors.address} />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField fullWidth label="Phone" name="contact" onBlur={handleBlur} value={values.contact} onChange={handleChange} error={!!touched.contact && !!errors.contact} helperText={touched.contact && errors.contact} />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>}
        </Formik>
      </Card1>
    </CustomerDashboardLayout>;
};
export const getStaticPaths = async () => {
  const paths = await api.getIds();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking" //indicates the type of fallback
  };
};

export const getStaticProps = async ({
  params
}) => {
  const address = await api.getAddress(String(params.id));
  return {
    props: {
      address
    }
  };
};
export default AddressEditor;