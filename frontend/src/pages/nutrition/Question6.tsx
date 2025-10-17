import NutritionQuestion from "@/components/NutritionQuestion";

const Question6 = () => {
  return (
    <NutritionQuestion
      questionNumber={6}
      question="(骨關節)您是否有運動後肌肉痠痛的困擾"
      options={["是", "否"]}
      currentRoute="/nutrition/question/6"
      nextRoute="/nutrition/question/7"
      previousRoute="/nutrition/question/5"
    />
  );
};

export default Question6;