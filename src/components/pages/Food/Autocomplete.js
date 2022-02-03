import React, { useState, useEffect } from "react";
import { FoodService } from "../../../services/";

const Autocomplete = ({ search, onClickItem }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [info, setInfo] = useState({});
  useEffect(() => {
    const makeAutocompleteCall = async () => {
      setIsLoaded(false);
      let response = await FoodService.retrieveNutriotionItems(search);
      const { data } = response;
      console.log(data);
      setInfo(data.branded);
      setIsLoaded(true);
    };
    makeAutocompleteCall();
  }, [search]);

  if (!isLoaded) {
    return <div>....Loading</div>;
  }
  return (
    <ul className="list-group" style={{ margin: "0px" }}>
      {info.length > 0 ? (
        info.map((item, index) => (
          <li
            className="list-group-item"
            key={item.nix_item_id}
            onClick={() => onClickItem(item)}
            style={{ margin: "0px" }}
          >
            <img
              style={{ width: "35px", height: "45px" }}
              src={item.photo.thumb}
              alt="  "
            ></img>
            {item.food_name} <br />
            <small>contains {item.nf_calories} calories per item</small>
          </li>
        ))
      ) : (
        <li className="list-group-item">No Product Found</li>
      )}
    </ul>
  );
};
export default Autocomplete;
