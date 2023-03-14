export function isPaidPlan(owner) {
  let activePlan = owner.planhistory[owner.planhistory.length - 1];

  let isValidPlanToUseThisFeat = false;
  if (activePlan.currencyCode === "₹") {
    parseInt(activePlan.planPrice) >= 9000 && (isValidPlanToUseThisFeat = true);
  } else {
    parseInt(activePlan.planPrice) >= 99 && (isValidPlanToUseThisFeat = true);
  }

  //TODO: add negative case in isValidPlanToUseThisFeat
  if (!activePlan.isActive || !isValidPlanToUseThisFeat) return true;

  return false;
}
