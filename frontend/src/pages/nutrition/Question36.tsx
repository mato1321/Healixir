import NutritionQuestion from "@/components/NutritionQuestion";

const Question36 = () => {
  return (
    <NutritionQuestion
      questionNumber={36}
      question="您正規律服用以下哪些藥物?"
      options={["抗凝血藥物", "降血脂藥", "激素", "抗生素", "消炎止痛藥", "都沒有"]}
      isMultiSelect={true}
      currentRoute="/nutrition/question/36"
      nextRoute="/nutrition/question/37"
      previousRoute="/nutrition/question/35"
    />
  );
};

export default Question36;