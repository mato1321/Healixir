import NutritionQuestion from "@/components/NutritionQuestion";

const Question37 = () => {
  return (
    <NutritionQuestion
      questionNumber={37}
      question="您平均每日待在戶外的時長?"
      options={["少於15分鐘", "15-60分鐘", "1小時以上"]}
      currentRoute="/nutrition/question/37"
      nextRoute="/nutrition/question/38"
      previousRoute="/nutrition/question/36"
    />
  );
};

export default Question37;