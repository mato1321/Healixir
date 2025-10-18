import NutritionQuestion from "@/components/NutritionQuestion";

const Question27 = () => {
  return (
    <NutritionQuestion
      questionNumber={27}
      question="您的排便頻率? 一天三次以上 / 一天一次 / 兩天一次 / 超過兩天一次"
      options={["一天三次以上", "一天一次", "兩天一次", "超過兩天一次"]}
      currentRoute="/nutrition/question/27"
      nextRoute="/nutrition/question/28"
      previousRoute="/nutrition/question/26"
    />
  );
};

export default Question27;