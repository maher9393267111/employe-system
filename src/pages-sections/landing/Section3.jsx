import Link from "next/link";
import { Box, Button, Container, Grid, styled } from "@mui/material";
import { FlexRowCenter } from "components/flex-box";
import { H2, H4, Paragraph, Span } from "components/Typography";
import PageCard from "./PageCard";
const FilterButton = styled(Button)(({
  theme,
  selected
}) => ({
  color: selected ? theme.palette.primary.main : "inherit",
  ":hover": {
    backgroundColor: "transparent",
    color: theme.palette.primary.main
  }
}));
const TitleBadge = styled(Span)(({
  theme
}) => ({
  color: theme.palette.grey[500],
  margin: "0 4px"
}));

// ==================================================================

// ==================================================================

const Section3 = ({
  filterDemo,
  setFilterDemo
}) => {
  const pages = [...demoPageList, ...shopPageList, ...vendorPageList, ...customerPageList];
  const filtered = pages.filter(item => filterDemo !== "" ? item.page === filterDemo : true);
  return <Box mb={14} id="demos" sx={{
    background: "url(/assets/images/landing/landing-bg-2.svg) center/contain no-repeat"
  }}>
      <Container id="section-3" sx={{
      position: "relative"
    }}>
        <Box maxWidth="830px" mx="auto" mb="2.5rem" textAlign="center">
          <H4 color="primary.main" fontSize="58px" fontWeight="900">
            58+
          </H4>

          <Paragraph color="primary.main" fontSize="18px">
            Server side rendered
          </Paragraph>

          <H2 mb={4} fontSize={28} fontWeight="700" textAlign="center" color="secondary.main" textTransform="uppercase">
            Demos & Pages
          </H2>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <FlexRowCenter gap={1} flexWrap="wrap">
              <FilterButton disableRipple onClick={() => setFilterDemo("")} selected={filterDemo === "" ? 1 : 0}>
                All
              </FilterButton>

              <FilterButton disableRipple onClick={() => setFilterDemo("homepage")} selected={filterDemo === "homepage" ? 1 : 0}>
                Homepages
              </FilterButton>

              <FilterButton disableRipple onClick={() => setFilterDemo("shop")} selected={filterDemo === "shop" ? 1 : 0}>
                Shop
              </FilterButton>

              <FilterButton disableRipple onClick={() => setFilterDemo("user")} selected={filterDemo === "user" ? 1 : 0}>
                User Dashboard
              </FilterButton>

              <FilterButton disableRipple onClick={() => setFilterDemo("admin")} selected={filterDemo === "admin" ? 1 : 0}>
                Admin Dashboard
              </FilterButton>
            </FlexRowCenter>
          </Grid>

          {filtered.map((item, i) => <Grid item lg={4} sm={6} xs={12} key={i}>
              <PageCard {...item} />
            </Grid>)}
        </Grid>

        <Link href="https://tinyurl.com/get-bazaar" passHref legacyBehavior>
          <a>
            <Button color="primary" variant="contained" sx={{
            mx: "auto",
            mt: "2.25rem",
            display: "block",
            minWidth: "125px"
          }}>
              Purchase Now
            </Button>
          </a>
        </Link>
      </Container>
    </Box>;
};
const demoPageList = [{
  imgUrl: "/assets/images/landing/home/super-store.jpg",
  previewUrl: "/market-1",
  title: <>
        Market <TitleBadge>(1)</TitleBadge>
      </>,
  page: "homepage"
}, {
  imgUrl: "/assets/images/landing/home/market-2.jpg",
  previewUrl: "/market-2",
  title: <>
        Market <TitleBadge>(2)</TitleBadge>
      </>,
  page: "homepage",
  status: "New"
}, {
  imgUrl: "/assets/images/landing/home/fashion-2.jpg",
  previewUrl: "/fashion-shop-2",
  title: <>
        Fashion <TitleBadge>(2)</TitleBadge>
      </>,
  page: "homepage",
  status: "New"
}, {
  imgUrl: "/assets/images/landing/home/gift-shop.jpg",
  previewUrl: "/gift-shop",
  title: "Gift",
  page: "homepage"
}, {
  imgUrl: "/assets/images/landing/home/grocery1.jpg",
  previewUrl: "/grocery1",
  title: <>
        Grocery <TitleBadge>(1)</TitleBadge>
      </>,
  page: "homepage"
}, {
  imgUrl: "/assets/images/landing/home/gadget-electronics.jpg",
  previewUrl: "/gadget-shop",
  title: "Gadget & Electronics",
  page: "homepage"
}, {
  imgUrl: "/assets/images/landing/home/furniture.jpg",
  previewUrl: "/furniture-shop",
  title: "Furniture",
  page: "homepage"
}, {
  imgUrl: "/assets/images/landing/home/grocery2.jpg",
  previewUrl: "/grocery2",
  title: <>
        Grocery <TitleBadge>(2)</TitleBadge>
      </>,
  page: "homepage"
}, {
  imgUrl: "/assets/images/landing/home/grocery3.jpg",
  previewUrl: "/grocery3",
  title: <>
        Grocery <TitleBadge>(3)</TitleBadge>
      </>,
  page: "homepage"
}, {
  imgUrl: "/assets/images/landing/home/healthbeauty.jpg",
  previewUrl: "/healthbeauty-shop",
  title: "Health and Beauty",
  page: "homepage"
}, {
  imgUrl: "/assets/images/landing/page-3.png",
  previewUrl: "/fashion-shop-1",
  title: <>
        Fashion <TitleBadge>(1)</TitleBadge>
      </>,
  page: "homepage"
}, {
  imgUrl: "/assets/images/landing/home/fashion-3.jpg",
  previewUrl: "/fashion-shop-3",
  title: <>
        Fashion <TitleBadge>(3)</TitleBadge>
      </>,
  page: "homepage",
  status: "New"
}];
const shopPageList = [{
  imgUrl: "/assets/images/landing/shop/sale-page-1.jpg",
  previewUrl: "/sale-page-1",
  title: "Sale Page",
  page: "shop"
}, {
  imgUrl: "/assets/images/landing/shop/sale-page-2.jpg",
  previewUrl: "/sale-page-2",
  title: "Sale Page (Small Navigation)",
  page: "shop"
}, {
  imgUrl: "/assets/images/landing/shop/vendor-store.jpg",
  previewUrl: "/shops/scarlett-beauty",
  title: "Vendor Shop",
  page: "shop"
}, {
  imgUrl: "/assets/images/landing/shop/search-product.jpg",
  previewUrl: "/product/search/mobile%20phone",
  title: "Search",
  page: "shop"
}, {
  imgUrl: "/assets/images/landing/shop/product-details.jpg",
  previewUrl: "/product/classic-rolex-watch",
  title: "Product Details",
  page: "shop"
}, {
  imgUrl: "/assets/images/landing/shop/cart.jpg",
  previewUrl: "/cart",
  title: "Cart",
  page: "shop"
}, {
  imgUrl: "/assets/images/landing/shop/checkout.jpg",
  previewUrl: "/checkout",
  title: "Checkout",
  page: "shop"
}, {
  imgUrl: "/assets/images/landing/shop/checkout-alternative.jpg",
  previewUrl: "/checkout-alternative",
  title: "Checkout Alternative",
  page: "shop"
}, {
  imgUrl: "/assets/images/landing/shop/shop-list.jpg",
  previewUrl: "/shops",
  title: "Shop List",
  page: "shop"
}];
const vendorPageList = [{
  imgUrl: "/assets/images/landing/vendor/dashboard.jpg",
  previewUrl: "/vendor/dashboard",
  title: "Dashboard",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/product-list.jpg",
  previewUrl: "/admin/products",
  title: "Product List",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/create-product.jpg",
  previewUrl: "/admin/products/create",
  title: "Create Product",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/categories.jpg",
  previewUrl: "/admin/categories",
  title: "Category List",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/brands.jpg",
  previewUrl: "/admin/brands",
  title: "Brand List",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/reviews.jpg",
  previewUrl: "/admin/product-reviews",
  title: "Product Reviews",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/order-list.jpg",
  previewUrl: "/admin/orders",
  title: "Order List",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/order-details.jpg",
  previewUrl: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8",
  title: "Order Details",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/customers.jpg",
  previewUrl: "/admin/customers",
  title: "Customer List",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/refund-request.jpg",
  previewUrl: "/admin/refund-request",
  title: "Refund Request",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/refund-setting.jpg",
  previewUrl: "/admin/refund-setting",
  title: "Refund Setting",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/seller-list.jpg",
  previewUrl: "/admin/sellers",
  title: "Seller List",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/seller-package.jpg",
  previewUrl: "/admin/seller-package",
  title: "Seller Packages",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/package-payment.jpg",
  previewUrl: "/admin/package-payment",
  title: "Pacakge Payment",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/earning-history.jpg",
  previewUrl: "/admin/earning-history",
  title: "Earning History",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/payout-list.jpg",
  previewUrl: "/admin/payouts",
  title: "Payout List",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/payout-request.jpg",
  previewUrl: "/admin/payout-request",
  title: "Payout Request",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/vendor-earning.jpg",
  previewUrl: "/vendor/earning-history",
  title: "Vendor Earning History",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/vendor-payouts.jpg",
  previewUrl: "/vendor/payouts",
  title: "Vendor Payouts",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/vendor-payout-requests.jpg",
  previewUrl: "/vendor/payout-requests",
  title: "Vendor Payout Request",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/payout-settings.jpg",
  previewUrl: "/vendor/payout-settings",
  title: "Payout Settings",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/vendor-refund-requests.jpg",
  previewUrl: "/vendor/refund-request",
  title: "Vendor Refund Requests",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/vendor-product-reviews.jpg",
  previewUrl: "/vendor/reviews",
  title: "Vendor Product Reviews",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/shop-settings.jpg",
  previewUrl: "/vendor/shop-settings",
  title: "Shop Settings",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/support-tickets.jpg",
  previewUrl: "/vendor/support-tickets",
  title: "Support Tickets",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/account-setting.jpg",
  previewUrl: "/vendor/account-setting",
  title: "Account Settings",
  status: "New",
  page: "admin"
}, {
  imgUrl: "/assets/images/landing/vendor/site-settings.jpg",
  previewUrl: "/vendor/site-settings",
  title: "Site Settings",
  status: "New",
  page: "admin"
}];
const customerPageList = [{
  imgUrl: "/assets/images/landing/customer/profile.jpg",
  previewUrl: "/profile",
  title: "Profile",
  page: "user"
}, {
  imgUrl: "/assets/images/landing/customer/edit-profile.jpg",
  previewUrl: "/profile/e42e28ea-528f-4bc8-81fb-97f658d67d75",
  title: "Edit Profile",
  page: "user"
}, {
  imgUrl: "/assets/images/landing/customer/order-list.jpg",
  previewUrl: "/orders",
  title: "My Orders",
  page: "user"
}, {
  imgUrl: "/assets/images/landing/customer/order-details.jpg",
  previewUrl: "/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8",
  title: "Order Details",
  page: "user"
}, {
  imgUrl: "/assets/images/landing/customer/my-addresses.jpg",
  previewUrl: "/address",
  title: "My Addresses",
  page: "user"
}, {
  imgUrl: "/assets/images/landing/customer/add-new-addresses.jpg",
  previewUrl: "/address/d27d0e28-c35e-4085-af1e-f9f1b1bd9c34",
  title: "Add Addresses",
  page: "user"
}, {
  imgUrl: "/assets/images/landing/customer/payment.jpg",
  previewUrl: "/payment-methods",
  title: "Payment Methods",
  page: "user"
}, {
  imgUrl: "/assets/images/landing/customer/support-ticket.jpg",
  previewUrl: "/support-tickets",
  title: "Support Tickets",
  page: "user"
}, {
  imgUrl: "/assets/images/landing/customer/support-ticket-detials.jpg",
  previewUrl: "/support-tickets/product-broken.-i-need-refund",
  title: "Ticket Details",
  page: "user"
}, {
  imgUrl: "/assets/images/landing/customer/wish-list.jpg",
  previewUrl: "/wish-list",
  title: "Wish List",
  page: "user"
}];
export default Section3;