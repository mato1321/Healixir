import NutritionQuestion from "@/components/NutritionQuestion";

const Question13 = () => {
  return (
    <NutritionQuestion
      questionNumber={13}
      question="您是否有美白的需求"
      options={["是", "否"]}
      showIfGoal="皮膚"
      currentRoute="/nutrition/question/13"
      nextRoute="/nutrition/question/14"
      previousRoute="/nutrition/question/12"
    />
  );
};

export default Question13;