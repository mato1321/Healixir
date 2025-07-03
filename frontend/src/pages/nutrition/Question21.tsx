
import NutritionQuestion from "@/components/NutritionQuestion";

const Question21 = () => {
  return (
    <NutritionQuestion
      questionNumber={21}
      question="您的飲食習慣是"
      options={["素食", "正常飲食但偏素", "正常飲食但偏葷", "葷素均勻"]}
      currentRoute="/nutrition/question/21"
      nextRoute="/nutrition/question/22"
      previousRoute="/nutrition/question/20"
    />
  );
};

export default Question21;
