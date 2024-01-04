import { Box, Container, Grid, Stack } from "@mui/material";
import { NavLink3 } from "components/nav-link";
import { BannerCard3 } from "components/banners";
import Carousel from "components/carousel/Carousel";
import { H4, Paragraph } from "components/Typography";
import { CarouselCard4 } from "components/carousel-cards";
// ======================================================

const Section1 = ({
  carouselData
}) => {
  // custom css
  const carouselStyles = {
    overflow: "hidden",
    borderRadius: "3px",
    "& .carousel__dot-group": {
      mt: 0,
      left: 0,
      right: 0,
      bottom: 10,
      position: "absolute",
      "& div": {
        borderColor: "dark.main",
        "::after": {
          backgroundColor: "dark.main"
        }
      }
    }
  };
  return <Box pt={3}>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <Carousel spacing="0px" infinite={true} showDots={true} autoPlay={false} visibleSlides={1} showArrow={false} sx={carouselStyles} totalSlides={carouselData.length}>
              {carouselData.map((item, ind) => <CarouselCard4 key={ind} mode="light" title={item.title} bgImage={item.imgUrl} discount={item.discount} category={item.category} buttonLink={item.buttonLink} buttonText={item.buttonText} description={item.description} />)}
            </Carousel>
          </Grid>

          <Grid item md={3} xs={12}>
            <Stack height="100%" direction={{
            md: "column",
            sm: "row",
            xs: "column"
          }} spacing={2}>
              <BannerCard3 flex={1} img="/assets/images/banners/banner-17.jpg">
                <Paragraph fontSize={13} letterSpacing={1.2}>
                  NEW ARRIVALS
                </Paragraph>

                <H4 fontSize={20} lineHeight={1.2} mb={2}>
                  SUMMER
                  <br />
                  SALE 20% OFF
                </H4>

                <NavLink3 href="#" text="Shop Now" color="dark.main" />
              </BannerCard3>

              <BannerCard3 flex={1} img="/assets/images/banners/banner-16.jpg">
                <Paragraph fontSize={13} letterSpacing={1.2}>
                  GAMING 4K
                </Paragraph>

                <H4 fontSize={20} lineHeight={1.2} mb={2}>
                  DESKTOPS &
                  <br />
                  LAPTOPS
                </H4>

                <NavLink3 href="#" text="Shop Now" color="dark.main" />
              </BannerCard3>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>;
};
export default Section1;