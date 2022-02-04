import React, { useContext, useEffect, useState } from "react";

import UserContext from "../../../context/UserContext";
import { FoodService } from "../../../services";

export default function ManageUsers() {
  const { userData } = useContext(UserContext);
  const caloriesLimit = process.env.REACT_APP_Calories_Threshold;
  const [error, setError] = useState();
  const [saveData, setSaveData] = useState(false);
  const [loadModal, setLoadModal] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const foodListCall = async () => {
    try {
      let resp = await FoodService.retrieveFoodList();
      //   console.log(resp.data);
      setFoodList(resp.data.foodList);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    // foodListCall();
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

  return (
    <div className="row">
      <h1>Under Construction</h1>
    </div>
  );
}
