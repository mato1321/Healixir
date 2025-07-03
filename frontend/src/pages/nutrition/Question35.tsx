
import NutritionQuestion from "@/components/NutritionQuestion";

const Question35 = () => {
  return (
    <NutritionQuestion
      questionNumber={35}
      question="(生理性別女)您正處於以下哪一個階段"
      options={["有生理週期", "初經還未到來", "已停經"]}
      currentRoute="/nutrition/question/35"
      nextRoute="/nutrition/question/36"
      previousRoute="/nutrition/question/34"
    />
  );
};

export default Question35;
