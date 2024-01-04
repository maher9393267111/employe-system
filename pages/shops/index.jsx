import { Container, Grid, Pagination } from "@mui/material";
import { H2, Span } from "components/Typography";
import ShopCard1 from "components/shop/ShopCard1";
import { FlexBetween } from "components/flex-box";
import ShopLayout1 from "components/layouts/ShopLayout1";
import api from "utils/__api__/shop";
// =============================================

const ShopList = ({
  shopList
}) => {
  return <ShopLayout1>
      <Container sx={{
      mt: 4,
      mb: 6
    }}>
        <H2 mb={3}>All Shops</H2>

        {/* ALL SHOP LIST AREA */}
        <Grid container spacing={3}>
          {shopList.map(item => <Grid item lg={4} sm={6} xs={12} key={item.id}>
              <ShopCard1 name={item.name} slug={item.slug} phone={item.phone} address={item.address} rating={item.rating || 5} coverPicture={item.coverPicture} profilePicture={item.profilePicture} />
            </Grid>)}
        </Grid>

        {/* PAGINTAION AREA */}
        <FlexBetween flexWrap="wrap" mt={4}>
          <Span color="grey.600">Showing 1-9 of 300 Shops</Span>
          <Pagination count={shopList.length} variant="outlined" color="primary" />
        </FlexBetween>
      </Container>
    </ShopLayout1>;
};
export const getStaticProps = async () => {
  const shopList = await api.getShopList();
  return {
    props: {
      shopList
    }
  };
};
export default ShopList;