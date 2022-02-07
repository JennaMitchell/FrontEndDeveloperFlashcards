import classes from "./ToggleSwitch.module.css";
import { useState } from "react";

const ToggleSwitch = ({ toggleLabel, toggleFunction }) => {
  const [switchClickedStatus, setSwitchClickedStatus] = useState(false);
  const switchHandler = () => {
    setSwitchClickedStatus(!switchClickedStatus);
    toggleFunction();
  };

  return (
    <div className={classes.toggleSwitchContainer}>
      <p className={classes.toggleLabel}>{toggleLabel}</p>
      <div className={classes.toggleSwitch} onClick={switchHandler}>
        <span
          className={`${classes.slider} ${
            switchClickedStatus && classes.sliderClicked
          }`}
        >
          <div
            className={`${classes.sliderBtn} ${
              switchClickedStatus && classes.moveBtn
            }`}
          ></div>
        </span>
      </div>
    </div>
  );
};
export default ToggleSwitch;
