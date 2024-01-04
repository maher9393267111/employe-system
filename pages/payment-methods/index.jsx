import Link from "next/link";
import { CreditCard, Delete, Edit } from "@mui/icons-material";
import { Button, Card, IconButton, Pagination, Typography } from "@mui/material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
const PaymentMethods = () => {
  // SECTION TITLE HEADER LINK
  const HEADER_LINK = <Link href="/payment-methods/add" passHref>
      <Button color="primary" sx={{
      bgcolor: "primary.light",
      px: "2rem"
    }}>
        Add New Payment Method
      </Button>
    </Link>;
  return <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader title="Payment Methods" icon={CreditCard} button={HEADER_LINK} />

      {/* ALL PAYMENT LIST AREA */}
      {paymentMethods.map((item, ind) => <TableRow sx={{
      my: "1rem",
      padding: "6px 18px"
    }} key={ind}>
          <FlexBox alignItems="center" m={0.75}>
            <Card sx={{
          width: 42,
          height: 28,
          mr: "10px",
          borderRadius: "2px"
        }}>
              <img src={`/assets/images/payment-methods/${item.payment_method}.svg`} alt={item.payment_method} width="100%" />
            </Card>

            <H5 whiteSpace="pre" m={0.75}>
              Ralf Edward
            </H5>
          </FlexBox>

          <Typography whiteSpace="pre" m={0.75}>
            {item.card_no}
          </Typography>

          <Typography whiteSpace="pre" m={0.75}>
            {item.exp}
          </Typography>

          <Typography whiteSpace="pre" textAlign="center" color="grey.600">
            <Link href="/payment-methods/xkssThds6h37sd" passHref>
              <IconButton>
                <Edit fontSize="small" color="inherit" />
              </IconButton>
            </Link>

            <IconButton onClick={e => e.stopPropagation()}>
              <Delete fontSize="small" color="inherit" />
            </IconButton>
          </Typography>
        </TableRow>)}

      {/* PAGINATION AREA */}
      <FlexBox justifyContent="center" mt={5}>
        <Pagination count={5} onChange={data => console.log(data)} />
      </FlexBox>
    </CustomerDashboardLayout>;
};
const paymentMethods = [{
  id: "1050017AS",
  exp: "08 / 2022",
  payment_method: "Amex",
  card_no: "1234 **** **** ****"
}, {
  id: "1050017AS",
  exp: "10 / 2025",
  payment_method: "Mastercard",
  card_no: "1234 **** **** ****"
}, {
  id: "1050017AS",
  exp: "N/A",
  payment_method: "PayPal",
  card_no: "ui-lib@email.com"
}, {
  id: "1050017AS",
  exp: "08 / 2022",
  payment_method: "Visa",
  card_no: "1234 **** **** ****"
}];
export default PaymentMethods;