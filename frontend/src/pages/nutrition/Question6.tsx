
import NutritionQuestion from "@/components/NutritionQuestion";

const Question6 = () => {
  return (
    <NutritionQuestion
      questionNumber={6}
      question="您一週需要幫助入睡的頻率"
      options={["幾乎不用", "一週1-3次", "幾乎天天難以入睡"]}
      currentRoute="/nutrition/question/6"
      nextRoute="/nutrition/question/7"
      previousRoute="/nutrition/question/5"
    />
  );
};

export default Question6;
