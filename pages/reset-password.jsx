import Link from "next/link";
import SEO from "components/SEO";
import { Box, Button, Card, TextField } from "@mui/material";
import { H1, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import {ForgetPassword} from '../redux/apiRequest'
import {useDispatch} from 'react-redux'
import {useState} from 'react'

const ResetPassword = () => {

const dispatch =useDispatch()

const [email,setEmail] = useState("")


const ForgetHandler=(e)=>{

  e.preventDefault();
dispatch(ForgetPassword(email))

}




  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <SEO title="Reset Password" />

      <Card
        sx={{
          padding: 4,
          maxWidth: 600,
          marginTop: 4,
          boxShadow: 1,
        }}
      >
        <H1 fontSize={20} fontWeight={700} mb={4} textAlign="center">
          Reset your password
        </H1>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my={2}>
          <form
            style={{
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              //   onBlur={handleBlur}
              //   value={values.email}
              //   onChange={handleChange}
              //   error={Boolean(touched.email && errors.email)}
              //   helperText={touched.email && errors.email}
            />

            <Box
              sx={{
                mt: 2,
              }}
            >
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                onClick={ForgetHandler}
              >
                Reset
              </Button>
            </Box>
          </form>

          <FlexRowCenter mt="1.25rem" justifyContent="center" width="100%">
            <Box>Don&apos;t have account?</Box>
            <Link href="/signup" passHref legacyBehavior>
              <a>
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  Sign Up
                </H6>
              </a>
            </Link>
          </FlexRowCenter>
        </FlexBox>
      </Card>
    </FlexRowCenter>
  );
};
export default ResetPassword;
