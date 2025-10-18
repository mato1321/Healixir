import NutritionQuestion from "@/components/NutritionQuestion";

const Question29 = () => {
  return (
    <NutritionQuestion
      questionNumber={29}
      question="您平均每天多久才能睡著? 30分鐘以內 / 30分鐘以上"
      options={["30分鐘以內", "30分鐘以上"]}
      currentRoute="/nutrition/question/29"
      nextRoute="/nutrition/question/30"
      previousRoute="/nutrition/question/28"
    />
  );
};

export default Question29;