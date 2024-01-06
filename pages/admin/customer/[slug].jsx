import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { CustomerForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useDispatch } from "react-redux";
import {
  getSingleCustomer,
  UpdateCustomer,
  getSingleCustomerRedux,
} from "../../../redux/customerApiRequest";
// import Skeleton from 'react-loading-skeleton';
import Skeleton from "@mui/material/Skeleton";
// import api from "utils/__api__/products";

// =============================================================================
EditAgent.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function EditAgent({}) {
  // console.log("inSERVER" ,data)
  const dispatch = useDispatch();
  const { query } = useRouter();

  // form field validation schema
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),

    email: yup.string().email("invalid email").required("Email is required"),
    address: yup.string().required("required"),
    phoneNumber: yup.number().required("required"),
  });

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (query.slug) {
      getSingleCustomer(query.slug)
        .then((data) => {
          console.log("DATA", data);
          setCustomer((state) => ({
            ...state,

            firstName: data?.firstName,
            lastName: data?.lastName,
            address: data?.address,
            phoneNumber: data?.phoneNumber,
            email: data?.email,
          }));
        })
        .then(() => {
          setLoading(false);
        });

      setLoading(false);
    }
  }, [query.slug]);

  const handleFormSubmit = (values) => {
    console.log(values);
    UpdateCustomer(values, query.slug);
  };

  console.log("inCustomer ", customer);

  return (
    <Box py={4}>
      <H3 mb={2}>Edit Customer</H3>

      <div>
        {!customer?.email  && (
          <div style={{ width: "100%" }} className="p-5">
            <Skeleton
              variant="rounded"
              width={"full"}
              height={60}
              sx={{ margin: "12px" }}
            />
            <Skeleton
              variant="rounded"
              width={"full"}
              height={60}
              sx={{ margin: "12px" }}
            />
            <Skeleton
              variant="rounded"
              width={"full"}
              height={60}
              sx={{ margin: "12px" }}
            />
            <Skeleton
              variant="rounded"
              width={"full"}
              height={60}
              sx={{ margin: "12px" }}
            />
            <Skeleton
              variant="rounded"
              width={"full"}
              height={60}
              sx={{ margin: "12px" }}
            />

            <Skeleton
              variant="rounded"
              width={222}
              height={60}
              sx={{ margin: "12px" }}
            />
          </div>
        )}

        {customer && customer?.email  && (
          <CustomerForm
            initialValues={customer}
            validationSchema={validationSchema}
            handleFormSubmit={handleFormSubmit}
            slug={query.slug}
            buttontext="Edit customer"
            isedit={true}
          />
        )}
        nnn
      </div>
    </Box>
  );
}
