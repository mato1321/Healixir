
import NutritionQuestion from "@/components/NutritionQuestion";

const Question30 = () => {
  return (
    <NutritionQuestion
      questionNumber={30}
      question="平均每星期運動頻率(每次至少30分鐘)"
      options={["我幾乎不運動", "1-2次", "3次以上"]}
      currentRoute="/nutrition/question/30"
      nextRoute="/nutrition/question/31"
      previousRoute="/nutrition/question/29"
    />
  );
};

export default Question30;
