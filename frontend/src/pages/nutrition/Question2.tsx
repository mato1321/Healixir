
import NutritionQuestion from "@/components/NutritionQuestion";

const Question2 = () => {
  return (
    <NutritionQuestion
      questionNumber={2}
      question="您有以下何種晶亮問題(可能因長期使用3C或閱讀造成)"
      options={["經常有使用過度的感覺", "乾澀不適", "發紅"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無請直接點選下一題"
      currentRoute="/nutrition/question/2"
      nextRoute="/nutrition/question/3"
      previousRoute="/nutrition/question/1"
    />
  );
};

export default Question2;
