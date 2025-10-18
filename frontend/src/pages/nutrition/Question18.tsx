import NutritionQuestion from "@/components/NutritionQuestion";

const Question18 = () => {
  return (
    <NutritionQuestion
      questionNumber={18}
      question="平均每日蔬菜攝取(1份 = 半碗)? 0-2份 / 3-5份 / 5份以上"
      options={["0-2份", "3-5份", "5份以上"]}
      currentRoute="/nutrition/question/18"
      nextRoute="/nutrition/question/19"
      previousRoute="/nutrition/question/17"
    />
  );
};

export default Question18;