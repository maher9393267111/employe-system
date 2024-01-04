import { useCallback, useState } from "react";
import { Button, Card, Box, styled } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import axios from 'axios'
import { loginUser } from '../../../redux/apiRequest';
import { useEffect } from 'react';
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
const fbStyle = {
  background: "#3B5998",
  color: "white"
};
const googleStyle = {
  background: "#4285F4",
  color: "white"
};
export const Wrapper = styled(({
  children,
  passwordVisibility,
  ...rest
}) => <Card {...rest}>{children}</Card>)(({
  theme,
  passwordVisibility
}) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%"
  },
  ".passwordEye": {
    color: passwordVisibility ? theme.palette.grey[600] : theme.palette.grey[400]
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle
  },
  ".googleButton": {
    ...googleStyle,
    "&:hover": googleStyle
  },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24
  }
}));
const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility(visible => !visible);
  }, []);


  const router =useRouter()
  const dispatch = useDispatch();


  const { handleSubmit, handleChange, values, touched, errors, handleBlur ,setErrors } =
  useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema:formSchema ,
    onSubmit: async (values) => {
console.log("start")
      loginUser(values, dispatch, router, setErrors);
    },
  });




  useEffect(() => {
    const user = JSON.parse(JSON.parse(window.localStorage.getItem('persist:root'))?.auth)?.login?.currentUser;
    if (user !== null) {
        router.push('/admin/agent');
    }
}, [router]);




  return <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form
       onSubmit=
     
       {handleSubmit}
     
       >
        <BazaarImage src="/assets/images/bazaar-black-sm.svg" sx={{
        m: "auto"
      }} />

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Welcome To Bazaars
        </H1>

{values.username}

        <BazaarTextField mb={1.5} fullWidth name="username" size="small" label="Full Name" variant="outlined" onBlur={handleBlur} value={values.username} onChange={handleChange} placeholder="Ralph Adwards" error={!!touched.name && !!errors.username} helperText={touched.username && errors.username} />

{/* 

        <BazaarTextField mb={1.5} fullWidth name="email" size="small" type="email" variant="outlined" onBlur={handleBlur} value={values.email} onChange={handleChange} label="Email or Phone Number" placeholder="exmple@mail.com" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} /> */}





        <BazaarTextField mb={2} fullWidth size="small" name="password" label="Password" autoComplete="on" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.password} placeholder="*********" type={passwordVisibility ? "text" : "password"} error={!!touched.password && !!errors.password} helperText={touched.password && errors.password} InputProps={{
        endAdornment: <EyeToggleButton show={passwordVisibility} click={togglePasswordVisibility} />
      }} />

        <Button fullWidth type="submit" color="primary" variant="contained" sx={{
        height: 44
      }}>
          Login
        </Button>
      </form>

      <SocialButtons />

      <FlexRowCenter mt="1.25rem">
        <Box>Don&apos;t have account?</Box>
        <Link href="/signup" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Sign Up
            </H6>
          </a>
        </Link>
      </FlexRowCenter>

      <FlexBox justifyContent="center" bgcolor="grey.200" borderRadius="4px" py={2.5} mt="1.25rem">
        Forgot your password?
        <Link href="/reset-password" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Reset It
            </H6>
          </a>
        </Link>
      </FlexBox>
    </Wrapper>;
};
const initialValues = {
  email: "",
  password: ""
};
const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  // email: yup.string().email("invalid email").required("Email is required"),
  username :yup.string().required("userName is requeired")
});


export default Login;