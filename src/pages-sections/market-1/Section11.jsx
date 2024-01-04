import { Container, Grid } from "@mui/material";
import ProductCard1 from "components/product-cards/ProductCard1";
import CategorySectionHeader from "components/CategorySectionHeader";
// ====================================================

const Section11 = ({
  moreItems
}) => {
  return <Container sx={{
    mb: "70px"
  }}>
      <CategorySectionHeader title="More For You" seeMoreLink="#" />

      <Grid container spacing={3}>
        {moreItems.map(item => <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
            <ProductCard1 hoverEffect id={item.id} slug={item.slug} title={item.title} price={item.price} rating={item.rating} imgUrl={item.thumbnail} discount={item.discount} />
          </Grid>)}
      </Grid>
    </Container>;
};
export default Section11;