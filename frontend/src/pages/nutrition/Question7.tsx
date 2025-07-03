
import NutritionQuestion from "@/components/NutritionQuestion";

const Question7 = () => {
  return (
    <NutritionQuestion
      questionNumber={7}
      question="您睡覺期間半夜甦醒的頻率"
      options={["我能一覺到天亮", "睡睡醒醒", "提早甦醒"]}
      currentRoute="/nutrition/question/7"
      nextRoute="/nutrition/question/8"
      previousRoute="/nutrition/question/6"
    />
  );
};

export default Question7;
