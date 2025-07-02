
import NutritionQuestion from "@/components/NutritionQuestion";

const Question42 = () => {
  return (
    <NutritionQuestion
      questionNumber={42}
      question="您是否會因火氣大造成進食的不適"
      options={["是", "否"]}
      currentRoute="/nutrition/question/42"
      nextRoute="/nutrition/question/43"
      previousRoute="/nutrition/question/41"
    />
  );
};

export default Question42;
