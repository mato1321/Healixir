
import NutritionQuestion from "@/components/NutritionQuestion";

const Question44 = () => {
  return (
    <NutritionQuestion
      questionNumber={44}
      question="您有以下哪些問題"
      options={["高血壓", "高血脂", "高血糖", "心臟疾病", "腎臟疾病", "肝臟疾病"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無請直接點選下一題，系統將為您排除不適合有以下疾病使用的保健食品"
      currentRoute="/nutrition/question/44"
      nextRoute="/nutrition/question/45"
      previousRoute="/nutrition/question/43"
    />
  );
};

export default Question44;
