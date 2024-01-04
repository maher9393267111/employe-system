import { styled } from "@mui/material";
import BazaarCard from "components/BazaarCard";
import LazyImage from "components/LazyImage";
import { H4 } from "components/Typography";

// styled component
const StyledBazaarCard = styled(BazaarCard)(({
  theme
}) => ({
  gap: "1rem",
  display: "flex",
  borderRadius: 5,
  cursor: "pointer",
  alignItems: "center",
  padding: "0.75rem 1rem",
  "&:hover": {
    boxShadow: theme.shadows[2]
  }
}));

// ==============================================================================

// ==============================================================================

const ProductCategoryItem = ({
  title,
  imgUrl,
  isSelected,
  sx = {},
  ...others
}) => {
  return <StyledBazaarCard elevation={isSelected ? 2 : 0} sx={{
    bgcolor: isSelected ? "white" : "grey.100",
    ...sx
  }} {...others}>
      {imgUrl && <LazyImage width={20} height={20} layout="fixed" objectFit="cover" src={imgUrl} alt="" />}
      <H4 lineHeight="1" textTransform="capitalize">
        {title}
      </H4>
    </StyledBazaarCard>;
};
export default ProductCategoryItem;