import NutritionQuestion from "@/components/NutritionQuestion";

const Question15 = () => {
  return (
    <NutritionQuestion
      questionNumber={15}
      question="(睡眠)您最近的情緒是"
      options={["焦慮", "壓力大", "低落", "正常"]}
      currentRoute="/nutrition/question/15"
      nextRoute="/nutrition/question/16"
      previousRoute="/nutrition/question/14"
    />
  );
};

export default Question15;