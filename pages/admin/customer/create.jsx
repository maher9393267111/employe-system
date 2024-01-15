import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { CustomerForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { useDispatch, useSelector } from "react-redux";
import { AddCustomer } from "../../../redux/customerApiRequest";
import { useState } from "react";
import { UploadImage } from "../../../redux/customerApiRequest";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { fetchWord } from "../../../redux/lang/fetchword";
// import api from "utils/__api__/products";

// =============================================================================
CreateCustomer.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  phoneNumber: "",
  ssn: "",
  gender: "",
  city: "",
  zip: "",
  birthday:""
};

// form field validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),

  email: yup.string().email("invalid email").required("Email is required"),
  address: yup.string().required("required"),
  phoneNumber: yup.number().required("required"),
  zip: yup.number().required("required"),
  city: yup.string().required("required"),
  ssn: yup.number().required("required"),
  gender: yup.string().required("required"),
  work: yup.string().required("required"),
  state: yup.string().required("required"),
  date: yup.string().required("required"),
  
});

export default function CreateCustomer() {
  const dispatch = useDispatch();
  const agentId = useSelector(
    (state) => state.auth?.login?.currentUser?.payload?.id
  );

  const [images, setImages] = useState(null);
  const [audiofile, setAudioFile] = useState(null);
  const [signature, setSignature] = useState("");

  console.log("id", agentId);
  const handleFormSubmit = async (values) => {
    console.log("IMAGEEEEE", values);

    values.files = images;

    values.audio = audiofile;
    values.signature = signature;

    console.log("Customer Create", signature);
    dispatch(AddCustomer(values, agentId));
  };


  const {locale} = useRouter();
  // const [locale, setLocale] = useState(i18n.language)





  return (
    <Box py={4}>
      <H3 mb={2}>{fetchWord("addCustomer",locale)}</H3>




      <CustomerForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
        buttontext={fetchWord("addCustomer",locale)}
        images={images}
        setImages={setImages}
        audiofile={audiofile}
        setAudioFile={setAudioFile}
        signature={signature}
        setSignature={setSignature}
      />
    </Box>
  );
}
