import Link from "next/link";
import { Box, Grid, styled } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";
import { H3, H5, Tiny } from "components/Typography";
// styled component
const StyledBazaarCard = styled(BazaarCard)(({
  theme
}) => ({
  gap: "1rem",
  height: "100%",
  display: "flex",
  padding: "1.5rem",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "20px",
    textAlign: "center",
    flexDirection: "column"
  }
}));

// ===========================================================

// ===========================================================

const Section3 = ({
  categories = []
}) => {
  return <Box>
      <H3 fontSize={25} mb={3}>
        Shop By Category
      </H3>

      <Grid container spacing={3}>
        {categories.map(item => <Grid item lg={4} xs={6} key={item.id}>
            <Link href={`/product/search/${item.slug}`}>
              <a>
                <StyledBazaarCard hoverEffect>
                  <LazyImage width={46} height={46} alt={item.name} src={item.image} objectFit="contain" />

                  <Box>
                    <Tiny color="primary.main">{item.description}</Tiny>
                    <H5>{item.name}</H5>
                  </Box>
                </StyledBazaarCard>
              </a>
            </Link>
          </Grid>)}
      </Grid>
    </Box>;
};
export default Section3;