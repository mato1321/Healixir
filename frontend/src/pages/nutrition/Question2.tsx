import NutritionQuestion from "@/components/NutritionQuestion";

const Question2 = () => {
  return (
    <NutritionQuestion
      questionNumber={2}
      question="您是否曾經被診斷出以下幾種眼部疾病?"
      options={["乾眼症", "青光眼", "黃斑部病變", "白內障"]}
      isMultiSelect={true}
      showIfGoal="眼睛"
      currentRoute="/nutrition/question/2"
      nextRoute="/nutrition/question/3"
      previousRoute="/nutrition/question/1"
    />
  );
};

export default Question2;