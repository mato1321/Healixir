
import NutritionQuestion from "@/components/NutritionQuestion";

const Question45 = () => {
  return (
    <NutritionQuestion
      questionNumber={45}
      question="您有以下哪些問題"
      options={["痛風", "貧血", "氣喘", "子宮或卵巢疾病", "乳房疾病", "紅斑性狼瘡", "乳糖不耐症"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無請直接點選下一題，系統將為您排除不適合有以下疾病使用的保健食品"
      currentRoute="/nutrition/question/45"
      nextRoute="/nutrition/question/46"
      previousRoute="/nutrition/question/44"
    />
  );
};

export default Question45;
