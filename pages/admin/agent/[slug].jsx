import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { AgentForm, AgentUpdateForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useDispatch } from "react-redux";
import { getSingleAgent, UpdateAgent } from "../../../redux/agentApiRequest";
import Skeleton from "@mui/material/Skeleton";


// =============================================================================
EditAgent.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function EditAgent({}) {
  // console.log("inSERVER" ,data)
  const dispatch = useDispatch();
  const { query } = useRouter();

  const INITIAL_VALUES = {
    fullName: "",

    username: "",
    email: "",
    adress: "",
    phoneNumber: "",
    roles: "admin",
  };

  // form field validation schema
  const validationSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    username: yup.string().required("required"),
    email: yup.string().email("invalid email").required("Email is required"),
    address: yup.string().required("required"),
    phoneNumber: yup.number().required("required"),
    // password: yup.string().required("Password is required"),
  });

  const [brand, setBrand] = useState({
    fullName: "",

    username: "",
    email: "",
    adress: "",
    phoneNumber: "",
    roles: "admin",
  });

  useEffect(() => {
    if (query.slug) {
      getSingleAgent(query.slug).then((data) => {
        console.log("DATA", data);
        setBrand((state) => ({
          ...state,

          username: data?.username,
          fullName: data?.fullName,
          address: data?.address,
          phoneNumber: data?.phoneNumber,
          email: data?.email,
        }));
      });
    }
  }, [query.slug]);

  const handleFormSubmit = (values) => {
    console.log(values);
    UpdateAgent(values, query.slug, dispatch);
  };

  console.log("inAGENT ", brand);

  return (
    <Box py={4}>
      <H3 mb={2}>Edit Agent</H3>

      {!brand?.email  && (
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





      {brand && brand?.email && (
        <AgentForm
          initialValues={brand}
          validationSchema={validationSchema}
          handleFormSubmit={handleFormSubmit}
          slug={query.slug}
          isedit ={true}
        />
      )}
    </Box>
  );
}




// export async function getServerSideProps({ params }) {
//   const slug = params.slug;
  

//   return {
//     props: {
  
//     },
//   };
// }
