import React, { useState } from "react";
import { getErrorMsg } from "../helpers/index";
// import { useRouter } from "next/router";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    streetName: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    phoneNumber: "",
    ssn: "",
    identityDocument: "",
    identityDocumentBack: "",
    position: "",
  });

  const [validationErrors, setValidationErrors] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("");
  // const router = useRouter()

  const validateData = () => {
    const err = [];
    if (!data.firstName || data.firstName.length < 4) {
      err.push({ firstName: "First name must be at least 4 characters long" });
    }
    if (!data.lastName || data.lastName.length < 4) {
      err.push({ lastName: "Last name must be at least 4 characters long" });
    }
    if (!data.streetName) {
      err.push({ streetName: "Street Name is required" });
    }
    if (!data.city) {
      err.push({ city: "City is required" });
    }
    if (!data.state) {
      err.push({ state: "State is required" });
    }
    if (!data.zipCode) {
      err.push({ zipCode: "Valid 5-digit Zip Code is required" });
    }
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      err.push({ email: "Valid email is required" });
    }
    if (!data.phoneNumber) {
      err.push({ phoneNumber: "Valid phone number is required" });
    }
    if (!data.ssn || !/^\d{9}$/.test(data.ssn)) {
      err.push({ ssn: "Valid SSN is required" });
    }
    if (!data.identityDocument) {
      err.push({ identityDocument: "Identity Document (Front) is required" });
    }
    if (!data.identityDocumentBack) {
      err.push({
        identityDocumentBack: "Identity Document (Back) is required",
      });
    }
    if (!data.position) {
      err.push({ position: "Position is required" });
    }
    console.log(err);
    setValidationErrors(err);
    if (err.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleSignup = async (event) => {
    try {
      event.preventDefault();
      const isValid = validateData();
      console.log(isValid, validationErrors);
      if (isValid) {
        console.log("enter");
        try {
          setLoading(true);
          console.log({ data });
          const apiRes = await axios.post(
            "http://localhost:3000/api/auth/signup",
            data
          );
          console.log(apiRes);
          if (apiRes.data.success) {
            // Clear the form
            setData({
              firstName: "",
              lastName: "",
              streetName: "",
              city: "",
              state: "",
              zipCode: "",
              email: "",
              phoneNumber: "",
              ssn: "",
              identityDocument: "",
              identityDocumentBack: "",
              position: "",
            });
            // save data in session using next auth
            alert("User has been submitted successfully!");

            // setMessage("Information stored successfully")
            //     const loginRes = await loginUser({
            //       email: data.email,
            //       password: data.password
            //   });

            //   if (loginRes && !loginRes.ok) {
            //       setSubmitError(loginRes.error || "")
            //   }
            //   else {
            //       router.push("/")
            //  }
          }
        } catch (error) {
          if (error && error.response && error.response.data) {
            const errorMsg = error.response.data.error;
            setSubmitError(errorMsg);
          }
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setData((prev) => ({ ...prev, position: event.target.value }));
    // setPosition(event.target.value)
  };

  const getError = (field) => {
    const errorObj = validationErrors.find(
      (error) => Object.keys(error)[0] === field
    );
    return errorObj ? Object.values(errorObj)[0] : "";
  };

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="header">
            <h3 className="title">NeticAid.</h3>
          </div>
          <form className="custom-form" onSubmit={handleSignup}>
            <h3>Entry Level Recruitment Role-No Experience Required!</h3>
            <div className="form-group">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="fname"
                className="custom-input"
                placeholder="Enter text"
                name="firstName"
                value={data.firstName}
                onChange={handleInputChange}
                required
                // error={getErrorMsg("firstName", validateData)}
              />
              <p className="errorText">{getError("firstName")}</p>
            </div>
            <div className="form-group">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                className="custom-input"
                name="lastName"
                placeholder="Enter text"
                value={data.lastName}
                onChange={handleInputChange}
                // error={getErrorMsg("lastName", validateData)}
              />
              <p className="errorText">{getError("lastName")}</p>
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Street Name
              </label>
              <input
                type="text"
                id="address"
                className="custom-input"
                name="streetName"
                placeholder="Enter text"
                value={data.streetName}
                onChange={handleInputChange}
                // error={getErrorMsg("streetName", validateData)}
              />
              <p className="errorText">{getError("streetName")}</p>
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                City
              </label>
              <input
                type="text"
                id="address"
                className="custom-input"
                name="city"
                placeholder="Enter text"
                value={data.city}
                onChange={handleInputChange}
                // error={getErrorMsg("city", validateData)}
              />
              <p className="errorText">{getError("city")}</p>
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                State
              </label>
              <input
                type="text"
                id="address"
                className="custom-input"
                name="state"
                placeholder="Enter text"
                value={data.state}
                onChange={handleInputChange}
                // error={getErrorMsg("state", validateData)}
              />
              <p className="errorText">{getError("state")}</p>
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Zip Code
                <p>(Make sure that it has 5 digits)</p>
              </label>
              <input
                type="text"
                id="address"
                className="custom-input"
                name="zipCode"
                placeholder="Enter text"
                value={data.zipCode}
                onChange={handleInputChange}
                // error={getErrorMsg("zipCode", validateData)}
              />
              <p className="errorText">{getError("zipCode")}</p>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                id="email"
                className="custom-input"
                name="email"
                placeholder="Enter text"
                value={data.email}
                onChange={handleInputChange}
                // error={getErrorMsg("email", validateData)}
              />
              <p className="errorText">{getError("email")}</p>
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                className="custom-input"
                name="phoneNumber"
                placeholder="Enter text"
                value={data.phoneNumber}
                onChange={handleInputChange}
                // error={getErrorMsg("phoneNumber", validateData)}
              />
              <p className="errorText">{getError("phoneNumber")}</p>
            </div>
            <div className="form-group">
              <label htmlFor="ssn" className="form-label">
                SSN
                <p>(Your Social security number(SSN) must have 9 digits)</p>
              </label>
              <input
                type="number"
                id="ssn"
                className="custom-input"
                name="ssn"
                placeholder="Enter text"
                value={data.ssn}
                onChange={handleInputChange}
                // error={getErrorMsg("ssn", validateData)}
              />
              <p className="errorText">{getError("ssn")}</p>
            </div>
            <div className="form-group">
              <label htmlFor="lincense" className="form-label">
                Upload your driver lincense or state ID(Front)
              </label>

              <input
                type="file"
                id="file"
                className="custom-input"
                name="identityDocument"
                value={data.identityDocument}
                onChange={handleInputChange}
                // error={getErrorMsg("identityDocument", validateData)}
              />
              <p className="errorText">{getError("identityDocument")}</p>
            </div>

            <div className="form-group">
              <label htmlFor="lincense" className="form-label">
                Upload your driver lincense or state ID(Black)
              </label>

              <input
                type="file"
                id="file"
                className="custom-input"
                name="identityDocumentBack"
                value={data.identityDocumentBack}
                onChange={handleInputChange}
                // error={getErrorMsg("identityDocumentBack", validateData)}
              />
              <p className="errorText">{getError("identityDocumentBack")}</p>
            </div>
            <div className="form-group">
              <label htmlFor="position" className="form-label">
                Position Available
                <p>
                  (if you cant find what you are looking for click on
                  &apos;other&apos;)
                </p>
                <select
                  name="position"
                  id="position"
                  value={data.position}
                  onChange={handleChange}
                >
                  <option value="Customer Service">Customer service</option>
                  <option value="Data Entry">Data Entry</option>
                  <option value="Virtual Assistant">Virtual Assistant</option>
                  <option value="Sales Assistant">Sales Assistant</option>
                  <option value="Virtual Book Keeper">
                    Virtual Book Keeper
                  </option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <p className="errorText">{getError("position")}</p>
            </div>
            <button className="custom-button errorText" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
