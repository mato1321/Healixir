import NutritionQuestion from "@/components/NutritionQuestion";

const Question4 = () => {
  return (
    <NutritionQuestion
      questionNumber={4}
      question="(骨關節)您是否有關節疼痛或腫脹的問題"
      options={["經常", "偶爾", "幾乎沒有"]}
      showIfGoal="骨關節"
      currentRoute="/nutrition/question/4"
      nextRoute="/nutrition/question/5"
      previousRoute="/nutrition/question/3"
    />
  );
};

export default Question4;