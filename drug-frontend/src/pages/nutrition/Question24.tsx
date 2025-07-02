
import NutritionQuestion from "@/components/NutritionQuestion";

const Question24 = () => {
  return (
    <NutritionQuestion
      questionNumber={24}
      question="平均每日水果攝取(每份約一個拳頭大小)"
      options={["少於1份", "1份", "2份以上"]}
      currentRoute="/nutrition/question/24"
      nextRoute="/nutrition/question/25"
      previousRoute="/nutrition/question/23"
    />
  );
};

export default Question24;
