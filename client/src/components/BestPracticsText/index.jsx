import React from "react";
import ReactTooltip from "react-tooltip";
import { AiFillInfoCircle } from "react-icons/ai";
const BestPracticsText = ({ text }) => {
  return (
    <div>
      <div
        // data-tip={text}
        className="text-xs text-blue-600 cursor-pointer flex "
      >
        Best Practices <AiFillInfoCircle className="text-lg ml-2" />
      </div>

      {/* <ReactTooltip
        place="right"
        effect="solid"
        globalEventOff="click"
        className="w-[60%]"
      /> */}
    </div>
  );
};

export default BestPracticsText;
