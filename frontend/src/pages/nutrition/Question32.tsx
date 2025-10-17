import NutritionQuestion from "@/components/NutritionQuestion";

const Question32 = () => {
  return (
    <NutritionQuestion
      questionNumber={32}
      question="您是否經常熬夜?"
      options={["是", "否"]}
      currentRoute="/nutrition/question/32"
      nextRoute="/nutrition/question/33"
      previousRoute="/nutrition/question/31"
    />
  );
};

export default Question32;