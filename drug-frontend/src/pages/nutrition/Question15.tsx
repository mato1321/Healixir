
import NutritionQuestion from "@/components/NutritionQuestion";

const Question15 = () => {
  return (
    <NutritionQuestion
      questionNumber={15}
      question="您經常生病感冒嗎"
      options={["很少", "偶爾", "經常"]}
      currentRoute="/nutrition/question/15"
      nextRoute="/nutrition/question/16"
      previousRoute="/nutrition/question/14"
    />
  );
};

export default Question15;
