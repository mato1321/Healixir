
import NutritionQuestion from "@/components/NutritionQuestion";

const Question4 = () => {
  return (
    <NutritionQuestion
      questionNumber={4}
      question="您近期的情緒是"
      options={["焦慮暴躁", "壓力大", "低落", "正常"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無請直接點選下一題（有其他選項就不能按正常）"
      currentRoute="/nutrition/question/4"
      nextRoute="/nutrition/question/5"
      previousRoute="/nutrition/question/3"
    />
  );
};

export default Question4;
