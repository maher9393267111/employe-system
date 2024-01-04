import { Button } from "@mui/material";
import { FlexRowCenter } from "components/flex-box";
import { H1, H3, Paragraph, Span } from "components/Typography";
const Section7 = () => {
  return <FlexRowCenter mt={8} flexDirection="column" sx={{
    color: "#fff",
    textAlign: "center",
    padding: "6rem 2rem",
    backgroundSize: "cover",
    backgroundColor: "grey.500",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(/assets/images/banners/banner-11.jpg)"
  }}>
      <H3 fontWeight={400} fontSize={30} lineHeight={1}>
        Extra <Span color="primary.main">30% Off</Span> Online
      </H3>

      <H1 fontSize={50} lineHeight={1} mb={1}>
        Summer Season Sale
      </H1>

      <Paragraph fontWeight={600} fontSize={18} mb={4}>
        Free shipping on orders over $99
      </Paragraph>

      <Button variant="contained" size="large" color="dark">
        Shop Now
      </Button>
    </FlexRowCenter>;
};
export default Section7;