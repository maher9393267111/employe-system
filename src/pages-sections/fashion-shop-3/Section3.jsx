import { Container, Grid } from "@mui/material";
import { H2 } from "components/Typography";
import ProductCard18 from "components/product-cards/ProductCard18";
// ===================================

const Section3 = ({
  products
}) => {
  return <Container sx={{
    mt: 8
  }}>
      <H2 textAlign="center" mb={4}>
        Best Selling Product
      </H2>

      <Grid container spacing={3}>
        {products.map(product => <Grid item md={3} sm={6} xs={12} key={product.id}>
            <ProductCard18 product={product} />
          </Grid>)}
      </Grid>
    </Container>;
};
export default Section3;