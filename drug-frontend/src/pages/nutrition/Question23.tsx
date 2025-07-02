
import NutritionQuestion from "@/components/NutritionQuestion";

const Question23 = () => {
  return (
    <NutritionQuestion
      questionNumber={23}
      question="平均每日蔬菜攝取(每份約2/3碗烹煮過後把水瀝乾的蔬菜)"
      options={["少於1份", "1-2份", "3份以上"]}
      currentRoute="/nutrition/question/23"
      nextRoute="/nutrition/question/24"
      previousRoute="/nutrition/question/22"
    />
  );
};

export default Question23;
