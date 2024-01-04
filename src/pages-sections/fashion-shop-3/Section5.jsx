import { Box, Container, Divider, styled } from "@mui/material";
import { FlexRowCenter } from "components/flex-box";
import { H2, H3, H4, Span } from "components/Typography";

// custom styled components
const Wrapper = styled(Box)(({
  theme
}) => ({
  rowGap: "1rem",
  padding: "3rem",
  display: "flex",
  flexWrap: "wrap",
  columnGap: "4rem",
  alignItems: "center",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundImage: "url(/assets/images/banners/banner-14.jpg)",
  ":hover": {
    "& .offer": {
      transform: "rotate(-15deg) scale(1.1)"
    }
  },
  ...(theme.direction === "rtl" && {
    justifyContent: "right",
    textAlign: "right"
  })
}));
const OfferBox = styled(FlexRowCenter)(({
  theme
}) => ({
  width: 140,
  height: 140,
  color: "#fff",
  borderRadius: "50%",
  textAlign: "center",
  transform: "rotate(-15deg)",
  transition: "all 0.3s",
  border: `2px solid ${theme.palette.grey[600]}`
}));
const Section5 = () => {
  return <Container sx={{
    mt: 8
  }}>
      <Wrapper>
        <Box sx={{
        width: "min-content",
        color: "#fff"
      }}>
          <H4 fontSize={20}>END OF SEASON</H4>
          <Divider sx={{
          borderColor: "grey.500",
          mb: 0.3
        }} />
          <H2 fontSize={75} lineHeight={1}>
            SALE
          </H2>
        </Box>

        <OfferBox className="offer">
          <H3 lineHeight={1} fontSize={17}>
            AT UP TO{" "}
            <Span fontSize={32} color="primary.main">
              50%
            </Span>{" "}
            OFF
          </H3>
        </OfferBox>
      </Wrapper>
    </Container>;
};
export default Section5;