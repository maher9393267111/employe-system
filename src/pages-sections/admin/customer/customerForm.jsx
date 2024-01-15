import { useState, useRef } from "react";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { Formik, Field, ErrorMessage, useFormik } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import { UploadImageBox, StyledClear } from "../StyledComponents";

import SignatureCanvas from "react-signature-canvas";
import ReactPlayer from "react-player";
import { init } from "i18next";
import {useSelector} from 'react-redux'
import {fetchWord} from '../../../../redux/lang/fetchword'
import { useRouter } from "next/router";

import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  UploadImage,
  UploadImages,
  UploadAudio,
} from "../../../../redux/customerApiRequest";
import { toast } from "react-toastify";
// ================================================================

// ================================================================

const CustomerForm = (props) => {
  const {
    initialValues,
    validationSchema,
    handleFormSubmit,
    slug = null,
    buttontext,
    filedit = {},
    isedit = false,
    images,
    setImages,
    audiofile,
    setAudioFile,
    signature,
    setSignature,
  } = props;
  const [files, setFiles] = useState([]);

  const [imagepreview, setImagepreview] = useState({});

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = async (files) => {
    // files.forEach((file) =>
    //   Object.assign(file, {
    //     preview: URL.createObjectURL(file),
    //   })
    // );
    // setFiles(files);

    console.log(files[0]);

    Object.assign(files[0], {
      preview: URL.createObjectURL(files[0]),
    });

    setImagepreview(files[0]);

    // const formData = new FormData();
    // formData.append("image", files[0]);

    //await UploadImage(formData)
  };

  console.log("inFORMIK", initialValues);
  //single image Upload
  const imageUpload = async (e) => {
    //let files = e.target.files;
    const files = Array.from(e.target.files);
    console.log("files", files);

    const formData = new FormData();

    (files || []).forEach((image) => {
      console.log("SINGLE", image);
      formData.append("images", image);
    });

    console.log(formData);

    const res = await UploadImages(formData);

    console.log("RES", res);

    toast.success("Images uploaded successfully");

    if (res) {
      if (images == []) {
        setImages(res);
      } else {
        setImages(res);
        //setImages((prev) => [...prev, res]);
      }
    }

    console.log("images", images);

    //single image upload

    // let file = e.target.files[0];
    // console.log(file);

    // const formData = new FormData();
    // formData.append("images", file);

    // const res = await UploadImage(formData);

    // console.log("res", res);

    // toast.success("Image uploaded successfully");
    // setImage(res);
  };

  // const { onChange, image } = useUploadImage();

  // upload Audio

  const AudioUpload = async (e) => {
    const file = e.target.files[0];
    console.log("Audio", file);

    if (file) {
      const formData = new FormData();

      formData.append("audiofile", file);

      const res = await UploadAudio(formData);
      setAudioFile(res?.link);

      toast.success("Audio file uploaded successfully");
    }
  };

  // upload Signature

  const sigCanvas = useRef();
  const create = () => {
    // const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    // setSignature(URL);
    const signature = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setSignature(signature);
  };


  const userRole = useSelector(
    (state) => state.auth.login.currentUser.payload.roles
  );

const buttonCondition = (isedit && userRole[0] === 'admin') || (!isedit)

const {locale} = useRouter()



  return (
    <Card
      sx={{
        p: 6,
      }}
    >
      <Grid item xs={12}>
        <div>

        {fetchWord("signatureAdd", locale)}

          {signature && (
            <>
              <img src={signature} alt="signature" className="signature" />
            </>
          )}
          <SignatureCanvas
            ref={sigCanvas}
            // penColor="black"
            // canvasProps={{ className: "sigCanvas" }}

            // name={name}
            penColor="black"
            canvasProps={{ className: "sigPad" }}
            // ref={sigPad}
            onEnd={create}
          />
          {/* <button onClick={create}>Create</button> */}
        </div>
      </Grid>

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
                  label={fetchWord("firstname", locale)}
                  color="info"
                  size="medium"
                  placeholder={fetchWord("firstname", locale)}
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
                  label={fetchWord("lastname", locale)}
                  color="info"
                  size="medium"
                  placeholder={fetchWord("lastname", locale)}
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
                  label={fetchWord("email", locale)}
                  color="info"
                  size="medium"
                  placeholder={fetchWord("email", locale)}
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
                  label={fetchWord("adress", locale)}
                  color="info"
                  size="medium"
                  placeholder={fetchWord("adress", locale)}
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
                  label={fetchWord("phone", locale)}
                  color="info"
                  size="medium"
                  placeholder={fetchWord("phone", locale)}
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="city"
                  label={fetchWord("city", locale)}
                  color="info"
                  size="medium"
                  placeholder={fetchWord("city", locale)}
                  value={values.city}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="zip"
                  label={fetchWord("zipcode", locale)}
                  color="info"
                  size="medium"
                  placeholder={fetchWord("zipcode", locale)}
                  value={values.zip}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.zip && !!errors.zip}
                  helperText={touched.zip && errors.zip}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="birthday"
                  label={fetchWord("birthday", locale)}
                  color="info"
                  size="medium"
                  placeholder={fetchWord("birthday", locale)}
                  value={values.birthday}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.birthday && !!errors.birthday}
                  helperText={touched.birthday && errors.birthday}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="state"
                  label={fetchWord("state", locale)}
                  color="info"
                  size="medium"
                  placeholder={fetchWord("state", locale)}
                  // value={values.address}
                  value={values.state}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.state && !!errors.state}
                  helperText={touched.state && errors.state}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="work"
                  label={fetchWord("work", locale)}
                  color="info"
                  size="medium"
                  placeholder={fetchWord("work", locale)}
                  // value={values.address}
                  value={values.work}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.work && !!errors.work}
                  helperText={touched.work && errors.work}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="date"
                  label={fetchWord("date", locale)}
                  color="info"
                  size="medium"
                  placeholder={fetchWord("date", locale)}
                  // value={values.address}
                  value={values.date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.date && !!errors.date}
                  helperText={touched.date && errors.date}
                />
              </Grid>





              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="ssn"
                  label="ssn"
                  color="info"
                  size="medium"
                  placeholder="ssn"
                  value={values.ssn}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.ssn && !!errors.ssn}
                  helperText={touched.ssn && errors.ssn}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                select fullWidth color="info" size="medium" name="gender" onBlur={handleBlur} placeholder="Category" label={fetchWord("gender", locale)}
                
                onChange={handleChange} value={values.gender} error={Boolean(errors.gender && touched.gendery)} helperText={touched.gender && errors.category}
                >
                  <MenuItem color="info" value={"male"}>{fetchWord("male", locale)}</MenuItem>
                  <MenuItem color="info" value={"female"}>{fetchWord("female", locale)}</MenuItem>
                </TextField>




              </Grid>

              <Grid item xs={12}>
                <div
                
                // flexDirection="row" mt={2} flexWrap="wrap" gap={1}
                
                
                >
                  {!isedit && (
                    <Box mb="5">
                      <FormControl>
                        <FormLabel htmlFor="imageUpload" fontWeight={"bold"}>
                        {fetchWord("images", locale)}
                          <Box as="span" color="red.500">
                            *
                          </Box>
                        </FormLabel>
                        <FormLabel
                          border="2px dashed lightgrey"
                          h="110px"
                          w="100%"
                          textAlign={"center"}
                          onChange={imageUpload}
                          htmlFor="imageUpload"
                        >
                          <Text mt="8" color="gray">
                          {fetchWord("uploadDocs", locale)}
                          </Text>

                          <Field
                            as={Input}
                            type="file"
                            name="document_url"
                            accept={["application/*, image/*"]}
                            display="none"
                            id="imageUpload"
                            multiple
                          />
                        </FormLabel>
                      </FormControl>
                      <ErrorMessage
                        name={"document_url"}
                        render={(msg) => (
                          <Box
                            fontSize={"sm"}
                            color={"red.500"}
                            mt={1}
                            textAlign={"left"}
                          >
                            {msg}
                          </Box>
                        )}
                      />
                    </Box>


                    
        


                  )}
                </div>

                <div>
                  {!isedit && (
                    <Box mb="5">
                      <FormControl>
                        <FormLabel htmlFor="imageUpload" fontWeight={"bold"}>
                          {fetchWord("audiofile", locale)}
                          <Box as="span" color="red.500">
                            *
                          </Box>
                        </FormLabel>
                        <FormLabel
                          border="2px dashed lightgrey"
                          h="110px"
                          w="100%"
                          textAlign={"center"}
                          htmlFor="imageUpload"
                        >
                          <Text mt="8" color="gray">
                          {fetchWord("uploadAudio", locale)}
                          </Text>

                          <Field
                            as={Input}
                          
                            // display="none"
                            type="file"
                            name="music"
                            accept="audio/*"
                            onChange={AudioUpload}
                          />
                        </FormLabel>
                      </FormControl>
                      <ErrorMessage
                        name={"document_url"}
                        render={(msg) => (
                          <Box
                            fontSize={"sm"}
                            color={"red.500"}
                            mt={1}
                            textAlign={"left"}
                          >
                            {msg}
                          </Box>
                        )}
                      />
                    </Box>
                  )}
                </div>
              </Grid>

              {/* <Grid item sm={6} xs={12}>
                <FormControlLabel label="Featured Category" control={<Checkbox color="info" name="featured" onBlur={handleBlur} onChange={handleChange} value={values.featured} />} />
              </Grid> */}

              {/* show images in edit page only--- */}

              <Grid item sm={6} xs={12}>
                <div style={{ display: "flex", gap: "12px" }}>
                  {isedit &&
                    images?.length > 0 &&
                    images?.map((item, index) => {
                      return (
                        <div>
                          <img
                            style={{
                              objectFit: "cover",
                              height: "50px",
                              width: "50px",
                            }}
                            className=""
                            src={item.link}
                            alt=""
                          />
                        </div>
                      );
                    })}
                </div>
              </Grid>

              {/* show audio file--- */}

              <div style={{ marginTop: "13px" }}>
                <ReactPlayer
                  url={audiofile}
                  width="400px"
                  height="50px"
                  playing={false}
                  controls={true}
                />
              </div>

              {buttonCondition  &&


              <Grid item xs={12}>
                <Button variant="contained" color="info" type="submit">
                  {/* Save Agent */}
                  {buttontext}
                </Button>
              </Grid>




         } 


            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};
export default CustomerForm;
