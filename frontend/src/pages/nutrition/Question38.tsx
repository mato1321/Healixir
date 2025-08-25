
import NutritionQuestion from "@/components/NutritionQuestion";

const Question38 = () => {
  return (
    <NutritionQuestion
      questionNumber={38}
      question="您有預防更年期症狀的需求嗎 (如:膚況變差、骨質疏鬆、失眠、心情低落、煩躁焦慮、熱潮紅、盜汗、陰道乾澀、心悸、胸悶等)"
      options={["有", "無"]}
      skipCondition="此題僅適用於女性用戶，男性用戶請直接點選「跳過此題」"
      showSkipButton={true}
      currentRoute="/nutrition/question/38"
      nextRoute="/nutrition/question/39"
      previousRoute="/nutrition/question/37"
    />
  );
};

export default Question38;
