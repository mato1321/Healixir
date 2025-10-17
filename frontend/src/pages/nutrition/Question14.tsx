import NutritionQuestion from "@/components/NutritionQuestion";

const Question14 = () => {
  return (
    <NutritionQuestion
      questionNumber={14}
      question="(睡眠)您一週需要幫入睡的頻率?"
      options={["幾乎不用", "一週1-3次", "幾乎天天難以入睡"]}
      currentRoute="/nutrition/question/14"
      nextRoute="/nutrition/question/15"
      previousRoute="/nutrition/question/13"
    />
  );
};

export default Question14;