import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";
import { Formik } from "formik";
import { CreditCard } from "@mui/icons-material";
import { Box, Button, Grid, TextField } from "@mui/material";
import Card1 from "components/Card1";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
const PaymentMethodEditor = () => {
  const {
    query
  } = useRouter();
  const INITIAL_VALUES = {
    exp: "",
    cvc: "",
    name: "",
    card_no: ""
  };
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    card_no: yup.string().required("required"),
    exp: yup.string().required("required"),
    cvc: yup.string().required("required")
  });
  const handleFormSubmit = async values => {
    console.log(values);
  };

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = <Link href="/payment-methods" passHref>
      <Button color="primary" sx={{
      bgcolor: "primary.light",
      px: "2rem"
    }}>
        Back to Payment Methods
      </Button>
    </Link>;
  return <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader icon={CreditCard} button={HEADER_LINK} title={`${query.id === "add" ? "Add New" : "Edit"} Payment Method`} />

      {/* PAYMENT DETAILS EDIT FORM */}
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
                    <TextField name="card_no" label="Card Number" fullWidth onBlur={handleBlur} onChange={handleChange} value={values.card_no || ""} error={!!touched.card_no && !!errors.card_no} helperText={touched.card_no && errors.card_no} />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField name="name" label="Name on Card" fullWidth onBlur={handleBlur} onChange={handleChange} value={values.name || ""} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField name="exp" label="Exp. Date" fullWidth onBlur={handleBlur} onChange={handleChange} value={values.exp || ""} error={!!touched.exp && !!errors.exp} helperText={touched.exp && errors.exp} />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField name="cvc" label="CVC" fullWidth onBlur={handleBlur} onChange={handleChange} value={values.cvc || ""} error={!!touched.cvc && !!errors.cvc} helperText={touched.cvc && errors.cvc} />
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
export default PaymentMethodEditor;