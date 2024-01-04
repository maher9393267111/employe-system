import { Container, Grid } from "@mui/material";
import { H3 } from "components/Typography";
import ProductCard19 from "components/product-cards/ProductCard19";
// ======================================================================

const Section8 = props => {
  const {
    saleProducts,
    popularProducts,
    bestWeekProducts,
    latestProducts
  } = props;
  return <Container sx={{
    py: 10
  }}>
      <Grid container spacing={3}>
        <ListBlock title="Sale Products" products={saleProducts} />
        <ListBlock title="Latest Products" products={latestProducts} />
        <ListBlock title="Best of the Week" products={bestWeekProducts} />
        <ListBlock title="Popular Products" products={popularProducts} />
      </Grid>
    </Container>;
};

// BLOCK RENDERED LEVEL

const ListBlock = ({
  title,
  products
}) => {
  return <Grid item lg={3} sm={6} xs={12}>
      <H3 mb={3}>{title}</H3>

      {products.map(product => <ProductCard19 key={product.id} slug={product.slug} title={product.title} price={product.price} image={product.thumbnail} />)}
    </Grid>;
};
export default Section8;