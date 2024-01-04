import Link from "next/link";
import { Box, Container, Grid, styled } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";
import CategoryIcon from "components/icons/Category";
import CategorySectionHeader from "components/CategorySectionHeader";
const StyledBazaarCard = styled(BazaarCard)(({
  theme
}) => ({
  display: "flex",
  borderRadius: 8,
  padding: "0.75rem",
  alignItems: "center",
  transition: "all 250ms ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[3]
  }
}));

// ============================================================

// ============================================================

const Section10 = ({
  categories
}) => {
  return <Container sx={{
    mb: "70px"
  }}>
      <CategorySectionHeader seeMoreLink="#" title="Categories" icon={<CategoryIcon color="primary" />} />

      <Grid container spacing={3}>
        {categories.map((item, ind) => <Grid item lg={2} md={3} sm={4} xs={12} key={ind}>
            <Link href={`/product/search/${item.slug}`} passHref>
              <a>
                <StyledBazaarCard elevation={1}>
                  <LazyImage width={52} height={52} alt="fashion" src={item.image} objectFit="contain" borderRadius="8px" />
                  <Box fontWeight="600" ml={1.25}>
                    {item.name}
                  </Box>
                </StyledBazaarCard>
              </a>
            </Link>
          </Grid>)}
      </Grid>
    </Container>;
};
export default Section10;