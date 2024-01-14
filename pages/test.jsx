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

Pie.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function Pie() {
  const dispatch = useDispatch();
  const agents = useSelector((state) => state.agent.agent.agentsChart);
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
      <Card
        sx={{
          p: 4,
          height: "100%",
          width: "70%",
          marginX: "auto",
          marginY: "15px",

          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <H5 color="info.main" mb={0.5}>
          Good Morning, Admin!
        </H5>
        <Paragraph color="grey.600">
          Here’s what happening with your store today!
        </Paragraph>

        <H3 mt={3}>15,350.25</H3>
        <Paragraph color="grey.600">Today’s Visit</Paragraph>

        <H3 mt={1.5}>{currency(10360.66)}</H3>
        <Paragraph color="grey.600">Today’s total sales</Paragraph>

        <Box
          sx={{
            right: 24,
            bottom: 0,
            position: "absolute",
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <Chart
            options={pieOptions}
            series={pieSeries}
            type="donut"
            width={380}
          />
        </Box>
      </Card>
      ;
    </Box>
  );
}
