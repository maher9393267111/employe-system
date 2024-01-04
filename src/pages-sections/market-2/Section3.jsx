import { Box, Container, Grid, styled } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { slideX } from "animations/keyframes";
import WhiteButton from "components/WhiteButton";
import { H3, Paragraph, Span } from "components/Typography";
import CategoryCard1 from "components/category-cards/CategoryCard1";
// custom styled components
const AdWrapper = styled(FlexBox)(({
  theme
}) => ({
  color: "#fff",
  marginTop: "3rem",
  overflow: "hidden",
  backgroundColor: "#434343",
  position: "relative",
  "::before": {
    inset: 5,
    zIndex: 3,
    content: "''",
    position: "absolute",
    border: "1px dashed #fff"
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column"
  }
}));
const AdTitle1 = styled(H3)(({
  theme
}) => ({
  zIndex: 10,
  fontSize: 27,
  padding: "1.5rem",
  position: "relative",
  backgroundColor: "#e0e0e0",
  textTransform: "uppercase",
  color: theme.palette.dark.main,
  "::after": {
    top: -36,
    bottom: 0,
    zIndex: -1,
    right: -17,
    content: "''",
    position: "absolute",
    transform: "rotate(23deg)",
    border: "70px solid #e0e0e0"
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: 16,
    "::after": {
      display: "none"
    }
  }
}));

// ===========================================================

// ===========================================================

const Section3 = ({
  categories
}) => {
  return <Container sx={{
    mt: 8
  }}>
      <Grid container spacing={3}>
        {categories.map(item => <Grid item lg={2} md={3} sm={4} xs={6} key={item.id}>
            <CategoryCard1 image={item.image} title={item.name} />
          </Grid>)}

        <Grid item xs={12}>
          <AdWrapper alignItems="center">
            <AdTitle1>Black friday sale!</AdTitle1>

            <Paragraph fontSize={28} sx={{
            flex: 1,
            zIndex: 5,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "hidden"
          }}>
              <Span sx={{
              letterSpacing: 1.3,
              fontStyle: "italic",
              position: "relative",
              whiteSpace: "nowrap",
              textOverflow: "hidden",
              textTransform: "uppercase",
              animation: `${slideX} 30s infinite linear 1s`
            }}>
                Pay only for{" "}
                <Span fontWeight={700} textTransform="uppercase" sx={{
                textOverflow: "hidden",
                whiteSpace: "nowrap"
              }}>
                  your loving electronics
                </Span>
              </Span>
            </Paragraph>

            <Box sx={{
            padding: 3,
            flexShrink: 0,
            zIndex: 5
          }}>
              <WhiteButton>Shop Now</WhiteButton>
            </Box>
          </AdWrapper>
        </Grid>
      </Grid>
    </Container>;
};
export default Section3;