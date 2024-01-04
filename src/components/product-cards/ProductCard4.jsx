import { Box } from "@mui/material";
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";
import { H4, Small } from "components/Typography";
import BazaarRating from "components/BazaarRating";
import { FlexRowCenter } from "components/flex-box";
import { currency } from "lib";

// ======================================================

// ======================================================

const ProductCard4 = ({
  title,
  price,
  imgUrl,
  rating = 5,
  reviewCount = 0
}) => {
  return <Box>
      <HoverBox mb={2} mx="auto" borderRadius="8px">
        <LazyImage src={imgUrl} width={0} height={0} layout="responsive" alt={title} mx="auto" />
      </HoverBox>

      <FlexRowCenter mb={0.5}>
        <BazaarRating value={rating} color="warn" readOnly />
        <Small fontWeight={600} pl={0.5}>
          ({reviewCount})
        </Small>
      </FlexRowCenter>

      <H4 fontSize={14} textAlign="center" mb={0.5} title={title} ellipsis>
        {title}
      </H4>

      <H4 fontSize={14} textAlign="center" color="primary.main">
        {currency(price)}
      </H4>
    </Box>;
};
export default ProductCard4;