
import NutritionQuestion from "@/components/NutritionQuestion";

const Question37 = () => {
  return (
    <NutritionQuestion
      questionNumber={37}
      question="您有私密的乾澀或無彈性困擾嗎"
      options={["有", "無", "不知道"]}
      skipCondition="此題僅適用於女性用戶，男性用戶請直接點選「跳過此題」"
      showSkipButton={true}
      currentRoute="/nutrition/question/37"
      nextRoute="/nutrition/question/38"
      previousRoute="/nutrition/question/36"
    />
  );
};

export default Question37;
