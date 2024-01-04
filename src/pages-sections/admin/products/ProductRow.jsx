import { useState } from "react";
import { useRouter } from "next/router";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography";
import { currency } from "lib";
import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../StyledComponents";

// ========================================================================

// ========================================================================

const ProductRow = ({
  product
}) => {
  const {
    category,
    name,
    price,
    image,
    brand,
    id,
    published,
    slug
  } = product;
  const router = useRouter();
  const [productPulish, setProductPublish] = useState(published);
  return <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar src={image} sx={{
          borderRadius: "8px"
        }} />
          <Box>
            <Paragraph>{name}</Paragraph>
            <Small color="grey.600">#{id.split("-")[0]}</Small>
          </Box>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{category}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        <Avatar src={brand} sx={{
        width: 55,
        height: "auto",
        borderRadius: 0
      }} />
      </StyledTableCell>

      <StyledTableCell align="left">{currency(price)}</StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={productPulish} onChange={() => setProductPublish(state => !state)} />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/admin/products/${slug}`)}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
};
export default ProductRow;