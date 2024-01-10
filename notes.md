    <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
          

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  color="info"
                  size="medium"
                  placeholder="Email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
               
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="firstName"
                  label="firstName"
                  color="info"
                  size="medium"
                  placeholder="firstName"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="lastName"
                  label="lastName"
                  color="info"
                  size="medium"
                  placeholder="lastName"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>





              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  // value={values.address}
                  value={values.address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  label="phone"
                  color="info"
                  size="medium"
                  placeholder="Name"
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Grid>

           

              <Grid item xs={12}>
                <DropZone
                  title="Drop & drag category image"
                  onChange={(files) => handleChangeDropZone(files)}
                />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                    return (
                      <UploadImageBox key={index}>
                        <BazaarImage src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file)} />
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
              </Grid>

              {/* <Grid item sm={6} xs={12}>
                <FormControlLabel label="Featured Category" control={<Checkbox color="info" name="featured" onBlur={handleBlur} onChange={handleChange} value={values.featured} />} />
              </Grid> */}

               {values.firstName}
  ,   {values.lastName} ,    {values.address}   ,  {values.email}
              <Grid item xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Save Customer
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>

--------------------------



  {userRole[0] === "admin" && (
            <Grid item sx={12} lg={3}>
              <FormControl
                style={{ width: "100% !important" }}
                sx={{ width: "full" }}
                size="medium"
              >
                <InputLabel
                  sx={{ width: "full" }}
                  id="bucket-simple-select-label"
                  size="small"
                  color="info"
                  variant="outlined"
                >
                  Status
                </InputLabel>
                <Select
                  sx={{
                    height: 44,
                    paddingRight: 0,
                    borderRadius: 300,
                    color: "grey.700",
                    overflow: "hidden",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.info",
                    },
                  }}
                  // sx={{ width: "full" }}
                  color="info"
                  labelId="bucket-simple-select-label"
                  id="bucket-simple-select"
                  value={searchstatus}
                  label="FilterBy"
                  onChange={handleSearchStatusChange}
                  fullWidth
                >
                  <MenuItem color="info" value="">
                    All
                  </MenuItem>

                  <MenuItem
                    color="info"
                    value="accepted"
                    sx={{ alignItems: "center" }}
                  >
                    Accepted
                  </MenuItem>
                  <MenuItem color="info" value="pending">
                    Pending
                  </MenuItem>

                  <MenuItem color="info" value="admincustomers">
                    admin customers
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}


-----------------------

 <div>
              <Select
                sx={{
                  height: 44,
                  paddingRight: 0,
                  borderRadius: 300,
                  color: "grey.700",
                  overflow: "hidden",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.info",
                  },
                }}
                labelId="SortBy"
                id="sort-by-select"
                value={sortText}
                onChange={handleSort}
                placeholder="SortBy"
                fullWidth
                variant="outlined"
                color="info"
              >
                <MenuItem value={"firstnameAsc"} sx={{ alignItems: "center" }}>
                  sortBy FirstName Asc
                </MenuItem>

                <MenuItem value="firstnameDesc" sx={{ alignItems: "center" }}>
                  sortBy FirstName Desc
                </MenuItem>

                <MenuItem value="emailAsc">sortBy Email Asc</MenuItem>

                <MenuItem value="emailDesc">sortBy Email Desc</MenuItem>
              </Select>
            </div>
