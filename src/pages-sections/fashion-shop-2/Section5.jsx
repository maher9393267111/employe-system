import { Container, Grid, useTheme } from "@mui/material";
import { BannerCard1, BannerCard2 } from "components/banners";
const Section5 = () => {
  const {
    direction
  } = useTheme();
  return <Container sx={{
    mt: 8
  }}>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <BannerCard1 url="#" title="For Men's" subTitle="Starting At $29" img="/assets/images/banners/men's-fashion.jpg" contentPosition={direction === "rtl" ? "right" : "left"} />
        </Grid>

        <Grid item md={4} xs={12}>
          <BannerCard2 url="#" text3="Sale" text2="Black Friday" text1="Up to 20% Off" img="/assets/images/banners/banner2.jpg" />
        </Grid>

        <Grid item md={4} xs={12}>
          <BannerCard1 url="#" subTitle="25% Off" title="For Women's" img="/assets/images/banners/womens-fashion.jpg" contentPosition={direction === "rtl" ? "left" : "right"} />
        </Grid>
      </Grid>
    </Container>;
};
export default Section5;