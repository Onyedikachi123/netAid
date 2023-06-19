import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { getErrorMsg } from "../helpers/index";
// import { useRouter } from "next/router";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    fullAddress: "",
    email: "",
    phoneNumber: "",
    ssn: "",
    driverLicense: "",
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
    if (!data.fullAddress) {
      err.push({ fullAddress: "Full address is required" });
    }
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      err.push({ email: "Valid email is required" });
    }
    if (!data.phoneNumber || !/^\d{11}$/.test(data.phoneNumber)) {
      err.push({ phoneNumber: "Valid phone number is required" });
    }
    if (!data.ssn || !/^\d{9}$/.test(data.ssn)) {
      err.push({ ssn: "Valid SSN is required" });
    }
    if (!data.driverLicense) {
      err.push({ driverLicense: "Driver's License is required" });
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
            // save data in session using next auth
            alert("User has been submitted successfully!");
            // Clear the form
            setData({
              firstName: "",
              lastName: "",
              fullAddress: "",
              email: "",
              phoneNumber: "",
              ssn: "",
              driverLicense: "",
              position: "",
            });
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

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="header">
            <h3 className="title">
              NeticAid.
              <span>
                <FontAwesomeIcon
                  icon={faBars}
                  style={{ fontSize: 20, color: "black" }}
                />
              </span>
            </h3>
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
                error={getErrorMsg("firstName", validateData)}
              />
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
                error={getErrorMsg("lastName", validateData)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Full Address
              </label>
              <input
                type="text"
                id="address"
                className="custom-input"
                name="fullAddress"
                placeholder="Enter text"
                value={data.fullAddress}
                onChange={handleInputChange}
                error={getErrorMsg("fullAddress", validateData)}
              />
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
                error={getErrorMsg("email", validateData)}
              />
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
                error={getErrorMsg("phoneNumber", validateData)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ssn" className="form-label">
                SSN
              </label>
              <input
                type="number"
                id="ssn"
                className="custom-input"
                name="ssn"
                placeholder="Enter text"
                value={data.ssn}
                onChange={handleInputChange}
                error={getErrorMsg("ssn", validateData)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lincense" className="form-label">
                Upload your driver lincense or state ID
              </label>

              <input
                type="file"
                id="file"
                className="custom-input"
                name="driverLicense"
                value={data.driverLicense}
                onChange={handleInputChange}
                error={getErrorMsg("driverLicense", validateData)}
              />
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
