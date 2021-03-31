import React from "react";

const Attraction = (props) => {
  return (
    <div>
      <div>
        <ul className="attractions">
          {props.attractions.map((attraction) => (
            <li key={attraction._id}>
              <div className="attraction">
                <a href={"#" + attraction._id}>
                  <img src={attraction.image} alt={attraction.title}></img>
                  <p>{attraction.title}</p>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Attraction;
