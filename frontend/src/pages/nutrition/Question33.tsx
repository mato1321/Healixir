import NutritionQuestion from "@/components/NutritionQuestion";

const Question33 = () => {
  return (
    <NutritionQuestion
      questionNumber={33}
      question="您是否經常久坐、長時間維持同樣姿勢或提重物? 是 / 否"
      options={["是", "否"]}
      currentRoute="/nutrition/question/33"
      nextRoute="/nutrition/question/34"
      previousRoute="/nutrition/question/32"
    />
  );
};

export default Question33;