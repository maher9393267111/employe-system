import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import { UploadImageBox, StyledClear } from "../StyledComponents";
import { init } from "i18next";

// ================================================================

// ================================================================

const CustomerForm = (props) => {
  const {
    initialValues,
    validationSchema,
    handleFormSubmit,
    slug = null,
  } = props;
  const [files, setFiles] = useState([]);

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = (files) => {
    files.forEach((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(files);
  };

  console.log("inFORMIK", initialValues);

  // HANDLE DELETE UPLOAD IMAGE
  const handleFileDelete = (file) => () => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
  };
  return (
    <Card
      sx={{
        p: 6,
      }}
    >
  



      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues ?? {}}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="firstName"
                  label="firstName"
                  color="info"
                  size="medium"
                  placeholder="firstName"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="lastName"
                  label="lastName"
                  color="info"
                  size="medium"
                  placeholder="lastName"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>


              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  color="info"
                  size="medium"
                  placeholder="Email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="fullName"
                  label="fullName"
                  color="info"
                  size="medium"
                  placeholder="fullName"
                  value={values.fullName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.fullName && !!errors.fullName}
                  helperText={touched.fullName && errors.fullName}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  // value={values.address}
                  value={values.address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  label="phone"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Grid>

             

              <Grid item xs={12}>
                <DropZone
                  title="Drop & drag category image"
                  onChange={(files) => handleChangeDropZone(files)}
                />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                    return (
                      <UploadImageBox key={index}>
                        <BazaarImage src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file)} />
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
              </Grid>

              {/* <Grid item sm={6} xs={12}>
                <FormControlLabel label="Featured Category" control={<Checkbox color="info" name="featured" onBlur={handleBlur} onChange={handleChange} value={values.featured} />} />
              </Grid> */}

              <Grid item xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Save Agent
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>





    </Card>
  );
};
export default CustomerForm;
