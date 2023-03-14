import React, { Fragment } from "react";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-toastify";

const CodeFormatter = ({ answer }) => {
  const extractCodeSnippets = (text) => {
    let firstIndex = text.indexOf("^");
    let lastIndex = text.lastIndexOf("~");

    let code = text.slice(firstIndex, lastIndex + 1);
    return firstIndex === -1 || lastIndex === -1 ? null : code;
  };

  return (
    <div>
      {extractCodeSnippets(answer) ? (
        <Fragment>
          <p
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {answer?.split(extractCodeSnippets(answer))[0]}
          </p>
          <div className="my-3  bg-gray-800 text-gray-200 text-xs rounded-md overflow-hidden">
            <div
              onClick={() => {
                navigator.clipboard.writeText(
                  extractCodeSnippets(answer)
                    ?.replace(/~/g, "")
                    ?.replace(/\^/g, "")
                );
                toast.success("Copied to clipboard");
              }}
              className="flex bg-gray-600 px-3 py-2 cursor-pointer"
            >
              <p className="ml-auto flex items-center">
                Copy Code
                <IoCopy className="ml-2" />
              </p>
            </div>
            {/* <div className="p-3">{extractCodeSnippets(answer)}</div> */}
            <div
              style={{
                whiteSpace: "pre-line",
              }}
              className="p-3"
            >
              {extractCodeSnippets(answer)
                ?.replace(/~/g, "")
                ?.replace(/\^/g, "")}
            </div>
          </div>
          <p
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {answer?.split(extractCodeSnippets(answer))[1]}
          </p>
        </Fragment>
      ) : (
        <p
          style={{
            whiteSpace: "pre-line",
          }}
        >
          {answer?.replace(/~/g, "")?.replace(/\^/g, "")}
        </p>
      )}
    </div>
  );
};

export default CodeFormatter;
