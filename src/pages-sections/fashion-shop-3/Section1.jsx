import { Box, Container } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import { CarouselCard4 } from "components/carousel-cards";
// ======================================================

const Section1 = ({
  carouselData
}) => {
  return <Box pt={3}>
      <Container>
        <Carousel spacing="0px" totalSlides={2} infinite={true} showDots={true} autoPlay={false} visibleSlides={1} showArrow={false} sx={{
        mb: 3,
        overflow: "hidden",
        "& .carousel__dot-group": {
          mt: 0,
          left: 0,
          right: 0,
          bottom: 10,
          position: "absolute",
          "& div": {
            borderColor: "#fff",
            "::after": {
              backgroundColor: "#fff"
            }
          }
        }
      }}>
          {carouselData.map((item, ind) => <CarouselCard4 key={ind} mode="dark" title={item.title} bgImage={item.imgUrl} discount={item.discount} category={item.category} buttonText={item.buttonText} buttonLink={item.buttonLink} description={item.description} />)}
        </Carousel>
      </Container>
    </Box>;
};
export default Section1;