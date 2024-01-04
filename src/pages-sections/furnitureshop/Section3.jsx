import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import Carousel from "components/carousel/Carousel";
import { H1, Paragraph } from "components/Typography";
import ProductCard17 from "components/product-cards/ProductCard17";
// ====================================================

const Section3 = ({
  products,
  heading,
  description
}) => {
  const theme = useTheme();
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(3);
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);else if (width < 650) setVisibleSlides(2);else if (width < 950) setVisibleSlides(3);else setVisibleSlides(3);
  }, [width]);
  return <Box>
      <Box my={2}>
        <H1 mb="4px">{heading}</H1>
        <Paragraph color="grey.600">{description}</Paragraph>
      </Box>

      <Carousel totalSlides={products.length} visibleSlides={visibleSlides} infinite={true} sx={{
      "& #backArrowButton, #backForwardButton": {
        width: 40,
        height: 40,
        borderRadius: 0,
        boxShadow: theme.shadows[2],
        color: theme.palette.primary.main,
        background: theme.palette.primary[50],
        "&:hover": {
          background: theme.palette.primary[100]
        }
      }
    }}>
        {products.map(item => <Box py={0.5} key={item.id}>
            <ProductCard17 hideRating id={item.id} slug={item.slug} title={item.title} price={item.price} off={item.discount} rating={item.rating} status={item.status} imgUrl={item.thumbnail} productColors={item.colors} />
          </Box>)}
      </Carousel>
    </Box>;
};
export default Section3;