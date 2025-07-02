
import NutritionQuestion from "@/components/NutritionQuestion";

const Question10 = () => {
  return (
    <NutritionQuestion
      questionNumber={10}
      question="您是否有注意力不集中的情況"
      options={["較少", "偶爾", "時常發生"]}
      currentRoute="/nutrition/question/10"
      nextRoute="/nutrition/question/11"
      previousRoute="/nutrition/question/9"
    />
  );
};

export default Question10;
