
import NutritionQuestion from "@/components/NutritionQuestion";

const Question5 = () => {
  return (
    <NutritionQuestion
      questionNumber={5}
      question="您平均每天多久才能睡著"
      options={["30分鐘以內", "30分鐘以上", "我能睡得著，就是捨不得睡"]}
      currentRoute="/nutrition/question/5"
      nextRoute="/nutrition/question/6"
      previousRoute="/nutrition/question/4"
    />
  );
};

export default Question5;
