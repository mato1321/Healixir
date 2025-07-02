
import NutritionQuestion from "@/components/NutritionQuestion";

const Question43 = () => {
  return (
    <NutritionQuestion
      questionNumber={43}
      question="您是否經常久坐、長時間維持同樣姿勢、常提重物"
      options={["是", "否"]}
      currentRoute="/nutrition/question/43"
      nextRoute="/nutrition/question/44"
      previousRoute="/nutrition/question/42"
    />
  );
};

export default Question43;
