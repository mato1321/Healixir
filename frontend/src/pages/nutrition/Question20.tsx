import NutritionQuestion from "@/components/NutritionQuestion";

const Question20 = () => {
  return (
    <NutritionQuestion
      questionNumber={20}
      question="平均每日豆蛋魚肉類(1份 = 1/4碗)?"
      options={["少於1份", "1-2份", "3份以上"]}
      currentRoute="/nutrition/question/20"
      nextRoute="/nutrition/question/21"
      previousRoute="/nutrition/question/19"
    />
  );
};

export default Question20;