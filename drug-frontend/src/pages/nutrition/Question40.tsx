
import NutritionQuestion from "@/components/NutritionQuestion";

const Question40 = () => {
  return (
    <NutritionQuestion
      questionNumber={40}
      question="您是否有換季的困擾，或忍不住想一直抓的情況"
      options={["沒有太多經驗", "偶爾會發生", "非常令我困擾"]}
      currentRoute="/nutrition/question/40"
      nextRoute="/nutrition/question/41"
      previousRoute="/nutrition/question/39"
    />
  );
};

export default Question40;
