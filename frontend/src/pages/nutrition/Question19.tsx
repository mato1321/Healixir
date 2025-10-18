import NutritionQuestion from "@/components/NutritionQuestion";

const Question19 = () => {
  return (
    <NutritionQuestion
      questionNumber={19}
      question="平均每日水果攝取(1份 = 一碗)? 0-2份 / 2-4份 / 4份以上"
      options={["0-2份", "2-4份", "4份以上"]}
      currentRoute="/nutrition/question/19"
      nextRoute="/nutrition/question/20"
      previousRoute="/nutrition/question/18"
    />
  );
};

export default Question19;