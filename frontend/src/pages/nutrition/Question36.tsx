
import NutritionQuestion from "@/components/NutritionQuestion";

const Question36 = () => {
  return (
    <NutritionQuestion
      questionNumber={36}
      question="您有以下女性困擾嗎"
      options={["月經來的時候很痛", "流的量大", "期間皮脂分泌會有狀況"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無或不適用（如男性用戶）請點選「跳過此題」"
      currentRoute="/nutrition/question/36"
      nextRoute="/nutrition/question/37"
      previousRoute="/nutrition/question/35"
    />
  );
};

export default Question36;
