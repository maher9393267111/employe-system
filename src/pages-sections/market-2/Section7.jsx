import { Box, Container, styled } from "@mui/material";
import WhiteButton from "components/WhiteButton";
import { H3, Paragraph, Span } from "components/Typography";
const BannerWrapper = styled(Box)(({
  theme
}) => ({
  gap: "5rem",
  padding: "2rem",
  display: "flex",
  flexWrap: "wrap",
  overflow: "hidden",
  borderRadius: "3px",
  alignItems: "center",
  backgroundSize: "cover",
  justifyContent: "flex-end",
  backgroundPosition: "center left",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(/assets/images/banners/long-banner.jpg)`,
  [theme.breakpoints.down("md")]: {
    gap: "1rem",
    flexDirection: "column",
    justifyContent: "center"
  }
}));
const Section7 = () => {
  return <Container sx={{
    my: 8
  }}>
      <BannerWrapper>
        <Box textAlign="center">
          <H3 fontSize={{
          sm: 36,
          xs: 28
        }} lineHeight={1}>
            GIFT <Span color="primary.main">50% OFF</Span> PERFECT STYLES
          </H3>
          <Paragraph fontSize={16}>
            Only until the end of this week. Terms and conditions apply
          </Paragraph>
        </Box>

        <WhiteButton size="large">Discover Now</WhiteButton>
      </BannerWrapper>
    </Container>;
};
export default Section7;