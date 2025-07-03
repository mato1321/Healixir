
import NutritionQuestion from "@/components/NutritionQuestion";

const Question18 = () => {
  return (
    <NutritionQuestion
      questionNumber={18}
      question="您有以下哪些骨骼問題"
      options={["骨質不足", "軟骨症"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無請直接點選下一題"
      currentRoute="/nutrition/question/18"
      nextRoute="/nutrition/question/19"
      previousRoute="/nutrition/question/17"
    />
  );
};

export default Question18;
