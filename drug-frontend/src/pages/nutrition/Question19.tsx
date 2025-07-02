
import NutritionQuestion from "@/components/NutritionQuestion";

const Question19 = () => {
  return (
    <NutritionQuestion
      questionNumber={19}
      question="您有以下哪些關節問題"
      options={["軟骨流失", "關節炎", "關節靈活度不足"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無請直接點選下一題"
      currentRoute="/nutrition/question/19"
      nextRoute="/nutrition/question/20"
      previousRoute="/nutrition/question/18"
    />
  );
};

export default Question19;
