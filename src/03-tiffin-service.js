/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  if(typeof mealType !== "string" || !name || name === "") return null;
  
  let dailyRate = 0;
  switch(mealType){
    case "veg":
      dailyRate = 80;
      break;

    case "nonveg":
      dailyRate = 120;
      break;

    case "jain":
      dailyRate = 90;
      break;

    default:
      return null;
  }

  return { name: name, mealType: mealType, days: days, dailyRate: dailyRate, totalCost: dailyRate * days };
}

export function combinePlans(...plans) {
  // Your code here

  if(!Array.isArray(plans) || plans.length === 0) return null;

  let totalCustomers = 0;
  let totalRevenue = 0;
  let vegCount = 0;
  let nonvegCount = 0;
  let jainCount = 0;

  const mealBreakdown = { veg: 0, nonveg: 0, jain: 0 };

  totalCustomers += plans.length;

  totalRevenue += plans.reduce((acc, plan) => acc + plan.totalCost, 0);

  plans.forEach(plan => {
    if(plan.mealType === "veg") vegCount++;
    else if(plan.mealType === "nonveg") nonvegCount++;
    else if(plan.mealType === "jain") jainCount++;
  });

  mealBreakdown["veg"] = vegCount;
  mealBreakdown["nonveg"] = nonvegCount;
  mealBreakdown["jain"] = jainCount;

  return { totalCustomers: totalCustomers, totalRevenue: totalRevenue, mealBreakdown: mealBreakdown };
}

export function applyAddons(plan, ...addons) {
  // Your code here
  if(typeof plan !== "object" || plan === null) return null;

  const addonPrice = addons.reduce((acc, addon) => acc + addon.price, 0);
  const newDailyRate = plan.dailyRate + addonPrice;
  const newTotalCost = newDailyRate * plan.days;

  const addonNames = addons.map(addon => addon.name);

  return { name: plan.name, mealType: plan.mealType, days: plan.days, dailyRate: newDailyRate, totalCost: newTotalCost, addonNames: addonNames };
}
