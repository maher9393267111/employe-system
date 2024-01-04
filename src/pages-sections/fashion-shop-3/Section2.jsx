import { Container, Grid, useTheme } from "@mui/material";
import { BannerCard1 } from "components/banners";
const Section2 = () => {
  const {
    direction
  } = useTheme();
  return <Container>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <BannerCard1 url="#" title="For Men's" subTitle="Starting At $29" img="/assets/images/banners/men.jpg" sx={{
          borderRadius: 0
        }} contentPosition={direction === "rtl" ? "right" : "left"} />
        </Grid>

        <Grid item md={6} xs={12}>
          <BannerCard1 url="#" subTitle="25% Off" title="For Women's" img="/assets/images/banners/banner-12.jpg" contentPosition={direction === "rtl" ? "left" : "right"} sx={{
          borderRadius: 0
        }} />
        </Grid>
      </Grid>
    </Container>;
};
export default Section2;