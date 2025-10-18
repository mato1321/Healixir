import NutritionQuestion from "@/components/NutritionQuestion";

const Question28 = () => {
  return (
    <NutritionQuestion
      questionNumber={28}
      question="您半年內是否被診斷出缺乏以下營養素? 鐵 / 鈣 / 維生素B群 / 維生素C / 維生素D / 都沒有"
      options={["鐵", "鈣", "維生素B群", "維生素C", "維生素D", "都沒有"]}
      isMultiSelect={true}
      currentRoute="/nutrition/question/28"
      nextRoute="/nutrition/question/29"
      previousRoute="/nutrition/question/27"
    />
  );
};

export default Question28;