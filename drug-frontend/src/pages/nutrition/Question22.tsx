
import NutritionQuestion from "@/components/NutritionQuestion";

const Question22 = () => {
  return (
    <NutritionQuestion
      questionNumber={22}
      question="您的日常飲食來源"
      options={["外賣、餐廳", "方便食品", "家裡煮"]}
      currentRoute="/nutrition/question/22"
      nextRoute="/nutrition/question/23"
      previousRoute="/nutrition/question/21"
    />
  );
};

export default Question22;
