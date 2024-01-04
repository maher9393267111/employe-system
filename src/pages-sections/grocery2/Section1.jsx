import { Box, Grid, styled } from "@mui/material";
import AppStore from "components/AppStore";
import LazyImage from "components/LazyImage";
import { H1, H5, H6 } from "components/Typography";
import Carousel from "components/carousel/Carousel";
// styled components
const StyledBox = styled(Box)({
  overflow: "hidden",
  borderRadius: "8px",
  "& .carousel-dot": {
    position: "absolute",
    bottom: "30px",
    left: "40px"
  }
});
const StyledGrid = styled(Grid)(({
  theme
}) => ({
  position: "relative",
  alignItems: "center",
  padding: "2rem 1rem 5rem 40px",
  backgroundColor: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse"
  }
}));
const GridItemOne = styled(Grid)({
  color: "white"
});
const GridItemTwo = styled(Grid)(({
  theme
}) => ({
  [theme.breakpoints.down("sm")]: {
    padding: "1.8rem"
  }
}));

// ========================================================================

// ========================================================================

const Section1 = ({
  carouselData
}) => {
  return <StyledBox>
      <Carousel totalSlides={3} visibleSlides={1} showDots={true} showArrow={false} autoPlay={false} dotClass="carousel-dot" dotColor="white" spacing="0px">
        {carouselData.map(item => <StyledGrid container key={item.id}>
            <GridItemOne item md={7} sm={7} xs={12}>
              <H1 maxWidth="280px" mb={1} lineHeight="1.27">
                {item.title}
              </H1>
              <H6 maxWidth="470px" color="inherit" fontWeight="400" mb={5}>
                {item.description}
              </H6>

              <H5 fontSize="18px" fontWeight="700" mb={2.5}>
                Try our mobile app!
              </H5>

              <AppStore />
            </GridItemOne>

            <GridItemTwo item md={5} sm={5} xs={12}>
              <LazyImage priority width={570} height={360} src={item.imgUrl} alt={item.title} />
            </GridItemTwo>
          </StyledGrid>)}
      </Carousel>
    </StyledBox>;
};
export default Section1;