import { Box, Button, Grid, styled } from "@mui/material";
import { H1 } from "components/Typography";
import ProductCard10 from "components/product-cards/ProductCard10";
// styled component
const TitleBox = styled(Box)(({
  theme
}) => ({
  textAlign: "center",
  "& h1": {
    fontSize: 40,
    fontWeight: 600,
    marginBottom: "10px"
  },
  "& div": {
    width: 200,
    height: "2px",
    margin: "auto",
    background: theme.palette.primary.main
  }
}));

// ===============================================================

// ===============================================================

const Section4 = ({
  products
}) => {
  return <Box>
      <TitleBox my={4}>
        <H1>Our All Products</H1>
        <Box />
      </TitleBox>

      <Grid container mb={-0.5} spacing={3}>
        {products.map(item => <Grid key={item.id} item md={4} sm={6} xs={12}>
            <ProductCard10 hideRating id={item.id} slug={item.slug} price={item.price} title={item.title} off={item.discount} rating={item.rating} imgUrl={item.thumbnail} />
          </Grid>)}
      </Grid>
      <Box mt={6} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" sx={{
        fontSize: "13px"
      }}>
          Load More...
        </Button>
      </Box>
    </Box>;
};
export default Section4;