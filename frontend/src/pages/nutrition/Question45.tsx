
import NutritionQuestion from "@/components/NutritionQuestion";

const Question45 = () => {
  return (
    <NutritionQuestion
      questionNumber={45}
      question="您有以下哪些問題"
      options={["痛風", "貧血", "氣喘", "子宮或卵巢疾病", "乳房疾病", "紅斑性狼瘡", "乳糖不耐症"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無請點選「跳過此題」。部分項目僅適用女性，男性用戶可跳過不適用選項"
      currentRoute="/nutrition/question/45"
      nextRoute="/nutrition/question/46"
      previousRoute="/nutrition/question/44"
    />
  );
};

export default Question45;
