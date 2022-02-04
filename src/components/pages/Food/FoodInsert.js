import React, { useState, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import { FoodService } from "../../../services/";
import Autocomplete from "./Autocomplete";
import ErrorNotice from "../../misc/ErrorNotice";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";

export default function FoodInsert({ saveFood, closeModal }) {
  const [name, setName] = React.useState("");
  const [error, setError] = useState();
  const [dateChange, onDateChange] = React.useState(new Date());
  const [calories, setCalories] = React.useState(0);
  const [display, setDisplay] = React.useState(false);
  const [productName, setProductName] = React.useState("");

  const setDetail = (value) => {
    // console.log("sele", value);
    setProductName(value);
    setDisplay(false);
    setName(value.food_name);
    setCalories(Math.round(value.nf_calories));
  };
  const saveFoodData = (e) => {
    e.preventDefault();
    if (productName) {
      saveFood({ name, calories, dateChange });
    } else {
      setError("please select a product");
    }
  };
  return (
    <React.Fragment>
      <div className="modal" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Food Entry</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => closeModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                {error && (
                  <ErrorNotice
                    message={error}
                    clearError={() => setError(undefined)}
                  />
                )}
                <label htmlFor="product_name" className="form-label ">
                  First Name
                </label>
                <input
                  id="product_name"
                  name="product_name"
                  value={name}
                  onChange={(e) => {
                    setDisplay(true);
                    setName(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Apple"
                />
                {display && name && (
                  <Autocomplete search={name} onClickItem={setDetail} />
                )}

                <label htmlFor="calories" className="form-label">
                  Calories
                </label>
                <input
                  id="calories"
                  type="number"
                  value={calories}
                  className="form-control"
                  name="calories"
                  disabled={true}
                  placeholder="Doe"
                />
                <label className="form-label">Date in-take</label>
                <DateTimePicker
                  disableClock={true}
                  onChange={onDateChange}
                  maxDate={new Date()}
                  clearIcon={null}
                  value={dateChange}
                  className="form-control"
                />
                <br />
                <div style={{ display: "flex" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => closeModal(false)}
                  >
                    Close
                  </button>
                  {/* <button type="submit">Submit</button> */}
                  <button
                    // type="submit"
                    disabled={!productName || !dateChange}
                    style={{ marginLeft: "3px" }}
                    // className={btn {(!productName || !dateChange) ? }
                    className={`btn btn-primary ${
                      !productName || !dateChange ? "disabled" : "active"
                    }`}
                    onClick={(e) => saveFoodData(e)}
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
