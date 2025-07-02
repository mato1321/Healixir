
import NutritionQuestion from "@/components/NutritionQuestion";

const Question26 = () => {
  return (
    <NutritionQuestion
      questionNumber={26}
      question="平均每日奶製品攝取"
      options={["少於1杯", "1杯", "2杯以上"]}
      currentRoute="/nutrition/question/26"
      nextRoute="/nutrition/question/27"
      previousRoute="/nutrition/question/25"
    />
  );
};

export default Question26;
