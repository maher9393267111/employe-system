
import { Box, Grid } from "@mui/material";
import Card1 from "pages-sections/dashboard/Card1";
import Section3 from "pages-sections/dashboard/Section3";
import WishCard from "pages-sections/dashboard/WishCard";
import Analytics from "pages-sections/dashboard/Analytics";
import RecentPurchase from "pages-sections/dashboard/RecentPurchase";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import StockOutProducts from "pages-sections/dashboard/StockOutProducts";
import api from "utils/__api__/dashboard";

// =============================================================================
IndexPage.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function IndexPage(props) {
  const {
    cardList,
    recentPurchase,
    stockOutProducts
  } = props;
  return <Box py={4}>
      <Grid container spacing={3}>
        {/* WISHING CARD */}
        <Grid item md={6} xs={12}>
          <WishCard />
        </Grid>

        {/* ALL TRACKING CARDS */}
        <Grid container item md={6} xs={12} spacing={3}>
          {cardList.map(item => <Grid item md={6} sm={6} xs={12} key={item.id}>
              <Card1 title={item.title} color={item.color} amount1={item.amount1} amount2={item.amount2} percentage={item.percentage} status={item.status === "down" ? "down" : "up"} />
            </Grid>)}
        </Grid>

        {/* SALES AREA */}
        <Grid item xs={12}>
          <Section3 />
        </Grid>

        {/* ANALYTICS AREA */}
        <Grid item xs={12}>
          <Analytics />
        </Grid>

        {/* RECENT PURCHASE AREA */}
        <Grid item md={7} xs={12}>
          <RecentPurchase data={recentPurchase} />
        </Grid>

        {/* STOCK OUT PRODUCTS */}
        <Grid item md={5} xs={12}>
          <StockOutProducts data={stockOutProducts} />
        </Grid>
      </Grid>
    </Box>;
}
export const getStaticProps = async () => {
  const cardList = await api.getAllCard();
  const recentPurchase = await api.recentPurchase();
  const stockOutProducts = await api.stockOutProducts();
  return {
    props: {
      cardList,
      recentPurchase,
      stockOutProducts
    }
  };
};



// import { useState } from "react";
// import { Box } from "@mui/material";
// import Setting from "components/Setting";
// import Footer from "pages-sections/landing/Footer";
// import Section1 from "pages-sections/landing/Section1";
// import Section2 from "pages-sections/landing/Section2";
// import Section3 from "pages-sections/landing/Section3";
// import Section4 from "pages-sections/landing/Section4";
// import Section6 from "pages-sections/landing/Section6";
// import Section5 from "pages-sections/landing/Section5";
// const IndexPage = () => {
//   const [filterDemo, setFilterDemo] = useState("");
//   return <Box id="top" overflow="hidden" bgcolor="background.paper">
//       <Section1 />
//       <Section6 setFilterDemo={setFilterDemo} />
//       <Section2 />
//       <Section5 />
//       <Section3 filterDemo={filterDemo} setFilterDemo={setFilterDemo} />
//       <Section4 />
//       <Footer />
//       <Setting />
//     </Box>;
// };
// export default IndexPage;