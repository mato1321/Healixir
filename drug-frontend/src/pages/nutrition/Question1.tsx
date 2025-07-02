import NutritionQuestion from "@/components/NutritionQuestion";

const Question1 = () => {
  return (
    <NutritionQuestion
      questionNumber={1}
      question="您一天當中使用3C產品(電腦、手機、平板)的頻率多高"
      options={["少於3小時", "4-6小時", "7+小時"]}
      currentRoute="/nutrition/question/1"
      nextRoute="/nutrition/question/2"
      previousRoute="/nutrition/start"
    />
  );
};

export default Question1;