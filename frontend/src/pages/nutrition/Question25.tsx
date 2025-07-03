
import NutritionQuestion from "@/components/NutritionQuestion";

const Question25 = () => {
  return (
    <NutritionQuestion
      questionNumber={25}
      question="平均每日豆蛋魚肉類攝取(每份約⅓塊雞胸肉或半杯豆漿、豆腐半碗或蛋1顆)"
      options={["少於1份", "1-2份", "3份以上"]}
      currentRoute="/nutrition/question/25"
      nextRoute="/nutrition/question/26"
      previousRoute="/nutrition/question/24"
    />
  );
};

export default Question25;
