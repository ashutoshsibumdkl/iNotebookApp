import React  from "react";
import Notes from "./Notes";
//import showAlert from "../App"

const Home = (props) => {

  const {showAlert} = props;

  return (
    <div>
        <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
