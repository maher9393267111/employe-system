import Link from "next/link";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as yup from "yup";
import { CameraEnhance, Person } from "@mui/icons-material";
import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/users";
// ===========================================================

const ProfileEditor = ({
  user
}) => {
  const router = useRouter();
  const INITIAL_VALUES = {
    email: user.email || "",
    contact: user.phone || "",
    last_name: user.name.lastName || "",
    first_name: user.name.firstName || "",
    birth_date: user.dateOfBirth || new Date()
  };
  const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup.string().required("required"),
    birth_date: yup.date().required("invalid date")
  });
  const handleFormSubmit = async values => {
    console.log(values);
  };

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = <Link href="/profile" passHref>
      <Button color="primary" sx={{
      px: 4,
      bgcolor: "primary.light"
    }}>
        Back to Profile
      </Button>
    </Link>;

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader icon={Person} title="Edit Profile" button={HEADER_LINK} navigation={<CustomerDashboardNavigation />} />

      {/* PROFILE EDITOR FORM */}
      <Card1>
        <FlexBox alignItems="flex-end" mb={3}>
          <Avatar src="/assets/images/faces/ralph.png" sx={{
          height: 64,
          width: 64
        }} />

          <Box ml={-2.5}>
            <label htmlFor="profile-image">
              <Button component="span" color="secondary" sx={{
              p: "8px",
              height: "auto",
              bgcolor: "grey.300",
              borderRadius: "50%"
            }}>
                <CameraEnhance fontSize="small" />
              </Button>
            </label>
          </Box>

          <Box display="none">
            <input onChange={e => console.log(e.target.files)} id="profile-image" accept="image/*" type="file" />
          </Box>
        </FlexBox>

        <Formik onSubmit={handleFormSubmit} initialValues={INITIAL_VALUES} validationSchema={checkoutSchema}>
          {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        }) => <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField fullWidth name="first_name" label="First Name" onBlur={handleBlur} onChange={handleChange} value={values.first_name} error={!!touched.first_name && !!errors.first_name} helperText={touched.first_name && errors.first_name} />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField fullWidth name="last_name" label="Last Name" onBlur={handleBlur} onChange={handleChange} value={values.last_name} error={!!touched.last_name && !!errors.last_name} helperText={touched.last_name && errors.last_name} />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField fullWidth name="email" type="email" label="Email" onBlur={handleBlur} value={values.email} onChange={handleChange} error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField fullWidth label="Phone" name="contact" onBlur={handleBlur} value={values.contact} onChange={handleChange} error={!!touched.contact && !!errors.contact} helperText={touched.contact && errors.contact} />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker label="Birth Date" maxDate={new Date()} value={values.birth_date} inputFormat="dd MMMM, yyyy" renderInput={props => <TextField fullWidth size="small" helperText={touched.birth_date && errors.birth_date} error={!!touched.birth_date && !!errors.birth_date || props.error} {...props} />} onChange={newValue => setFieldValue("birth_date", newValue)} />
                    </LocalizationProvider>
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
  const paths = await api.getUserIds();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking" //indicates the type of fallback
  };
};

export const getStaticProps = async () => {
  const user = await api.getUser();
  return {
    props: {
      user
    }
  };
};
export default ProfileEditor;