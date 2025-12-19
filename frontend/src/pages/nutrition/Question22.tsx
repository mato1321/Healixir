import NutritionQuestion from "@/components/NutritionQuestion";

const Question22 = () => {
  return (
    <NutritionQuestion
      questionNumber={22}
      question="每日五穀雜糧攝取?"
      options={["0-2碗", "2-4碗", "4碗以上"]}
      currentRoute="/nutrition/question/22"
      nextRoute="/nutrition/question/23"
      previousRoute="/nutrition/question/21"
    />
  );
};

export default Question22;