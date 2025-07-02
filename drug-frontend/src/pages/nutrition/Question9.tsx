
import NutritionQuestion from "@/components/NutritionQuestion";

const Question9 = () => {
  return (
    <NutritionQuestion
      questionNumber={9}
      question="您經常加班熬夜或是感到體力需要增強嗎"
      options={["常常", "偶爾", "很少"]}
      currentRoute="/nutrition/question/9"
      nextRoute="/nutrition/question/10"
      previousRoute="/nutrition/question/8"
    />
  );
};

export default Question9;
