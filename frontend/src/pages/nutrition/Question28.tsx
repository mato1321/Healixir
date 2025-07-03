
import NutritionQuestion from "@/components/NutritionQuestion";

const Question28 = () => {
  return (
    <NutritionQuestion
      questionNumber={28}
      question="平均每日水分攝取"
      options={["少於1罐600cc寶特瓶", "2罐600cc寶特瓶", "3罐600cc寶特瓶以上"]}
      currentRoute="/nutrition/question/28"
      nextRoute="/nutrition/question/29"
      previousRoute="/nutrition/question/27"
    />
  );
};

export default Question28;
