
import NutritionQuestion from "@/components/NutritionQuestion";

const Question32 = () => {
  return (
    <NutritionQuestion
      questionNumber={32}
      question="飲酒隔天會發生不適的情況嗎"
      options={["每次或經常", "偶爾或很少", "從來不會", "很少飲酒，不清楚"]}
      skipCondition="如果第31題選擇「每週0-1份」，可跳過此題"
      currentRoute="/nutrition/question/32"
      nextRoute="/nutrition/question/33"
      previousRoute="/nutrition/question/31"
    />
  );
};

export default Question32;
