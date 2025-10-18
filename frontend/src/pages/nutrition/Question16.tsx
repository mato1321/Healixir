import NutritionQuestion from "@/components/NutritionQuestion";

const Question16 = () => {
  return (
    <NutritionQuestion
      questionNumber={16}
      question="您的飲食習慣是? 素食 / 葷食"
      options={["素食", "葷食"]}
      currentRoute="/nutrition/question/16"
      nextRoute="/nutrition/question/17"
      previousRoute="/nutrition/question/15"
    />
  );
};

export default Question16;