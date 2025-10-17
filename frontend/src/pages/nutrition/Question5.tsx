import NutritionQuestion from "@/components/NutritionQuestion";

const Question5 = () => {
  return (
    <NutritionQuestion
      questionNumber={5}
      question="(骨關節)您是否有關節靈活度不足的問題"
      options={["嚴重", "輕微", "不曾"]}
      currentRoute="/nutrition/question/5"
      nextRoute="/nutrition/question/6"
      previousRoute="/nutrition/question/4"
    />
  );
};

export default Question5;