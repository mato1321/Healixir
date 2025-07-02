
import NutritionQuestion from "@/components/NutritionQuestion";

const Question36 = () => {
  return (
    <NutritionQuestion
      questionNumber={36}
      question="您有以下女性困擾嗎"
      options={["月經來的時候很痛", "流的量大", "期間皮脂分泌會有狀況"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無請直接點選下一題（僅限第35題選擇「有生理週期」者）"
      currentRoute="/nutrition/question/36"
      nextRoute="/nutrition/question/37"
      previousRoute="/nutrition/question/35"
    />
  );
};

export default Question36;
