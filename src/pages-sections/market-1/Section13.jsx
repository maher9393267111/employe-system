import { useEffect, useState } from "react";
import Link from "next/link";
import { Box } from "@mui/material";
import BazaarCard from "components/BazaarCard";
import { FlexBox } from "components/flex-box";
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";
import { H4 } from "components/Typography";
import GiftBox from "components/icons/GiftBox";
import useWindowSize from "hooks/useWindowSize";
import Carousel from "components/carousel/Carousel";
import CategorySectionCreator from "components/CategorySectionCreator";
import { calculateDiscount, currency } from "lib";

// ========================================================

// ========================================================

const Section13 = ({
  bigDiscountList
}) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(6);
  useEffect(() => {
    if (width < 370) setVisibleSlides(1);else if (width < 650) setVisibleSlides(2);else if (width < 950) setVisibleSlides(4);else setVisibleSlides(6);
  }, [width]);
  return <CategorySectionCreator icon={<GiftBox />} title="Big Discounts" seeMoreLink="#">
      <Box my="-0.25rem">
        <Carousel totalSlides={9} visibleSlides={visibleSlides}>
          {bigDiscountList.map(({
          id,
          title,
          thumbnail,
          price,
          discount,
          slug
        }) => <Box py={0.5} key={id}>
                <BazaarCard sx={{
            p: "1rem"
          }}>
                  <Link href={`/product/${slug}`} passHref>
                    <a>
                      <HoverBox borderRadius="8px" mb={1}>
                        <LazyImage width={100} height={100} alt={title} src={thumbnail} layout="responsive" />
                      </HoverBox>

                      <H4 fontWeight="600" fontSize="14px" mb={0.5}>
                        {title}
                      </H4>

                      <FlexBox gap={1}>
                        <H4 fontWeight="600" fontSize="14px" color="primary.main">
                          {calculateDiscount(price, discount)}
                        </H4>

                        <H4 fontWeight="600" fontSize="14px" color="grey.600">
                          <del>{currency(price)}</del>
                        </H4>
                      </FlexBox>
                    </a>
                  </Link>
                </BazaarCard>
              </Box>)}
        </Carousel>
      </Box>
    </CategorySectionCreator>;
};
export default Section13;