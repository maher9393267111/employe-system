import { Box, Button, Grid } from "@mui/material";
import CategorySectionCreator from "components/CategorySectionCreator";
import ProductCard16 from "components/product-cards/ProductCard16";
// =========================================================

const Section7 = ({
  products
}) => {
  return <CategorySectionCreator title="All Products" seeMoreLink="#">
      <Grid container mb={-0.5} spacing={3}>
        {products.map((item, ind) => <Grid key={ind} item md={3} sm={6} xs={12}>
            <ProductCard16 id={item.id} key={item.id} slug={item.slug} title={item.title} price={item.price} rating={item.rating} images={item.images} discount={item.discount} thumbnail={item.thumbnail} />
          </Grid>)}
      </Grid>

      <Box mt={6} display="flex" justifyContent="center">
        <Button color="primary" variant="contained">
          Load More...
        </Button>
      </Box>
    </CategorySectionCreator>;
};
export default Section7;