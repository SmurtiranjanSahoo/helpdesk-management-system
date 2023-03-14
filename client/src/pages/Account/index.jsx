import React, { useEffect } from "react";
import axios from "axios";
import { BsTwitter, BsLinkedin, BsFacebook } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { BASE_URL } from "../../constants/constants";
import { connect } from "react-redux";
import { fetchOwner } from "../../redux/actions/OwnerAction";
import { toast, ToastContainer } from "react-toastify";

const Account = ({ fetchOwner, owner }) => {
  const shareOnTwitter = async () => {
    let text =
      "Just discovered SheetGod- The best AI-powered tool for creating Excel formulas, macros, and appscript code snippets from plain English. Use my referral link to get 10 free questions to ask:";
    let url = `https://sheetgod.boloforms.com?ref=${owner?.refCode}`;
    let hashtags = "excel,ai";
    let via = "boloforms";

    let twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${url}&hashtags=${hashtags}&via=${via}`;
    window.open(twitterUrl, "twitter-share-dialog", "width=600,height=400");

    await axios.put(`${BASE_URL}/owners/social-rewards`, {
      ownerId: owner._id,
      type: "twitter",
    });
  };

  const shareOnLinkedIn = async () => {
    let text =
      "Just discovered SheetGod- The best AI-powered tool for creating Excel formulas, macros, and appscript code snippets from plain English. Use my referral link to get 10 free questions to ask:";
    let url = `https://sheetgod.boloforms.com?ref=${owner?.refCode}`;
    let linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(
      text
    )}`;
    window.open(linkedInUrl, "linkedin-share-dialog", "width=600,height=400");

    await axios.put(`${BASE_URL}/owners/social-rewards`, {
      ownerId: owner._id,
      type: "linkedin",
    });
  };

  const shareOnFacebook = async () => {
    let text =
      "Just discovered SheetGod- The best AI-powered tool for creating Excel formulas, macros, and appscript code snippets from plain English. Use my referral link to get 10 free questions to ask:";
    let url = `https://sheetgod.boloforms.com?ref=${owner?.refCode}`;
    let facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(
      text
    )}`;
    window.open(facebookUrl, "facebook-share-dialog", "width=600,height=400");

    await axios.put(`${BASE_URL}/owners/social-rewards`, {
      ownerId: owner._id,
      type: "facebook",
    });
  };

  useEffect(() => {
    fetchOwner();
  }, []);

  return (
    <div className="w-fit pb-6 xs:pb-0">
      <h1 className="px-3 xs:px-6 text-lg font-semibold my-2">
        Account Settings
      </h1>
      <div className="px-3 xs:px-6 text-sm mt-8">
        <p className="font-medium">
          <span className="">Email:</span>
          <span className="bg-gray-700 text-white px-4 py-1 rounded-md ml-4 font-light text-xs">
            {owner?.creatorEmail}
          </span>
        </p>
        <p className="font-medium mt-4">
          Quota:{" "}
          <span className="bg-gray-700 text-white px-4 py-1 rounded-md ml-2 font-light text-xs">
            {
              owner?.planhistory?.[owner?.planhistory?.length - 1]
                ?.usedQuanity[0]
            }
            /
            {
              owner?.planhistory?.[owner?.planhistory?.length - 1]
                ?.usageQuantityAllowed[0]
            }
          </span>
        </p>
      </div>
      <div className="p-3 xs:p-6 flex flex-col sm:flex-row ">
        <div className="mb-4 xs:mb-0 mr-2">
          <button
            onClick={shareOnTwitter}
            disabled={owner?.socialSharing?.twitter}
            className="text-sm cursor-pointer flex items-center bg-blue-500 text-white w-fit py-3 px-6 rounded-lg"
          >
            <BsTwitter className="inline-block mr-4 text-lg" />
            Share on Twitter
          </button>
          <div className="h-5 text-xs px-1 mt-2 flex  items-center">
            Get 20 free credits{" "}
            {owner?.socialSharing?.twitter && (
              <span className="">
                <TiTick className="text-gray-700 ml-1 text-lg" />
              </span>
            )}
          </div>
        </div>
        <div className="mb-4 xs:mb-0 mr-2">
          <button
            onClick={shareOnFacebook}
            disabled={owner?.socialSharing?.facebook}
            className="text-sm cursor-pointer flex items-center bg-blue-600 text-white w-fit py-3 px-6 rounded-lg"
          >
            <BsFacebook className="inline-block mr-4 text-lg" />
            Share on Facebook
          </button>
          <div className="h-5 text-xs px-1 mt-2 flex  items-center">
            Get 20 free credits{" "}
            {owner?.socialSharing?.facebook && (
              <span className="">
                <TiTick className="text-gray-700 ml-1 text-lg" />
              </span>
            )}
          </div>
        </div>
        <div className="mb-4 xs:mb-0">
          <button
            onClick={shareOnLinkedIn}
            disabled={owner?.socialSharing?.linkedin}
            className="text-sm cursor-pointer  flex items-center bg-blue-700 text-white w-fit py-3 px-6 rounded-lg"
          >
            <BsLinkedin className="inline-block mr-4 text-lg" />
            Share on Linkedin
          </button>
          <div className="h-5 text-xs px-1 mt-2 flex  items-center">
            Get 20 free credits{" "}
            {owner?.socialSharing?.linkedin && (
              <span className="">
                <TiTick className="text-gray-700 ml-1 text-lg" />
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="px-3 xs:px-6">
        <div className="w-fit text-sm max-w-xl border p-6 mb-4 font-medium rounded-lg">
          Refer your friends and get 20 free credits for each friend who signs
          up and your friend gets 10 free credits too!
        </div>
        <h2 className="text-sm font-medium mb-1">Your Referral Link</h2>
        <div className="flex border  w-fit text-xs rounded-lg overflow-hidden">
          <div className="w-full">
            <div className="w-[250px] py-2.5 px-4 truncate">
              {`https://sheetgod.boloforms.com?ref=${owner.refCode}`}
            </div>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `https://sheetgod.boloforms.com?ref=${owner.refCode}`
              );
              toast.success("Copied to clipboard");
            }}
            className="py-2 px-4 bg-[#262626] text-white"
          >
            Copy
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    owner: state.OwnerReducer.owner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOwner: () => dispatch(fetchOwner()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);
