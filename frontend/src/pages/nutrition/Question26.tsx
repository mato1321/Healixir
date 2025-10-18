import NutritionQuestion from "@/components/NutritionQuestion";

const Question26 = () => {
  return (
    <NutritionQuestion
      questionNumber={26}
      question="您的抽菸頻率? 幾乎不抽菸 / 一週1-2包 / 每天半包 / 每天1包以上"
      options={["幾乎不抽菸", "一週1-2包", "每天半包", "每天1包以上"]}
      currentRoute="/nutrition/question/26"
      nextRoute="/nutrition/question/27"
      previousRoute="/nutrition/question/25"
    />
  );
};

export default Question26;