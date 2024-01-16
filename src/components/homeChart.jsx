

// "use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
// AgentCustomersCharts
import { AgentCustomersCharts } from "../../redux/agentApiRequest";
import { useSelector, useDispatch } from "react-redux";
import NextImage from "next/image";
import { Box, Card } from "@mui/material";
import { H3, H5, Paragraph } from "components/Typography";
import { currency } from "lib";
// import VendorDashboardLayout from "components/layouts/vendor-dashboard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Home.getLayout = function getLayout(page) {
//   return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
// };

export default function HomeChart() {
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
      return agent.data?.fullName || "someagent";
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









// // "use client";

// import dynamic from "next/dynamic";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// // AgentCustomersCharts
// import { AgentCustomersCharts } from "../../redux/agentApiRequest";
// import { useSelector, useDispatch } from "react-redux";
// import NextImage from "next/image";
// import { Box, Card } from "@mui/material";
// import { H3, H5, Paragraph } from "components/Typography";
// import { currency } from "lib";
// // import VendorDashboardLayout from "components/layouts/vendor-dashboard";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// // Home.getLayout = function getLayout(page) {
// //   return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
// // };

// export default function HomeChart() {
//   const dispatch = useDispatch();
//   const agents = useSelector((state) => state.agent.agent.agentsChart);
  
// console.log("AgentsCharts-->" ,agents)

//   const totalCustomers = useSelector(
//     (state) => state.agent.agent.totalCustomers
//   );

//   const totalAgents = useSelector((state) => state.agent.agent.totalAgents);

// const isfetching = useSelector((state) => state.agent.agent.isFetching);


//   const user = useSelector((state) => state.auth.login.currentUser.payload);

//   console.log("selector", agents);

//   useEffect(() => {
//     dispatch(AgentCustomersCharts());
//   }, [dispatch]);

//   const pieOptions = {
//     colors: ["rgb(46, 150, 255)", "rgb(184, 0, 216)", "rgb(2, 178, 175)"],

//     labels: agents?.map((agent, index) => {
//       return agent?.data?.fullName;
//     }),
//   };

//   console.log("LABELSsssss", pieOptions.labels);

//   const pieSeries = agents?.map((agent, index) => {
//     return agent?.count;
//   });

//   console.log("SEARIESsssss", pieSeries);



//   return (
//     <Box
//       sx={{
//         p: 4,
//         height: "100%",
//         // width:"70%",
//         // marginX:'auto',
//         // marginY:"15px",
//       }}
//     >

// {/* && agents?.length > 0 && !isfetching */}
//       {agents?.length > 0   &&
//       <Card
//         sx={{
//           p: 4,
//           height: "100%",
//           width: "70%",

//           width: {
//             xs: "100%",
//             md: "80%",
//           },

//           marginX: "auto",
//           marginY: "15px",

//           display: "flex",
//           position: "relative",
//           flexDirection: "column",
//           justifyContent: "center",
//         }}
//       >
//         <H5 color="info.main" mb={0.5}>
//           Good Morning, {user?.fullName}
//         </H5>
//         <Paragraph color="grey.600">
//           Here’s what happening with your store today!
//         </Paragraph>

//         <H3 mt={3}>{totalAgents && totalAgents}</H3>
//         <Paragraph color="grey.600">Today’s Agents</Paragraph>

//         <H3 mt={1.5}>{totalCustomers && totalCustomers}</H3>
//         <Paragraph color="grey.600">Today’s total Customers</Paragraph>

//         <Box
//           sx={{
//             right: 24,
//             bottom: 0,
//             // position: "absolute",

//             position: {
//               xs: "relative",
//               md: "absolute",
//             },

//             display: {
//               // xs: "none",
//               sm: "block",
//             },
//           }}
//         >
//           {/* {agents && ( */}
//             <Chart
//               options={pieOptions}
//               series={pieSeries}
//               type="donut"
//               width={380}
//             />
//            {/* )} */}
//         </Box>
//       </Card>
// }
//       ;




//     </Box>
//   );
// }

