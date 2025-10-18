import NutritionQuestion from "@/components/NutritionQuestion";

const Question17 = () => {
  return (
    <NutritionQuestion
      questionNumber={17}
      question="您的日常飲食來源是? 餐廳 / 方便食品 / 自己煮"
      options={["餐廳", "方便食品", "自己煮"]}
      currentRoute="/nutrition/question/17"
      nextRoute="/nutrition/question/18"
      previousRoute="/nutrition/question/16"
    />
  );
};

export default Question17;