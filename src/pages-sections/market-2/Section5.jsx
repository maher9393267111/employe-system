import { useEffect, useState } from "react";
import { Card, Container, Grid, List, ListItem, styled } from "@mui/material";
import { H3 } from "components/Typography";
import { NavLink3 } from "components/nav-link";
import useWindowSize from "hooks/useWindowSize";
import Carousel from "components/carousel/Carousel";
import ProductCard20 from "components/product-cards/ProductCard20";
import { carouselStyled } from "components/carousel/styles";
const StyledListItem = styled(ListItem)(({
  theme
}) => ({
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  padding: "10px 0 0 0",
  transition: "all 0.3s",
  ":hover": {
    color: theme.palette.primary.main
  }
}));

// ======================================================================

// ======================================================================

const Section5 = ({
  data
}) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);
  useEffect(() => {
    if (width < 426) setVisibleSlides(1);else if (width < 650) setVisibleSlides(2);else if (width < 1200) setVisibleSlides(3);else setVisibleSlides(4);
  }, [width]);
  if (!data) return null;
  return <Container>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <Card elevation={0} sx={{
          px: 4,
          height: "100%",
          py: 2,
          borderRadius: "3px",
          border: 0
        }}>
            {/* MAIN CATEGORY NAME/TITLE */}
            <H3>{data.category.title}</H3>

            {/* SUB CATEGORY LIST */}
            <List sx={{
            mb: 2
          }}>
              {data.category.children.map(item => <StyledListItem key={item}>{item}</StyledListItem>)}
            </List>

            <NavLink3 href="#" text="Browse All" color="dark.main" hoverColor="dark.main" />
          </Card>
        </Grid>

        {/* CATEGORY BASED PRODUCTS CAROUSEL */}
        <Grid item md={9} xs={12}>
          <Carousel totalSlides={data.products.length} visibleSlides={visibleSlides} sx={carouselStyled}>
            {data.products.map(product => <ProductCard20 product={product} key={product.id} />)}
          </Carousel>
        </Grid>
      </Grid>
    </Container>;
};
export default Section5;