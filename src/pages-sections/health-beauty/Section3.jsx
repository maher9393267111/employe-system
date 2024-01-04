import { useEffect, useState } from "react";
import { Box, styled, useTheme } from "@mui/material";
import { Paragraph } from "components/Typography";
import Carousel from "components/carousel/Carousel";
import CategorySectionCreator from "components/CategorySectionCreator";
import ProductCard14 from "components/product-cards/ProductCard14";
import useWindowSize from "hooks/useWindowSize";
// styled components
const SubTitle = styled(Paragraph)(({
  theme
}) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600]
}));

// ================================================================

// ================================================================

const Section3 = ({
  products
}) => {
  const width = useWindowSize();
  const {
    palette
  } = useTheme();
  const [visibleSlides, setVisibleSlides] = useState(3);
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);else if (width < 650) setVisibleSlides(2);else if (width < 950) setVisibleSlides(3);else setVisibleSlides(3);
  }, [width]);

  // CUSTOM STYLE FOR ARROW BUTTONS
  const CAROUSEL_STYLE = {
    "& #backArrowButton, #backForwardButton": {
      color: palette.primary.main,
      background: palette.primary[50],
      "&:hover": {
        background: palette.primary[100]
      }
    }
  };
  return <CategorySectionCreator title="Top New Products" seeMoreLink="#" mb={0}>
      <SubTitle>Best deal with medical and beauty items</SubTitle>
      <Carousel infinite={true} sx={CAROUSEL_STYLE} visibleSlides={visibleSlides} totalSlides={products.length}>
        {products.map(item => <Box pt={0.5} pb={2} key={item.id}>
            <ProductCard14 id={item.id} slug={item.slug} title={item.title} price={item.price} off={item.discount} rating={item.rating} imgUrl={item.thumbnail} />
          </Box>)}
      </Carousel>
    </CategorySectionCreator>;
};
export default Section3;