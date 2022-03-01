import React, { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";
import customFetch from "./fetch/customFetch";
import { monthList, yearList } from "./utils/globalUtils";
import { postCall } from "./utils/url";

const dummyNumberPlaceholder = "#### #### #### ####";
function App() {
  const [creditCardNum, setCreditCardNum] = useState(dummyNumberPlaceholder);
  const [cardHolder, setCardHolder] = useState("Your Full Name");
  const [expireMonth, setExpireMonth] = useState("MM");
  const [expireYear, setExpireYear] = useState("YYYY");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNum = ({ target: { value } }) => setCreditCardNum(value);

  const handleCardHolder = ({ target: { value } }) => setCardHolder(value);

  const handleExpMonth = ({ target: { value } }) => setExpireMonth(value);

  const handleExpYear = ({ target: { value } }) => setExpireYear(value);

  const handleCVVChange = ({ target: { value } }) => setCvv(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, error } = checkValid();
    if (isValid) {
      fetchApi();
    } else alert(error);
  };

  const fetchApi = async () => {
    const data = {
      cardNo: creditCardNum,
      cvv,
      expiryMonth: expireMonth,
      expiryYear: expireYear,
      name: cardHolder,
    };
    setLoading(true);
    const response = await customFetch(postCall, "POST", data);
    const responseData = response.data;
    if (responseData.success && typeof responseData.data === "object")
      alert(JSON.stringify(responseData.data));
    else alert(responseData.data || "");
    setLoading(false);
  };

  const checkValid = () => {
    if (creditCardNum.length !== 16)
      return {
        isValid: false,
        error: "Please enter 16 digits in credit card number",
      };
    else if (cardHolder.trim() === "")
      return {
        isValid: false,
        error: "Please enter the card holder name!",
      };
    else if (cvv.length < 3)
      return {
        isValid: false,
        error: "Please enter 3 digits in CVV",
      };
    else if (expireYear === "YYYY")
      return {
        isValid: false,
        error: "Please select a year",
      };
    else if (expireMonth === "MM")
      return {
        isValid: false,
        error: "Please select a month",
      };
    return {
      isValid: true,
    };
  };

  return (
    <div className="wrapper">
      <div className="container">
        <form id="form" onSubmit={handleSubmit}>
          <div id="card">
            <div className="header">
              <div className="sticker"></div>
            </div>
            <div className="body">
              <h2 id="creditCardNumber">
                {creditCardNum.length > 0
                  ? creditCardNum
                  : dummyNumberPlaceholder}
              </h2>
            </div>
            <div className="footer">
              <div>
                <h5>Card Holder</h5>
                <h3>{cardHolder}</h3>
              </div>
              <div>
                <h5>Expires</h5>
                <h3>
                  {expireMonth} / {expireYear}
                </h3>
              </div>
            </div>
          </div>

          <div className="input-container">
            <h4 className="section-header">Enter card number</h4>
            <Input
              type="number"
              value={creditCardNum}
              onChange={handleNum}
              placeholder={"Enter card number"}
              className={"input"}
              required
            />
          </div>

          <div className="input-container">
            <h4 className="section-header">Card Holder</h4>
            <Input
              onChange={handleCardHolder}
              type="text"
              placeholder="Please enter your full name"
              className={"input"}
              required
            />
          </div>

          <div className="input-grp">
            <div className="input-container">
              <h4 className="section-header">Expiration Month</h4>
              <Select
                list={monthList}
                onChange={handleExpMonth}
                value={expireMonth}
                label={{ value: "MM", text: "Select a month" }}
                className={"select"}
              />
            </div>
            <div className="input-container">
              <h4 className="section-header">Year</h4>
              <Select
                list={yearList}
                onChange={handleExpYear}
                value={expireYear}
                label={{ value: "YYYY", text: "Select a year" }}
                className={"select"}
              />
            </div>
            <div className="input-container">
              <h4 className="section-header">CVV</h4>
              <Input
                type="password"
                placeholder="CVV"
                onChange={handleCVVChange}
                value={cvv}
                className={"input"}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className={`submit-button ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default App;
