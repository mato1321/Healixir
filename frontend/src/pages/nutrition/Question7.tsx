import NutritionQuestion from "@/components/NutritionQuestion";

const Question7 = () => {
  return (
    <NutritionQuestion
      questionNumber={7}
      question="(腸胃)您是否有以下幾種腸胃問題"
      options={["腹瀉", "脹氣", "便祕", "消化不良", "都沒有"]}
      isMultiSelect={true}
      currentRoute="/nutrition/question/7"
      nextRoute="/nutrition/question/8"
      previousRoute="/nutrition/question/6"
    />
  );
};

export default Question7;