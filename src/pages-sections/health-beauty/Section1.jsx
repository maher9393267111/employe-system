import { Box, Button, Grid, styled, useTheme } from "@mui/material";
import { H1 } from "components/Typography";
import LazyImage from "components/LazyImage";
import Carousel from "components/carousel/Carousel";
// styled components
const StyledBox = styled(Box)({
  overflow: "hidden",
  backgroundColor: "#efefef",
  "& .carousel-dot": {
    left: 0,
    right: 0,
    bottom: "30px",
    margin: "auto",
    position: "absolute"
  }
});
const StyledGrid = styled(Grid)(({
  theme
}) => ({
  margin: "auto",
  maxWidth: 1200,
  position: "relative",
  alignItems: "center",
  padding: "2rem 0px 5rem 0px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse"
  }
}));
const GridItemOne = styled(Grid)(({
  theme
}) => ({
  padding: 20,
  "& .titleBox": {
    marginBottom: 30,
    "& h1": {
      fontSize: 35,
      lineHeight: 1.3
    }
  },
  [theme.breakpoints.down("md")]: {
    "& .titleBox": {
      "& h1": {
        fontSize: 30
      }
    }
  },
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    "& .titleBox": {
      textAlign: "center",
      "& h1": {
        fontSize: 25
      }
    }
  }
}));
const StyledButton = styled(Button)(({
  theme
}) => ({
  color: "#fff",
  fontWeight: 400,
  fontSize: "14px",
  background: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.primary[400]
  }
}));
const GridItemTwo = styled(Grid)(({
  theme
}) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}));

// ==========================================================================

// ==========================================================================

const Section1 = ({
  carouselData
}) => {
  const {
    palette
  } = useTheme();
  return <StyledBox id="carouselBox">
      <Carousel spacing="0px" totalSlides={3} showDots={true} autoPlay={false} showArrow={false} visibleSlides={1} dotClass="carousel-dot" dotColor={palette.primary.main}>
        {carouselData.map(item => <StyledGrid container key={item.id}>
            <GridItemOne item md={7} sm={7} xs={12}>
              <Box className="titleBox">
                <H1 maxWidth={380}>{item.title}</H1>
              </Box>

              <StyledButton variant="contained" sx={{
            px: "25px"
          }}>
                Shop Now
              </StyledButton>
            </GridItemOne>

            <GridItemTwo item md={5} sm={5} xs={12}>
              <LazyImage priority width={570} height={360} src={item.imgUrl} alt={item.title} />
            </GridItemTwo>
          </StyledGrid>)}
      </Carousel>
    </StyledBox>;
};
export default Section1;