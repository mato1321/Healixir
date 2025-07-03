
import NutritionQuestion from "@/components/NutritionQuestion";

const Question34 = () => {
  return (
    <NutritionQuestion
      questionNumber={34}
      question="排便的頻率"
      options={["超過兩天一次", "每兩天至少一次", "每天至少一次", "每天三次或以上"]}
      currentRoute="/nutrition/question/34"
      nextRoute="/nutrition/question/35"
      previousRoute="/nutrition/question/33"
    />
  );
};

export default Question34;
