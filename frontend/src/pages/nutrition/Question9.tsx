import NutritionQuestion from "@/components/NutritionQuestion";

const Question9 = () => {
  return (
    <NutritionQuestion
      questionNumber={9}
      question="您是否經常感覺精神體力需要加強"
      options={["是", "否"]}
      showIfGoal="精神體力"
      currentRoute="/nutrition/question/9"
      nextRoute="/nutrition/question/10"
      previousRoute="/nutrition/question/8"
    />
  );
};

export default Question9;