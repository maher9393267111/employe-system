import { useEffect, useRef, useState } from "react";
import { Box, Container, Stack, styled } from "@mui/material";
import SEO from "components/SEO";
import Setting from "components/Setting";
import Newsletter from "components/Newsletter";
import { layoutConstant } from "utils/constants";
import ShopLayout1 from "components/layouts/ShopLayout1";
import SideNavbar from "components/page-sidenav/SideNavbar";
import { MobileNavigationBar2 } from "components/mobile-navigation";
import Section1 from "pages-sections/furnitureshop/Section1";
import Section2 from "pages-sections/furnitureshop/Section2";
import Section3 from "pages-sections/furnitureshop/Section3";
import Section4 from "pages-sections/furnitureshop/Section4";
import api from "utils/__api__/furniture-shop";

// styled component
const StyledContainer = styled(Container)(({
  theme
}) => ({
  gap: "1.75rem",
  display: "flex",
  padding: "0 !important",
  ".sidenav": {
    top: 0,
    bottom: 0,
    position: "relative",
    transition: "all 350ms ease-in-out",
    width: layoutConstant.grocerySidenavWidth,
    minWidth: layoutConstant.grocerySidenavWidth,
    // height: `calc(100vh - ${layoutConstant.headerHeight}px)`,
    "& .MuiPaper-root": {
      borderRadius: 0
    },
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  ".pageContent": {
    left: "unset",
    position: "relative",
    width: `calc(100% - ${layoutConstant.grocerySidenavWidth}px)`,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: 0
    }
  }
}));

// ======================================================================

// ======================================================================

const FurnitureShop = props => {
  const pageContentRef = useRef();
  const [sidebarHeight, setSidebarHeight] = useState(0);
  useEffect(() => setSidebarHeight(pageContentRef.current.offsetHeight), []);
  return <ShopLayout1 showTopbar={false}>
      <SEO title="Furniture shop template" />

      {/* HERO SECTION */}
      <Section1 mainCarouselData={props.mainCarouselData} />

      <Container>
        <StyledContainer>
          {/* LEFT SIDEBAR */}
          <Box className="sidenav">
            <SideNavbar lineStyle="dash" sidebarStyle="style2" navList={props.sidebarNavList} sidebarHeight={sidebarHeight || "85vh"} />
          </Box>

          {/* OFFER BANNERS */}
          <Box className="pageContent" ref={pageContentRef}>
            <Section2 />
          </Box>
        </StyledContainer>

        <Stack spacing={6} my={6}>
          {/* TOP NEW PRODUCTS AREA */}
          <Section3 heading="Top New Product" products={props.topNewProducts} description="Tall blind but were, been folks not the expand" />

          {/* TOP SELLING PRODUCT AREA */}
          <Section3 heading="Top Selling Product" products={props.topSellingProducts} description="Tall blind but were, been folks not the expand" />

          {/* ALL PRODUCTS AREA */}
          <Section4 products={props.furnitureProducts} />
        </Stack>
      </Container>

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter image="/assets/images/newsletter/bg-3.png" />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />

      {/* MOBILE NAVIGATION WITH SIDE NAVABAR */}
      <MobileNavigationBar2>
        <SideNavbar navList={props.sidebarNavList} lineStyle="dash" sidebarStyle="style2" />
      </MobileNavigationBar2>
    </ShopLayout1>;
};
export const getStaticProps = async () => {
  const topNewProducts = await api.getTopNewProducts();
  const mainCarouselData = await api.getMainCarouselData();
  const furnitureProducts = await api.getFurnitureProducts();
  const sidebarNavList = await api.getFurnitureShopNavList();
  const topSellingProducts = await api.getTopSellingProducts();
  return {
    props: {
      sidebarNavList,
      topNewProducts,
      mainCarouselData,
      furnitureProducts,
      topSellingProducts
    }
  };
};
export default FurnitureShop;