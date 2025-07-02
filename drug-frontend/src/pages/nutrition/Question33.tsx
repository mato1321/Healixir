
import NutritionQuestion from "@/components/NutritionQuestion";

const Question33 = () => {
  return (
    <NutritionQuestion
      questionNumber={33}
      question="您的抽菸頻率(若無抽菸但長期吸二手菸者，於二手菸室內環境每天待8小時，約等於每天抽半包菸)"
      options={["幾乎不抽菸", "一週1-2包", "每天半包", "每天1包以上"]}
      currentRoute="/nutrition/question/33"
      nextRoute="/nutrition/question/34"
      previousRoute="/nutrition/question/32"
    />
  );
};

export default Question33;
