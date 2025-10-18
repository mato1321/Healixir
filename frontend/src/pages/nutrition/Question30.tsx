import NutritionQuestion from "@/components/NutritionQuestion";

const Question30 = () => {
  return (
    <NutritionQuestion
      questionNumber={30}
      question="您的睡眠品質? 能一覺到天亮 / 睡睡醒醒 / 提早甦醒"
      options={["能一覺到天亮", "睡睡醒醒", "提早甦醒"]}
      currentRoute="/nutrition/question/30"
      nextRoute="/nutrition/question/31"
      previousRoute="/nutrition/question/29"
    />
  );
};

export default Question30;