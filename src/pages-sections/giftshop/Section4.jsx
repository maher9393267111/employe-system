import Link from "next/link";
import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { H1 } from "components/Typography";
import Carousel from "components/carousel/Carousel";
import ProductCard15 from "components/product-cards/ProductCard15";
import useWindowSize from "hooks/useWindowSize";
// ===============================================

const Section4 = ({
  categoryList
}) => {
  const theme = useTheme();
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(3);
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);else if (width < 650) setVisibleSlides(2);else if (width < 950) setVisibleSlides(3);else setVisibleSlides(3);
  }, [width]);
  return <Box>
      <H1 my={2}>Top Categories</H1>
      <Carousel infinite={true} visibleSlides={visibleSlides} totalSlides={categoryList.length} sx={{
      "& #backArrowButton, #backForwardButton": {
        width: 35,
        height: 35,
        borderRadius: 0,
        boxShadow: theme.shadows[2],
        color: theme.palette.primary.main,
        background: theme.palette.primary[50],
        "&:hover": {
          background: theme.palette.primary[100]
        }
      }
    }}>
        {categoryList.map((item, ind) => <Link href="#" key={ind}>
            <a>
              <ProductCard15 title={item.name} available={item.description} imgUrl={item.image} />
            </a>
          </Link>)}
      </Carousel>
    </Box>;
};
export default Section4;