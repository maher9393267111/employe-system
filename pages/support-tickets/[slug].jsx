import Link from "next/link";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Avatar, Box, Button, Divider, TextField } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H5, Span } from "components/Typography";
import CustomerService from "components/icons/CustomerService";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/ticket";
// ==========================================================

const SupportTicketDetails = ({
  ticket
}) => {
  const router = useRouter();

  // HANDLE FORM SUBMIT
  const handleFormSubmit = event => {
    event.preventDefault();
    console.log(event);
  };

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = <Link href="/support-tickets" passHref>
      <Button color="primary" sx={{
      px: 4,
      bgcolor: "primary.light"
    }}>
        Back to Support Ticket
      </Button>
    </Link>;

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader button={HEADER_LINK} icon={CustomerService} title="Support Ticket" navigation={<CustomerDashboardNavigation />} />

      {/* CONVERSATION LIST */}
      {ticket.conversation.map((item, ind) => <FlexBox gap={2} mb={4} key={ind}>
          <Avatar src={item.imgUrl} />

          <Box>
            <H5 fontWeight="600" mt={0} mb={0}>
              {item.name}
            </H5>

            <Span color="grey.600">
              {format(new Date(item.date), "hh:mm:a | dd MMM yyyy")}
            </Span>

            <Box borderRadius="10px" bgcolor="grey.200" p={2} mt={2}>
              {item.text}
            </Box>
          </Box>
        </FlexBox>)}

      <Divider sx={{
      mb: 4,
      borderColor: "grey.300"
    }} />

      {/* FORM AREA */}
      <form onSubmit={handleFormSubmit}>
        <TextField rows={8} fullWidth multiline sx={{
        mb: 3
      }} placeholder="Write your message here..." />

        <Button type="submit" color="primary" variant="contained" sx={{
        ml: "auto",
        display: "block"
      }}>
          Post message
        </Button>
      </form>
    </CustomerDashboardLayout>;
};
export const getStaticPaths = async () => {
  const paths = await api.getSlugs();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking" //indicates the type of fallback
  };
};

export const getStaticProps = async ({
  params
}) => {
  const ticket = await api.getTicket(String(params.slug));
  return {
    props: {
      ticket
    }
  };
};
export default SupportTicketDetails;