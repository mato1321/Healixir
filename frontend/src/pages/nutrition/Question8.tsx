
import NutritionQuestion from "@/components/NutritionQuestion";

const Question8 = () => {
  return (
    <NutritionQuestion
      questionNumber={8}
      question="您睡眠過程是否有多夢的情形(頻繁作夢、多個夢境)"
      options={["常常", "偶爾", "很少"]}
      currentRoute="/nutrition/question/8"
      nextRoute="/nutrition/question/9"
      previousRoute="/nutrition/question/7"
    />
  );
};

export default Question8;
