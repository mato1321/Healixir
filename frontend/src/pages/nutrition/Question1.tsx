import NutritionQuestion from "@/components/NutritionQuestion";

const Question1 = () => {
  return (
    <NutritionQuestion
      questionNumber={1}
      question="(眼睛)您是否有眼睛乾澀的問題"
      options={["是", "否"]}
      // 只有選到「眼睛」目標才會出現
      showIfGoal="眼睛"
      currentRoute="/nutrition/question/1"
      nextRoute="/nutrition/question/2"
      previousRoute="/nutrition/health-goals"
    />
  );
};

export default Question1;