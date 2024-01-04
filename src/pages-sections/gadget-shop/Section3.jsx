import { Container, Grid } from "@mui/material";
import HomeFourCard3 from "./homeFour-cards/HomeFourCard3";

// ===================================================

// ===================================================

const Section3 = ({
  bannerData
}) => {
  const firstItem = bannerData[0];
  const secondItem = bannerData[1];
  return <Container sx={{
    mb: "4rem"
  }}>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <HomeFourCard3 title={firstItem.title} imgUrl={firstItem.thumbnail} body={firstItem.description} />
        </Grid>

        <Grid item md={6} xs={12}>
          <HomeFourCard3 color="white" bgColor="grey.600" title={secondItem.title} body={secondItem.description} imgUrl={secondItem.thumbnail} />
        </Grid>
      </Grid>
    </Container>;
};
export default Section3;