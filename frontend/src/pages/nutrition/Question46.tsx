
import NutritionQuestion from "@/components/NutritionQuestion";

const Question46 = () => {
  return (
    <NutritionQuestion
      questionNumber={46}
      question="您正在規律服用以下哪些藥物"
      options={["利尿劑", "抗凝血藥物", "降血脂藥", "抗憂鬱劑", "激素", "抗生素", "消炎止痛藥", "類固醇"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無請直接點選下一題，系統將為您排除不適合與以下藥物併用的保健食品"
      currentRoute="/nutrition/question/46"
      nextRoute="/nutrition/question/47"
      previousRoute="/nutrition/question/45"
    />
  );
};

export default Question46;
