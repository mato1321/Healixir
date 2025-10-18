import NutritionQuestion from "@/components/NutritionQuestion";

const Question12 = () => {
  return (
    <NutritionQuestion
      questionNumber={12}
      question="(皮膚) 您是否有皮膚容易長痘痘的困擾"
      options={["是", "否"]}
      showIfGoal="皮膚"
      currentRoute="/nutrition/question/12"
      nextRoute="/nutrition/question/13"
      previousRoute="/nutrition/question/11"
    />
  );
};

export default Question12;