import { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import BazaarCard from "components/BazaarCard";
import { FlexBox } from "components/flex-box";
import ProductCategoryItem from "./ProductCategoryItem";
import ProductCard1 from "components/product-cards/ProductCard1";
import CategorySectionHeader from "components/CategorySectionHeader";
// ==============================================================

const Section6 = ({
  carList,
  carBrands
}) => {
  const [selected, setSelected] = useState("");
  const handleCategoryClick = brand => () => {
    if (selected === brand.slug) setSelected("");else setSelected(brand.slug);
  };
  return <Container sx={{
    mb: "80px"
  }}>
      <FlexBox gap="1.75rem">
        <BazaarCard sx={{
        height: "100%",
        minWidth: "240px",
        padding: "1.25rem",
        borderRadius: "10px",
        display: {
          xs: "none",
          md: "block"
        }
      }}>
          {carBrands.map(brand => <ProductCategoryItem id={brand.id} key={brand.id} title={brand.name} imgUrl={brand.image} sx={{
          mb: "0.75rem"
        }} onClick={handleCategoryClick(brand)} isSelected={selected === brand.slug} />)}

          <ProductCategoryItem id="all" title="View All Brands" isSelected={selected === "all"} sx={{
          mt: 8,
          height: 44,
          justifyContent: "center"
        }} />
        </BazaarCard>

        <Box flex="1 1 0" minWidth="0px">
          <CategorySectionHeader title="Cars" seeMoreLink="#" />

          <Grid container spacing={3}>
            {carList.map(item => <Grid item lg={4} sm={6} xs={12} key={item.id}>
                <ProductCard1 hoverEffect id={item.id} slug={item.slug} title={item.title} price={item.price} rating={item.rating} imgUrl={item.thumbnail} discount={item.discount} />
              </Grid>)}
          </Grid>
        </Box>
      </FlexBox>
    </Container>;
};
export default Section6;