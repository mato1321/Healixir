import NutritionQuestion from "@/components/NutritionQuestion";

const Question38 = () => {
  return (
    <NutritionQuestion
      questionNumber={38}
      question="您每星期運動的頻率(每次至少30分鐘)? 幾乎不運動 / 1-2次 / 3次以上"
      options={["幾乎不運動", "1-2次", "3次以上"]}
      currentRoute="/nutrition/question/38"
      nextRoute="/nutrition/analysis"
      previousRoute="/nutrition/question/37"
    />
  );
};

export default Question38;