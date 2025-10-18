import NutritionQuestion from "@/components/NutritionQuestion";

const Question34 = () => {
  return (
    <NutritionQuestion
      questionNumber={34}
      question="您有以下哪幾種問題? 高血壓 / 高血脂 / 高血糖 / 心臟疾病 / 腎臟疾病 / 肝臟疾病 / 都沒有"
      options={["高血壓", "高血脂", "高血糖", "心臟疾病", "腎臟疾病", "肝臟疾病", "都沒有"]}
      isMultiSelect={true}
      currentRoute="/nutrition/question/34"
      nextRoute="/nutrition/question/35"
      previousRoute="/nutrition/question/33"
    />
  );
};

export default Question34;