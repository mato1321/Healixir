import NutritionQuestion from "@/components/NutritionQuestion";

const Question31 = () => {
  return (
    <NutritionQuestion
      questionNumber={31}
      question="您睡眠的過程中是否有多夢的情形? 經常 / 偶爾 / 很少"
      options={["經常", "偶爾", "很少"]}
      currentRoute="/nutrition/question/31"
      nextRoute="/nutrition/question/32"
      previousRoute="/nutrition/question/30"
    />
  );
};

export default Question31;