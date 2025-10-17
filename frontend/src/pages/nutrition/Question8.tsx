import NutritionQuestion from "@/components/NutritionQuestion";

const Question8 = () => {
  return (
    <NutritionQuestion
      questionNumber={8}
      question="(免疫力)您平均一年內感冒的次數"
      options={["0-1次", "2-4次", "5次以上"]}
      currentRoute="/nutrition/question/8"
      nextRoute="/nutrition/question/9"
      previousRoute="/nutrition/question/7"
    />
  );
};

export default Question8;