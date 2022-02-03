import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Button,
  Link as fabLink,
} from "react-floating-action-button";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { FoodService } from "../../services/";
import ErrorNotice from "../misc/ErrorNotice";
import FoodInsert from "./Food/FoodInsert";
import moment from "moment";
export default function Home() {
  const { userData } = useContext(UserContext);
  const caloriesLimit = process.env.REACT_APP_Calories_Threshold;
  const [error, setError] = useState();
  const [saveData, setSaveData] = useState(false);
  const [loadModal, setLoadModal] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const foodListCall = async () => {
    try {
      let resp = await FoodService.retrieveFoodList();
      console.log(resp.data);
      setFoodList(resp.data.foodList);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    foodListCall();
  }, []);

  const saveFood = async ({ name, calories, dateChange }) => {
    try {
      let resp = await FoodService.saveFood({
        name,
        calories,
        published: dateChange,
      });
      foodListCall();
      // setSaveData(true);
      // closeModal(false);
      setLoadModal(false);
    } catch (error) {}

    // console.log("nutrition", resp);
  };

  const onClickHandler = (e) => {
    const hiddenElement = e.currentTarget.nextSibling;
    hiddenElement.className.indexOf("collapse show") > -1
      ? hiddenElement.classList.remove("show")
      : hiddenElement.classList.add("show");
  };

  return (
    <div className="page">
      {userData.user ? (
        <React.Fragment>
          <h1>Welcome {userData.user.username}</h1>
          <div className="col-md-12">
            {error && (
              <ErrorNotice
                message={error}
                clearError={() => setError(undefined)}
              />
            )}
            {loadModal && (
              <FoodInsert
                closeModal={setLoadModal}
                saveFood={saveFood}
                foodList={foodList}
              />
            )}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Calories consumed</th>
                  {/* <th scope="col">Date in-take</th> */}
                </tr>
              </thead>
              <tbody>
                {foodList.length > 0 ? (
                  foodList.map((foodItem, index) => (
                    <React.Fragment>
                      <tr
                        key={foodItem._id}
                        onClick={onClickHandler}
                        className={`${
                          foodItem.total >= caloriesLimit
                            ? "calories_extend"
                            : ""
                        }`}
                      >
                        <th scope="row">{index + 1}</th>
                        <td>{foodItem._id}</td>
                        <td>{foodItem.total}</td>
                        {/* <td>
                          {moment(foodItem.published).format("Do MMMM YYYY")}
                        </td> */}
                      </tr>
                      <div className="collapse">
                        <table className="table">
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">product Name</th>
                            <th scope="col">Calories</th>
                            <th scope="col">Date in-take</th>
                          </tr>
                          {foodItem.foodItems.map((subitem, subIndex) => (
                            <tr key={foodItem._id + 1}>
                              <React.Fragment>
                                <th>{subIndex + 1}</th>
                                <td>{subitem.name}</td>
                                <td>{subitem.calories}</td>
                                <td>
                                  {moment(subitem.timeEat).format("hh:mm a")}
                                </td>
                              </React.Fragment>
                            </tr>
                          ))}
                        </table>
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    {/* <th scope="row"> </th> */}
                    <th rowSpan={4}>No Item Found</th>
                  </tr>
                )}
              </tbody>
            </table>
            <Container>
              <Button
                tooltip="Add New Food Item"
                icon="fa fa-plus"
                styles={{ backgroundColor: "#e02525", color: "#ffffff" }}
                key={"hdd"}
                rotate={false}
                onClick={() => setLoadModal(true)}
              />
            </Container>
          </div>
        </React.Fragment>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
}
