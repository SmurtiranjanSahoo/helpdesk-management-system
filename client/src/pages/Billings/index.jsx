import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { connect } from "react-redux";
import { fetchOwner } from "../../redux/actions/OwnerAction";
import { Navigate } from "react-router-dom";

const Billings = ({ fetchOwner, owner }) => {
  const [stripeCustomerId, setStripeCustomerId] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);

  const handleMangeBillings = async () => {
    try {
      let { data } = await axios.get(
        `${BASE_URL}/manageBillings?stripeCustomerId=${stripeCustomerId}`
      );

      const billingsPageUrl = data.data;
      window.open(billingsPageUrl, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyPremium = async () => {
    window.open(`https://boloforms.com/form-approval/pricing`, "_blank");
  };

  // const fetchOwner = async () => {
  //   let user = JSON.parse(localStorage.getItem("owner"));

  //   try {
  //     let { data } = await axios.get(`${BASE_URL}/owners?id=${user._id}`);
  //     console.log(data);
  //     // setOwner(data.owner);
  //     data?.owner?.stripeCustomerId &&
  //       setStripeCustomerId(data?.owner?.stripeCustomerId);

  //     setCurrentPlan(
  //       data?.owner?.planhistory[data?.owner?.planhistory?.length - 1]
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    owner?.stripeCustomerId && setStripeCustomerId(owner?.stripeCustomerId);
    owner?.planhistory &&
      setCurrentPlan(owner?.planhistory[owner?.planhistory?.length - 1]);
  }, [owner]);

  useEffect(() => {
    fetchOwner();
  }, []);

  /* This is checking if the user is already logged in. If the user is logged in, it will redirect to
  the dashboard. */
  let user = localStorage.getItem("owner");
  if (!user) {
    console.log("user not found");
    return <Navigate to="/login" />;
  }

  return (
    <div className="m-4">
      <h2 className="text-xl font-semibold mb-2">
        Welcome to Billings Section
      </h2>
      <p className="text-sm ">
        See how you have been using BoloForms from here.
      </p>
      <div className="max-w-[500px] mt-6 p-6 bg-gray-100 border rounded-lg overflow-hidden relative">
        <h2 className="mt-6 font-semibold text-lg ">Current Plan</h2>
        <div className="mt-3 mb-4">
          <p className="text-base font-medium mb-2">{currentPlan?.planName}</p>
          <p className="text-sm mb-1">
            <span className="mr-2">Plan Price : </span>
            <span className="font-semibold">
              {`${currentPlan?.currencySymbol}${currentPlan?.planPrice}`}
            </span>
          </p>
          <p className="text-sm mb-1">
            <span className="mr-2">Remaining Quota : </span>
            <span className="font-semibold">
              {currentPlan?.usageQuantityAllowed[0] -
                currentPlan?.usedQuanity[0] +
                "/" +
                currentPlan?.usageQuantityAllowed[0]}
            </span>
          </p>
          <span
            className={`${
              currentPlan?.isActive ? "bg-[#2bae66ff]" : "bg-red-600"
            } text-white w-full text-sm px-6 py-2 absolute top-0 right-0`}
          >
            {currentPlan?.isActive ? "ACTIVE" : "EXHAUSTED"}
          </span>
        </div>
        <button
          onClick={stripeCustomerId ? handleMangeBillings : handleBuyPremium}
          className="mt-4 px-4 py-2 bg-[#262626] text-sm text-white rounded-lg hover:opacity-90 mr-4"
        >
          {stripeCustomerId ? "Manage Billings" : "Buy Premium"}
        </button>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Billings);
