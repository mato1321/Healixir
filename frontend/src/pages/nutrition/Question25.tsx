import NutritionQuestion from "@/components/NutritionQuestion";

const Question25 = () => {
  return (
    <NutritionQuestion
      questionNumber={25}
      question="您飲酒隔天是否會發生不適的情況?"
      options={["經常", "偶爾", "從來不會", "很少飲酒不清楚"]}
      currentRoute="/nutrition/question/25"
      nextRoute="/nutrition/question/26"
      previousRoute="/nutrition/question/24"
    />
  );
};

export default Question25;