
import NutritionQuestion from "@/components/NutritionQuestion";

const Question16 = () => {
  return (
    <NutritionQuestion
      questionNumber={16}
      question="您的皮膚有哪些問題"
      options={["容易長痘痘", "乾燥無彈性", "老化鬆弛", "暗沉不亮白", "皮膚很好"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無請直接點選下一題（有其他選項就不能按皮膚很好）"
      currentRoute="/nutrition/question/16"
      nextRoute="/nutrition/question/17"
      previousRoute="/nutrition/question/15"
    />
  );
};

export default Question16;
