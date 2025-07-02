
import NutritionQuestion from "@/components/NutritionQuestion";

const Question13 = () => {
  return (
    <NutritionQuestion
      questionNumber={13}
      question="您如廁最常的狀況為何"
      options={["便便較硬不易排出", "便便較軟成行不完全", "便便呈糊狀或水狀", "以上皆無"]}
      currentRoute="/nutrition/question/13"
      nextRoute="/nutrition/question/14"
      previousRoute="/nutrition/question/12"
    />
  );
};

export default Question13;
