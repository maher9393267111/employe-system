import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Formik ,Field ,ErrorMessage, useFormik  } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import { UploadImageBox, StyledClear } from "../StyledComponents";

import { init } from "i18next";

import { Box, Divider, FormControl, FormLabel, Heading, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { UploadImage } from "../../../../redux/customerApiRequest";
import {toast} from 'react-toastify'
// ================================================================

// ================================================================

const CustomerForm = (props) => {
  const {
    initialValues,
    validationSchema,
    handleFormSubmit,
    slug = null,
    buttontext,
    filedit ={},
    isedit =false,
    image ,
    setImage
  } = props;
  const [files, setFiles] = useState([]);

  const [imagepreview  ,setImagepreview] = useState({})

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = async(files) => {
    // files.forEach((file) =>
    //   Object.assign(file, {
    //     preview: URL.createObjectURL(file),
    //   })
    // );
    // setFiles(files);

  


    console.log(files[0])

    Object.assign(files[0], {
           preview: URL.createObjectURL(files[0]),
         })


setImagepreview(files[0])

// const formData = new FormData();
// formData.append("image", files[0]);

//await UploadImage(formData)


  };

  console.log("inFORMIK", initialValues);

 



  const imageUpload =async(e) => {
    let file = e.target.files[0];
   console.log(file)

    const formData = new FormData();
 formData.append("image", file);

 const res =await UploadImage(formData)

   console.log('res' ,res)

   

    toast.success('Image uploadedsuccessfully')
    setImage(res)
   





  };




 


  // const { onChange, image } = useUploadImage();


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
            

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
             

                {!isedit && (
              <Box mb="5">
                <FormControl>
                  <FormLabel htmlFor="imageUpload" fontWeight={"bold"}>
                    Document{" "}
                    <Box as="span" color="red.500">
                      *
                    </Box>
                  </FormLabel>
                  <FormLabel border="2px dashed lightgrey" h="110px" w="100%" textAlign={"center"} onChange={imageUpload} htmlFor="imageUpload">
                    <Text mt="8" color="gray">
                      {image?.preview ? image?.file?.name : "Upload Document"}
                    </Text>
                    <Field as={Input} type="file" name="document_url" accept={["application/*, image/*"]} display="none" id="imageUpload" />
                  </FormLabel>
                </FormControl>
                <ErrorMessage
                  name={"document_url"}
                  render={(msg) => (
                    <Box fontSize={"sm"} color={"red.500"} mt={1} textAlign={"left"}>
                      {msg}
                    </Box>
                  )}
                />
              </Box>
            )}








                </FlexBox>




              </Grid>




              {/* <Grid item sm={6} xs={12}>
                <FormControlLabel label="Featured Category" control={<Checkbox color="info" name="featured" onBlur={handleBlur} onChange={handleChange} value={values.featured} />} />
              </Grid> */}

              <Grid item xs={12}>
                <Button variant="contained" color="info" type="submit">
                  {/* Save Agent */}
                  {buttontext}
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
