import NutritionQuestion from "@/components/NutritionQuestion";

const Question23 = () => {
  return (
    <NutritionQuestion
      questionNumber={23}
      question="平均每日水分攝取(一瓶 = 600cc寶特瓶)?"
      options={["少於1瓶", "1-2瓶", "3瓶以上"]}
      currentRoute="/nutrition/question/23"
      nextRoute="/nutrition/question/24"
      previousRoute="/nutrition/question/22"
    />
  );
};

export default Question23;