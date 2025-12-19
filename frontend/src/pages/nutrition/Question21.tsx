import NutritionQuestion from "@/components/NutritionQuestion";

const Question21 = () => {
  return (
    <NutritionQuestion
      questionNumber={21}
      question="平均每日奶製品攝取?"
      options={["少於1杯", "1-2杯", "2杯以上"]}
      currentRoute="/nutrition/question/21"
      nextRoute="/nutrition/question/22"
      previousRoute="/nutrition/question/20"
    />
  );
};

export default Question21;