import NutritionQuestion from "@/components/NutritionQuestion";

const Question24 = () => {
  return (
    <NutritionQuestion
      questionNumber={24}
      question="您的飲酒頻率(1份 = 1罐啤酒或1杯紅白酒或1個shot杯的烈酒)? 每週0-1份 / 每週2-8份 / 每週9份以上"
      options={["每週0-1份", "每週2-8份", "每週9份以上"]}
      currentRoute="/nutrition/question/24"
      nextRoute="/nutrition/question/25"
      previousRoute="/nutrition/question/23"
    />
  );
};

export default Question24;