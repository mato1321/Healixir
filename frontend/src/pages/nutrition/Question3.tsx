
import NutritionQuestion from "@/components/NutritionQuestion";

const Question3 = () => {
  return (
    <NutritionQuestion
      questionNumber={3}
      question="您是否有掉髮或髮質損壞的問題"
      options={["是", "否"]}
      currentRoute="/nutrition/question/3"
      nextRoute="/nutrition/question/4"
      previousRoute="/nutrition/question/2"
    />
  );
};

export default Question3;
