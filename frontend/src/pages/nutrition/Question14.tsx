
import NutritionQuestion from "@/components/NutritionQuestion";

const Question14 = () => {
  return (
    <NutritionQuestion
      questionNumber={14}
      question="您有以下那些情況"
      options={["頻尿", "排尿有灼熱或疼痛", "私密處搔癢、異味或有分泌物", "經常泌尿道感染"]}
      isMultiSelect={true}
      skipCondition="以下為複選，若皆無請直接點選下一題"
      currentRoute="/nutrition/question/14"
      nextRoute="/nutrition/question/15"
      previousRoute="/nutrition/question/13"
    />
  );
};

export default Question14;
