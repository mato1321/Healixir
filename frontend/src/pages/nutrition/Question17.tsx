
import NutritionQuestion from "@/components/NutritionQuestion";

const Question17 = () => {
  return (
    <NutritionQuestion
      questionNumber={17}
      question="您對皮膚美白有興趣"
      options={["沒興趣", "普通", "有一點點", "滿有興趣", "非常有興趣"]}
      currentRoute="/nutrition/question/17"
      nextRoute="/nutrition/question/18"
      previousRoute="/nutrition/question/16"
    />
  );
};

export default Question17;
