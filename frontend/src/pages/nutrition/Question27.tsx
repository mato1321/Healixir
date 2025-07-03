
import NutritionQuestion from "@/components/NutritionQuestion";

const Question27 = () => {
  return (
    <NutritionQuestion
      questionNumber={27}
      question="平均每日五穀雜糧攝取(每份約1碗飯或1顆饅頭)"
      options={["少於1份", "1-2份", "3份以上"]}
      currentRoute="/nutrition/question/27"
      nextRoute="/nutrition/question/28"
      previousRoute="/nutrition/question/26"
    />
  );
};

export default Question27;
