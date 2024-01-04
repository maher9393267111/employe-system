import { Button, Container, TextField } from "@mui/material";
import { H2, H5 } from "components/Typography";
import Telegram from "components/icons/Telegram";
import { FlexRowCenter } from "components/flex-box";
const Section8 = () => {
  return <Container sx={{
    pb: "4rem"
  }}>
      <FlexRowCenter flexDirection="column">
        <Telegram sx={{
        fontSize: "2.5rem",
        color: "grey.700"
      }} />
        <H2 mt="1.5rem" mb="0.5rem" lineHeight={1.2}>
          Subscribe To Our Newsletter
        </H2>

        <H5 fontWeight="600" color="grey.600" mb="1.5rem" maxWidth="220px" textAlign="center">
          and receive $20 coupon for the first Shopping
        </H5>

        <TextField variant="outlined" placeholder="Searching for..." fullWidth InputProps={{
        sx: {
          mx: "auto",
          height: 44,
          paddingRight: 0,
          overflow: "hidden",
          color: "secondary.300",
          borderRadius: "0.5rem",
          backgroundColor: "grey.300",
          width: {
            md: "50%",
            sm: "75%"
          }
        },
        endAdornment: <Button disableElevation color="primary" variant="contained" sx={{
          px: "3rem",
          height: "100%",
          borderRadius: "0 8px 8px 0"
        }}>
                SUBSCRIBE
              </Button>
      }} />
      </FlexRowCenter>
    </Container>;
};
export default Section8;