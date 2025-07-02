
import NutritionQuestion from "@/components/NutritionQuestion";

const Question29 = () => {
  return (
    <NutritionQuestion
      questionNumber={29}
      question="平均每日待在戶外時長"
      options={["少於15分鐘", "15-60分鐘", "一小時以上", "二小時以上"]}
      currentRoute="/nutrition/question/29"
      nextRoute="/nutrition/question/30"
      previousRoute="/nutrition/question/28"
    />
  );
};

export default Question29;
