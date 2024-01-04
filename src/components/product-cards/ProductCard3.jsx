import Link from "next/link";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import HoverBox from "components/HoverBox";
import { H4 } from "components/Typography";
import LazyImage from "components/LazyImage";
import BazaarRating from "components/BazaarRating";
import { FlexBetween, FlexBox } from "components/flex-box";
import { calculateDiscount, currency } from "lib";

// ========================================================

// ========================================================

const ProductCard3 = ({
  slug,
  title,
  price,
  imgUrl,
  rating,
  off = 20,
  hideReview,
  hideFavoriteIcon
}) => {
  const [favorite, setFavorite] = useState(false);
  return <Box>
      <Link href={`/product/${slug}`}>
        <a>
          <HoverBox sx={{
          borderRadius: "8px",
          overflow: "hidden"
        }}>
            <LazyImage width={0} mx="auto" height={0} alt={title} src={imgUrl} layout="responsive" />
          </HoverBox>
        </a>
      </Link>

      <FlexBetween mt={2}>
        <Box>
          <H4 fontWeight="600" fontSize="14px" mb={0.5} title={title} ellipsis>
            {title}
          </H4>

          {!hideReview && <BazaarRating value={rating} color="warn" readOnly />}

          <FlexBox gap={1} alignItems="center">
            <Box fontWeight="600" color="primary.main">
              {calculateDiscount(price, off)}
            </Box>

            {!!off && <Box color="grey.600" fontWeight="600">
                <del>{currency(price)}</del>
              </Box>}
          </FlexBox>
        </Box>

        {!hideFavoriteIcon && <Button disableRipple disableElevation onClick={() => setFavorite(state => !state)} sx={{
        height: "0",
        alignItems: "flex-start",
        "&:hover": {
          backgroundColor: "transparent"
        }
      }}>
            {favorite ? <Favorite fontSize="small" color="primary" /> : <FavoriteBorder fontSize="small" sx={{
          opacity: 0.5
        }} />}
          </Button>}
      </FlexBetween>
    </Box>;
};
export default ProductCard3;