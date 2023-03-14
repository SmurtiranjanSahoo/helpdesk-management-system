import React, { Fragment } from "react";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-toastify";

const AnswerFormatter = ({ answer }) => {
  const extractFormula = (text) => {
    let firstIndex = text.indexOf("=");
    let lastIndex = text.lastIndexOf(")");

    let formula = text.slice(firstIndex, lastIndex + 1);
    return firstIndex === -1 || lastIndex === -1 ? null : formula;
  };

  //   console.log(extractFormula(answer));

  return (
    <div>
      {extractFormula(answer) ? (
        <Fragment>
          <p
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {answer?.split(extractFormula(answer))[0]}
          </p>
          <div className="my-3  bg-gray-800 text-gray-200 text-xs rounded-md overflow-hidden">
            <div
              onClick={() => {
                navigator.clipboard.writeText(extractFormula(answer));
                toast.success("Copied to clipboard");
              }}
              className="flex bg-gray-600 px-3 py-2 cursor-pointer"
            >
              <p className="ml-auto flex items-center">
                Copy Code
                <IoCopy className="ml-2" />
              </p>
            </div>
            <div className="p-3">{extractFormula(answer)}</div>
          </div>
          <p
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {answer?.split(extractFormula(answer))[1]}
          </p>
        </Fragment>
      ) : (
        <p
          style={{
            whiteSpace: "pre-line",
          }}
        >
          {answer}
        </p>
      )}
    </div>
  );
};

export default AnswerFormatter;
