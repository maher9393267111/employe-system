import { useState } from "react";
import { useRouter } from "next/router";
import { Favorite } from "@mui/icons-material";
import { Button, Grid, Pagination } from "@mui/material";
import SEO from "components/SEO";
import { FlexBox } from "components/flex-box";
import ProductCard1 from "components/product-cards/ProductCard1";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import productDatabase from "data/product-database";
// ==================================================================

const WishList = props => {
  const {
    totalProducts,
    products
  } = props;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // HANDLE CHANGE PAGINATION
  const handleChangePage = page => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
  };

  // SECTION HEADER TITLE LINK
  const HEADER_BUTTON = <Button color="primary" sx={{
    px: 4,
    bgcolor: "primary.light"
  }}>
      Add All to Cart
    </Button>;
  return <CustomerDashboardLayout>
      <SEO title="Wishlist" />

      {/* TOP HEADER AREA */}
      <UserDashboardHeader icon={Favorite} title="My Wish List" button={HEADER_BUTTON} navigation={<CustomerDashboardNavigation />} />

      {/* PRODUCT LIST AREA */}
      <Grid container spacing={3}>
        {products.map(item => <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1 id={item.id} slug={item.slug} title={item.title} price={item.price} rating={item.rating} imgUrl={item.thumbnail} discount={item.discount} />
          </Grid>)}
      </Grid>

      {/* PAGINATION AREA */}
      <FlexBox justifyContent="center" mt={5}>
        <Pagination color="primary" variant="outlined" page={currentPage} count={Math.ceil(totalProducts / 6)} onChange={(_, page) => handleChangePage(page)} />
      </FlexBox>
    </CustomerDashboardLayout>;
};
export const getServerSideProps = async context => {
  const products = productDatabase.slice(0, 30);
  const PAGE_SIZE = 6;
  const PAGE_NUMBER = context.query.page ? Number(context.query.page) : 1;
  const currentProducts = products.slice((PAGE_NUMBER - 1) * PAGE_SIZE, PAGE_NUMBER * PAGE_SIZE);
  return {
    props: {
      products: currentProducts,
      totalProducts: products.length
    }
  };
};
export default WishList;