import { Container, Grid } from "@mui/material";
import { H2 } from "components/Typography";
import { BlogCard2 } from "components/blog-cards";
// =======================================

const Section8 = ({
  blogs
}) => {
  return <Container sx={{
    mt: 8
  }}>
      <H2 textAlign="center" mb={4}>
        Latest Articles
      </H2>

      <Grid container spacing={3}>
        {blogs.map(item => <Grid item md={4} xs={12} key={item.id}>
            <BlogCard2 title={item.title} date={item.createdAt} image={item.thumbnail} description={item.description} />
          </Grid>)}
      </Grid>
    </Container>;
};
export default Section8;