import NutritionQuestion from "@/components/NutritionQuestion";

const Question10 = () => {
  return (
    <NutritionQuestion
      questionNumber={10}
      question="您是否曾因為無法忍受B群的味道感到噁心想吐"
      options={["是", "否"]}
      showIfGoal="精神體力"
      currentRoute="/nutrition/question/10"
      nextRoute="/nutrition/question/11"
      previousRoute="/nutrition/question/9"
    />
  );
};

export default Question10;