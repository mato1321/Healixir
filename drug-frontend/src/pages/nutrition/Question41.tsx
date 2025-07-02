
import NutritionQuestion from "@/components/NutritionQuestion";

const Question41 = () => {
  return (
    <NutritionQuestion
      questionNumber={41}
      question="您是否經常有吃東西或刷牙時會流血的狀況"
      options={["是", "否"]}
      currentRoute="/nutrition/question/41"
      nextRoute="/nutrition/question/42"
      previousRoute="/nutrition/question/40"
    />
  );
};

export default Question41;
