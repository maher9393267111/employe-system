"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
// AgentCustomersCharts
import { AgentCustomersCharts } from "../redux/agentApiRequest";
import { useSelector, useDispatch } from "react-redux";
import NextImage from "next/image";
import { Box, Card } from "@mui/material";
import { H3, H5, Paragraph } from "components/Typography";
import { currency } from "lib";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

Home.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function Home() {
  const dispatch = useDispatch();
  const agents = useSelector((state) => state.agent.agent.agentsChart);
  const totalCustomers = useSelector(
    (state) => state.agent.agent.totalCustomers
  );

  const totalAgents = useSelector((state) => state.agent.agent.totalAgents);

  const user = useSelector((state) => state.auth.login.currentUser.payload);

  console.log("selector", agents);

  useEffect(() => {
    dispatch(AgentCustomersCharts());
  }, [dispatch]);

  const pieOptions = {
    colors: ["rgb(46, 150, 255)", "rgb(184, 0, 216)", "rgb(2, 178, 175)"],

    labels: agents?.map((agent, index) => {
      return agent.data.fullName;
    }),
  };

  console.log("LABELS", pieOptions.labels);

  const pieSeries = agents?.map((agent, index) => {
    return agent.count;
  });

  console.log("SEARIES", pieSeries);

  return (
    <Box
      sx={{
        p: 4,
        height: "100%",
        // width:"70%",
        // marginX:'auto',
        // marginY:"15px",
      }}
    >
      {agents &&
      <Card
        sx={{
          p: 4,
          height: "100%",
          width: "70%",

          width: {
            xs: "100%",
            md: "80%",
          },

          marginX: "auto",
          marginY: "15px",

          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <H5 color="info.main" mb={0.5}>
          Good Morning, {user?.fullName}
        </H5>
        <Paragraph color="grey.600">
          Here’s what happening with your store today!
        </Paragraph>

        <H3 mt={3}>{totalAgents && totalAgents}</H3>
        <Paragraph color="grey.600">Today’s Agents</Paragraph>

        <H3 mt={1.5}>{totalCustomers && totalCustomers}</H3>
        <Paragraph color="grey.600">Today’s total Customers</Paragraph>

        <Box
          sx={{
            right: 24,
            bottom: 0,
            // position: "absolute",

            position: {
              xs: "relative",
              md: "absolute",
            },

            display: {
              // xs: "none",
              sm: "block",
            },
          }}
        >
          {/* {agents && ( */}
            <Chart
              options={pieOptions}
              series={pieSeries}
              type="donut"
              width={380}
            />
           {/* )} */}
        </Box>
      </Card>
}
      ;




    </Box>
  );
}

// import { Box, Grid } from "@mui/material";
// import Card1 from "pages-sections/dashboard/Card1";
// import Section3 from "pages-sections/dashboard/Section3";
// import WishCard from "pages-sections/dashboard/WishCard";
// import Analytics from "pages-sections/dashboard/Analytics";
// import RecentPurchase from "pages-sections/dashboard/RecentPurchase";
// import VendorDashboardLayout from "components/layouts/vendor-dashboard";
// import StockOutProducts from "pages-sections/dashboard/StockOutProducts";
// import api from "utils/__api__/dashboard";

// // =============================================================================
// IndexPage.getLayout = function getLayout(page) {
//   return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
// };
// // =============================================================================

// // =============================================================================

// export default function IndexPage(props) {
//   const {
//     cardList,
//     recentPurchase,
//     stockOutProducts
//   } = props;
//   return <Box py={4}>
//       <Grid container spacing={3}>
//         {/* WISHING CARD */}
//         <Grid item md={6} xs={12}>
//           <WishCard />
//         </Grid>

//         {/* ALL TRACKING CARDS */}
//         <Grid container item md={6} xs={12} spacing={3}>
//           {cardList.map(item => <Grid item md={6} sm={6} xs={12} key={item.id}>
//               <Card1 title={item.title} color={item.color} amount1={item.amount1} amount2={item.amount2} percentage={item.percentage} status={item.status === "down" ? "down" : "up"} />
//             </Grid>)}
//         </Grid>

//         {/* SALES AREA */}
//         <Grid item xs={12}>
//           <Section3 />
//         </Grid>

//         {/* ANALYTICS AREA */}
//         <Grid item xs={12}>
//           <Analytics />
//         </Grid>

//         {/* RECENT PURCHASE AREA */}
//         <Grid item md={7} xs={12}>
//           <RecentPurchase data={recentPurchase} />
//         </Grid>

//         {/* STOCK OUT PRODUCTS */}
//         <Grid item md={5} xs={12}>
//           <StockOutProducts data={stockOutProducts} />
//         </Grid>
//       </Grid>
//     </Box>;
// }
// export const getStaticProps = async () => {
//   const cardList = await api.getAllCard();
//   const recentPurchase = await api.recentPurchase();
//   const stockOutProducts = await api.stockOutProducts();
//   return {
//     props: {
//       cardList,
//       recentPurchase,
//       stockOutProducts
//     }
//   };
// };
