import React, { useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { v4 } from "uuid";
import { IoCopySharp } from "react-icons/io5";
import {
  BsHandThumbsDownFill,
  BsHandThumbsDown,
  BsHandThumbsUpFill,
  BsHandThumbsUp,
  BsTwitter,
} from "react-icons/bs";
import { SiMicrosoftexcel, SiGooglesheets } from "react-icons/si";

import { ToastContainer, toast } from "react-toastify";
import Modal from "../../components/Modal";
import AnswerFormatter from "../../components/AnswerFormatter";

const defaultPrompts = [
  "Use regex to validate the data in a cell, such as checking that it matches a specific format, such as a date or time, or that it only contains letters or numbers.",
  "Use regex to extract a specific pattern of characters from a cell, such as a phone number or email address.",
  "Use regex to perform a global search and replace, across multiple worksheets or even multiple workbooks, to quickly and easily update a large amount of data.",
  "Use regex to perform a case-insensitive search or replace, such as finding all instances of a word regardless of whether it is capitalized or not.",
];

const Regex = () => {
  let owner = JSON.parse(localStorage.getItem("owner"));
  let outputRef = useRef(null);
  let mobileOutputRef = useRef(null);
  const [search, setSearch] = useState({
    id: v4(),
    currentSearch: "",
    previousSearch: [],
    currentOptions: {
      sheetOpreator: "g-sheets",
    },
    results: [],
    loading: false,
  });

  const [showQuotaExaustModal, setShowQuotaExaustModal] = useState(false);

  const scrollToBottom = (outputRef) => {
    outputRef.current.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleSubmitRequest = async (type) => {
    if (search.currentSearch.trim() === "") {
      return toast.error("Please ask a question");
    }
    let newThreadId = v4();
    setSearch((prev) => ({
      ...prev,
      loading: true,
      id: type === "new" ? newThreadId : prev.id,
    }));
    console.log("search", search);

    let { data } = await axios.post(`${BASE_URL}/ans/regex`, {
      id: type === "new" ? newThreadId : search.id,
      queId: v4(),
      ownerId: owner._id,
      search: search.currentSearch,
      sheetOpreator: search.currentOptions.sheetOpreator,
    });
    console.log("data", data);

    if (data.isQuotaExceeded) {
      setSearch((prev) => ({
        ...prev,
        loading: false,
      }));
      return setShowQuotaExaustModal((prev) => !prev);
    }
    setSearch((prev) => ({
      ...prev,
      results: data?.thread?.messages,
      loading: false,
      currentSearch: "",
    }));

    scrollToBottom(outputRef);
    scrollToBottom(mobileOutputRef);
  };

  const handleFeedbackReaction = async (queId, reaction) => {
    try {
      let { data } = await axios.put(`${BASE_URL}/feedback`, {
        id: search.id,
        queId,
        feedback: "",
        reaction,
      });
      console.log("data", data);
      setSearch((prev) => ({
        ...prev,
        results: data.messages,
      }));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAnsTweet = async () => {
    let text =
      "Just discovered SheetGod- The best AI-powered tool for creating Excel formulas, macros, and appscript code snippets from plain English. Use my referral link to get 10 free questions to ask:";
    let url = `https://sheetgod.boloforms.com?ref=${owner?.refCode}`;
    let hashtags = "excel,ai";
    let via = "boloforms";

    let twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${url}&hashtags=${hashtags}&via=${via}`;
    window.open(twitterUrl, "twitter-share-dialog", "width=600,height=400");
  };

  return (
    <div
      ref={mobileOutputRef}
      className="flex flex-col xs:flex-row xs:p-2  h-[calc(100%_-_120px)] xs:h-full overflow-y-auto xs:overflow-visible"
    >
      <div className="xs:w-1/2 xs:mr-2 bg-gray-50 xs:border p-2 xs:p-4 xs:rounded-lg">
        <h1 className="text-lg font-semibold mb-3">Configure you request</h1>

        <div className="mb-4">
          {/* <p className="text-xs mb-1">
            Is this request for Excel or Google Sheets?
          </p>
          <div className="flex mt-2">
            <div
              onClick={() => {
                setSearch((prev) => ({
                  ...prev,
                  currentOptions: {
                    ...prev.currentOptions,
                    sheetOpreator: "ms-excel",
                  },
                }));
              }}
              className={`${
                search.currentOptions.sheetOpreator === "ms-excel"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700"
              } text-xs w-[150px] px-4 py-2.5 flex items-center justify-center border rounded-xl text-center mr-2 cursor-pointer`}
            >
              <SiMicrosoftexcel className="inline-block mr-2 text-lg" />
              MS Excel
            </div>
            <div
              onClick={() => {
                setSearch((prev) => ({
                  ...prev,
                  currentOptions: {
                    ...prev.currentOptions,
                    sheetOpreator: "g-sheets",
                  },
                }));
              }}
              className={`${
                search.currentOptions.sheetOpreator === "g-sheets"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700"
              } text-xs w-[150px] px-4 py-2.5 flex items-center justify-center border rounded-xl text-center mr-2 cursor-pointer`}
            >
              <SiGooglesheets className="inline-block mr-2 text-lg" />
              Google Sheets
            </div>
          </div> */}

          <h3 className="xs:hidden text-xs px-1 mt-4">Examples :</h3>
          <div className="xs:hidden flex flex-row flex-wrap">
            {defaultPrompts.map((prompt) => (
              <button
                onClick={() => {
                  setSearch((prev) => ({
                    ...prev,
                    currentSearch: prompt,
                  }));
                }}
                className="w-full text-left text-[10px] my-1 bg-gray-200 text-gray-700 border px-4 py-2 rounded-lg"
                disabled={search.loading}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden xs:block mb-6">
          <p className="text-xs mb-1">
            What is the regex you want to generate?
          </p>
          <div className="flex flex-col ">
            <textarea
              className="w-full px-4 py-2 text-sm border rounded-xl mr-2 resize-none"
              rows="9"
              cols="50"
              maxLength={500}
              placeholder="Ask your question here..."
              value={search.currentSearch}
              onChange={(e) => {
                setSearch((prev) => ({
                  ...prev,
                  currentSearch: e.target.value,
                }));
              }}
            ></textarea>
            <div className="flex py-2">
              <p className="ml-auto text-xs">
                {search?.currentSearch?.length ?? 0}/500
              </p>
            </div>
            <h3 className="text-xs px-1">Examples :</h3>
            <div className="flex flex-row flex-wrap">
              {defaultPrompts.map((prompt) => (
                <button
                  onClick={() => {
                    setSearch((prev) => ({
                      ...prev,
                      currentSearch: prompt,
                    }));
                  }}
                  className="w-[48%] text-[10px] m-1 bg-gray-200 text-gray-700 border px-4 py-2 rounded-lg"
                  disabled={search.loading}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="w-full flex">
              <button
                onClick={() => handleSubmitRequest("new")}
                className={`w-full mt-3 ${
                  search.results.length === 0
                    ? "bg-[#262626] text-white"
                    : "border-2 border-[#262626] text-[#262626] bg-white"
                } px-4 py-2 rounded-lg`}
                disabled={search.loading}
              >
                {search.results.length === 0
                  ? "Ask Question"
                  : "Ask New Question"}
              </button>
              {search.results.length !== 0 && (
                <button
                  onClick={() => handleSubmitRequest("followup")}
                  className="ml-2 w-full mt-3 bg-[#262626] text-white px-4 py-2 rounded-lg"
                  disabled={search.loading}
                >
                  Ask Followup Question
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        ref={outputRef}
        className="h-full xs:w-1/2 xs:ml-2 bg-gray-50 xs:border xs:rounded-lg xs:overflow-y-auto "
      >
        {/* <p className="text-xs mb-3">Output</p> */}
        <div className="min-h-[400px] flex flex-col  text-gray-600  rounded-lg text-sm">
          {search?.results?.map((message, i) => (
            <div key={i} className="border-b">
              <h2 className="text-xs text-gray-700 bg-gray-200 p-4 capitalize">
                {message.question}
              </h2>
              <div className="text-sm text-gray-600 p-4 bg-white">
                {/* <p>{message.answer}</p> */}
                <AnswerFormatter answer={message.answer} />
                <div className="flex justify-between items-end">
                  <div className="flex items-end">
                    <div
                      onClick={() => {
                        handleFeedbackReaction(message.id, "LIKED");
                      }}
                    >
                      {message.feedbackReaction === "LIKED" ? (
                        <BsHandThumbsUpFill className="text-xl text-gray-700 cursor-pointer mr-3" />
                      ) : (
                        <BsHandThumbsUp className="text-xl  text-gray-700 cursor-pointer mr-3 hover:opacity-60" />
                      )}
                    </div>
                    <div
                      onClick={() => {
                        handleFeedbackReaction(message.id, "DISLIKED");
                      }}
                    >
                      {message.feedbackReaction === "DISLIKED" ? (
                        <BsHandThumbsDownFill className="text-xl text-red-500 cursor-pointer " />
                      ) : (
                        <BsHandThumbsDown className="text-xl text-gray-700 cursor-pointer hover:opacity-60" />
                      )}
                    </div>
                  </div>
                  <div
                    onClick={handleAnsTweet}
                    className="text-[10px] mx-auto flex items-center h-fit bg-blue-500 text-white w-fit px-3 rounded-lg cursor-pointer"
                  >
                    <BsTwitter className="inline-block mr-2" />
                    tweet
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(message.answer);
                      toast.success("Copied to clipboard");
                    }}
                    className="mt-3 bg-gray-700 text-white px-2 py-2 rounded-lg"
                  >
                    <IoCopySharp />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {search.results.length === 0 && (
            <div className="hidden sm:flex justify-center items-center h-full py-6">
              <p className="text-gray-400">No discussions yets!</p>
            </div>
          )}
        </div>
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
      <div className="xs:hidden  fixed bottom-0 left-0 right-0">
        <textarea
          style={{
            boxShadow: "inset 0 0 4px 0 rgba(0,0,0,0.2)",
          }}
          className="w-full px-2 text-sm py-2 border resize-none -mb-2 rounded-none outline-none"
          rows="3"
          cols="50"
          maxLength={500}
          placeholder="Ask a question"
          value={search.currentSearch}
          onChange={(e) => {
            setSearch((prev) => ({
              ...prev,
              currentSearch: e.target.value,
            }));
          }}
        ></textarea>
        <div className="w-full flex text-xs">
          <button
            onClick={() => handleSubmitRequest("new")}
            className={`w-full ${
              search.results.length === 0
                ? "bg-[#262626] text-white"
                : "border-2 border-[#262626] text-[#262626] bg-white"
            }  px-4 py-3`}
            disabled={search.loading}
          >
            {search.results.length === 0 ? "Ask Question" : "Ask New Question"}
          </button>
          {search.results.length !== 0 && (
            <button
              onClick={() => handleSubmitRequest("followup")}
              className={`w-full  px-4 py-3 bg-[#262626] text-white`}
              disabled={search.loading}
            >
              Ask Followup
            </button>
          )}
        </div>
      </div>

      {showQuotaExaustModal && (
        <Modal setShowQuotaExaustModal={setShowQuotaExaustModal} />
      )}
    </div>
  );
};

export default Regex;
