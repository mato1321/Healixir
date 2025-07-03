
import NutritionQuestion from "@/components/NutritionQuestion";

const Question12 = () => {
  return (
    <NutritionQuestion
      questionNumber={12}
      question="您時常有以下狀況嗎"
      options={["脹氣", "打嗝", "消化不良", "便秘", "腹瀉"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無請直接點選下一題"
      currentRoute="/nutrition/question/12"
      nextRoute="/nutrition/question/13"
      previousRoute="/nutrition/question/11"
    />
  );
};

export default Question12;
