
import NutritionQuestion from "@/components/NutritionQuestion";

const Question31 = () => {
  return (
    <NutritionQuestion
      questionNumber={31}
      question="飲酒頻率(每份約1罐啤酒/1杯紅白酒/1個shot杯的烈酒)"
      options={["每週0-1份", "每週2-8份", "每週9-14份", "每周15份以上"]}
      currentRoute="/nutrition/question/31"
      nextRoute="/nutrition/question/32"
      previousRoute="/nutrition/question/30"
    />
  );
};

export default Question31;
