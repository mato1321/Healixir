
import NutritionQuestion from "@/components/NutritionQuestion";

const Question48 = () => {
  return (
    <NutritionQuestion
      questionNumber={48}
      question="您最希望改善的健康問題是什麼"
      options={["睡眠品質", "消化系統", "免疫力", "體重管理", "皮膚狀況", "精神狀態"]}
      isMultiSelect={true}
      currentRoute="/nutrition/question/48"
      nextRoute="/nutrition/analysis"
      previousRoute="/nutrition/question/47"
    />
  );
};

export default Question48;
