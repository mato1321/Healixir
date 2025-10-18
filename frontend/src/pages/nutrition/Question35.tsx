import NutritionQuestion from "@/components/NutritionQuestion";

const Question35 = () => {
  return (
    <NutritionQuestion
      questionNumber={35}
      question="您有以下哪幾種問題? 痛風 / 貧血 / 氣喘 / 子宮或卵巢疾病 / 乳房疾病 / 紅斑性狼瘡 / 乳糖不耐症 / 都沒有"
      options={["痛風", "貧血", "氣喘", "子宮或卵巢疾病", "乳房疾病", "紅斑性狼瘡", "乳糖不耐症", "都沒有"]}
      isMultiSelect={true}
      currentRoute="/nutrition/question/35"
      nextRoute="/nutrition/question/36"
      previousRoute="/nutrition/question/34"
    />
  );
};

export default Question35;