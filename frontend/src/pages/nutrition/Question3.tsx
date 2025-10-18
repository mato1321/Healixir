import NutritionQuestion from "@/components/NutritionQuestion";

const Question3 = () => {
  return (
    <NutritionQuestion
      questionNumber={3}
      question="您是否有骨質密度過低的問題"
      options={["嚴重", "輕微", "不清楚"]}
      showIfGoal="骨關節"
      currentRoute="/nutrition/question/3"
      nextRoute="/nutrition/question/4"
      previousRoute="/nutrition/question/2"
    />
  );
};

export default Question3;