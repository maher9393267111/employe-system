import { useEffect, useState } from "react";
import { Container, Grid, Pagination } from "@mui/material";
import SEO from "components/SEO";
import { Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import SaleLayout from "components/layouts/SaleLayout";
import ProductCard1 from "components/product-cards/ProductCard1";
import productDatabase from "data/product-database";
import { renderProductCount } from "../src/lib";
import api from "utils/__api__/sales";
import Sticky from "components/Sticky";
import SaleNavbar from "components/navbar/SaleNavbar";
const PRODUCT_PER_PAGE = 28;
const SalePage2 = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("men");
  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);

  // handle page change
  const handlePageChange = (_, page) => setPage(page);

  // FETCH THE PRODUCTS
  useEffect(() => {
    api.getProducts(page).then(data => setProductList(data));
  }, [page]);

  // FETCH THE CATEGORY LIST
  useEffect(() => {
    api.getCategoriesTwo().then(data => setCategories(data));
  }, []);

  // HANDLE CHANGE CATEGORY
  const handleChangeCategory = category => () => setSelected(category);

  // CATEGORY NAV LIST
  const categoryNav = <Sticky fixedOn={0} scrollDistance={200}>
      <SaleNavbar selected={selected} categories={categories} onChangeCategory={handleChangeCategory} />
    </Sticky>;
  return <SaleLayout type="two" categoryNav={categoryNav}>
      <SEO title="Sale page v2" />

      <Container sx={{
      mt: 4
    }}>
        {/* PRODUCT LIST AREA */}
        <Grid container spacing={3} minHeight={500}>
          {productList.map(item => <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
              <ProductCard1 id={item.id} slug={item.slug} title={item.title} price={item.price} rating={item.rating} imgUrl={item.thumbnail} discount={item.discount} />
            </Grid>)}
        </Grid>

        {/* PAGINATION AREA */}
        <FlexBetween flexWrap="wrap" my={8}>
          <Span>
            {renderProductCount(page, PRODUCT_PER_PAGE, productDatabase.length)}
          </Span>

          <Pagination page={page} color="primary" variant="outlined" onChange={handlePageChange} count={Math.ceil(productDatabase.length / PRODUCT_PER_PAGE)} />
        </FlexBetween>
      </Container>
    </SaleLayout>;
};
export default SalePage2;