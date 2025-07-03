
import NutritionQuestion from "@/components/NutritionQuestion";

const Question20 = () => {
  return (
    <NutritionQuestion
      questionNumber={20}
      question="您在高強度運動過後是否感覺肌肉痠痛"
      options={["是", "否"]}
      currentRoute="/nutrition/question/20"
      nextRoute="/nutrition/question/21"
      previousRoute="/nutrition/question/19"
    />
  );
};

export default Question20;
