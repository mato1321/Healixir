
import NutritionQuestion from "@/components/NutritionQuestion";

const Question47 = () => {
  return (
    <NutritionQuestion
      questionNumber={47}
      question="半年內是否被診斷缺乏以下營養素"
      options={["鐵", "鈣", "維生素B群", "維生素C", "維生素D"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無請直接點選下一題"
      currentRoute="/nutrition/question/47"
      nextRoute="/nutrition/question/48"
      previousRoute="/nutrition/question/46"
    />
  );
};

export default Question47;
