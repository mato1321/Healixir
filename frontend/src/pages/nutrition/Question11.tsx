import NutritionQuestion from "@/components/NutritionQuestion";

const Question11 = () => {
  return (
    <NutritionQuestion
      questionNumber={11}
      question="(皮膚)您是否有皮膚缺乏水份和彈性的困擾"
      options={["是", "否"]}
      currentRoute="/nutrition/question/11"
      nextRoute="/nutrition/question/12"
      previousRoute="/nutrition/question/10"
    />
  );
};

export default Question11;