import { Grid } from "@mui/material";
import CategorySectionCreator from "components/CategorySectionCreator";
import ProductCard12 from "components/product-cards/ProductCard12";
import ProductCard3 from "components/product-cards/ProductCard3";
// =============================================================

const Section6 = ({
  products
}) => {
  const trendings = products.slice(1, products.length);
  return <CategorySectionCreator title="Trending Items">
      <Grid container spacing={4}>
        <Grid item md={3} xs={12}>
          <ProductCard12 id={products[0].title} slug={products[0].slug} title={products[0].title} price={products[0].price} off={products[0].discount} rating={products[0].rating} imgUrl={products[0].thumbnail} />
        </Grid>

        <Grid item container md={9} xs={12} spacing={4}>
          {trendings.map(item => <Grid item xs={6} sm={4} key={item.id}>
              <ProductCard3 slug={item.slug} title={item.title} price={item.price} off={item.discount} rating={item.rating} imgUrl={item.thumbnail} />
            </Grid>)}
        </Grid>
      </Grid>
    </CategorySectionCreator>;
};
export default Section6;