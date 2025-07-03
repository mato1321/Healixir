
import NutritionQuestion from "@/components/NutritionQuestion";

const Question39 = () => {
  return (
    <NutritionQuestion
      questionNumber={39}
      question="您是否有膠原蛋白增生的需求"
      options={["非常有", "有", "無", "不知道"]}
      currentRoute="/nutrition/question/39"
      nextRoute="/nutrition/question/40"
      previousRoute="/nutrition/question/38"
    />
  );
};

export default Question39;
