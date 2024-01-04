import { Box, Container, Grid } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import { CarouselCard3 } from "components/carousel-cards";
import CategorySectionCreator from "components/CategorySectionCreator";
import useSettings from "hooks/useSettings";
import CarouselSection from "./CarouselSection";
import HomeFourCard1 from "./homeFour-cards/HomeFourCard1";
// =================================================================

const Section1 = ({
  topPickList,
  mainCarousel
}) => {
  const {
    settings
  } = useSettings();
  const arrowButtonStyle = {
    color: "#7D879C",
    boxShadow: "none",
    background: "transparent"
  };

  // dynamically change arrow icon
  const left = settings.direction === "ltr" ? "left" : "right";
  const right = settings.direction === "ltr" ? "right" : "left";
  return <Container sx={{
    pt: "3rem"
  }}>
      <Grid container spacing={5}>
        <Grid item md={5} xs={12}>
          <Carousel visibleSlides={1} totalSlides={mainCarousel.length} leftButtonStyle={{
          ...arrowButtonStyle,
          [left]: 8
        }} rightButtonStyle={{
          ...arrowButtonStyle,
          [right]: 8
        }}>
            {mainCarousel.map(product => <CarouselCard3 product={product} key={product.id} />)}
          </Carousel>
        </Grid>

        <Grid item md={7} xs={12}>
          <CategorySectionCreator title="Top Picks">
            {/* TOP PICK LIST PRODUCT */}
            <CarouselSection productList={topPickList} />

            {/* MIDDLE BANNER AREA */}
            <Box my="3rem">
              <HomeFourCard1 title="Converse Collecitons" body="Get the most exciting deals. Starting at $59" imgUrl="/assets/images/products/red-shoe.png" />
            </Box>

            {/* BOTTOM PICK LIST PRODUCT */}
            <CarouselSection productList={topPickList} />
          </CategorySectionCreator>
        </Grid>
      </Grid>
    </Container>;
};
export default Section1;