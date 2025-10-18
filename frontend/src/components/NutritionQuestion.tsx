import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HealthAnalysisService, QuestionAnswer } from "@/services/healthAnalysis";

interface NutritionQuestionProps {
  questionNumber: number;
  question: string;
  options: string[];
  isMultiSelect?: boolean;
  currentRoute: string;
  nextRoute?: string;
  previousRoute?: string;
  // showIfGoal 仍可保留作為標記（但主要行為由 service 的 mapping 決定）
  showIfGoal?: string;
}

const NutritionQuestion = ({
  questionNumber,
  question,
  options,
  isMultiSelect = false,
  currentRoute,
  nextRoute,
  previousRoute,
  showIfGoal
}: NutritionQuestionProps) => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  // isAllowed: null = 尚未決定（不 render UI），true = 顯示， false = 不顯示並已導向下一頁
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    // 先滾回頂部
    window.scrollTo(0, 0);

    // 檢查是否應該顯示：使用 central mapping（若用戶直接打開 URL，這裡會處理）
    const selectedGoals = HealthAnalysisService.loadSelectedGoals();
    const requiredGoal = showIfGoal; // 該層級仍可作為提示，但最終依 service 的 mapping 決定
    // 使用 service 的 getNextVisibleQuestion 來判斷是否此題在 selectedGoals 中
    // 若該題為綁定目標，且使用者未選該目標 -> 導至下一個可見題目（不 render 本頁）
    const questionRequires = (HealthAnalysisService as any).QUESTION_SHOW_IF
      ? (HealthAnalysisService as any).QUESTION_SHOW_IF[questionNumber]
      : null;

    // 如果該題在 service 的 mapping 中且使用者未選對應目標 -> 跳過
    if (questionRequires && !selectedGoals.includes(questionRequires)) {
      const next = HealthAnalysisService.getNextVisibleQuestion(questionNumber, selectedGoals);
      if (next) {
        navigate(`/nutrition/question/${next}`);
      } else {
        navigate("/nutrition/analysis");
      }
      setIsAllowed(false);
      return;
    }

    // 否則允許顯示並讀取已儲存答案（如果有）
    setIsAllowed(true);
    const savedAnswers = HealthAnalysisService.loadAnswers();
    const currentAnswer = savedAnswers.find(answer => answer.questionNumber === questionNumber);
    if (currentAnswer) {
      setSelectedOptions(currentAnswer.selectedOptions);
    } else {
      setSelectedOptions([]);
    }
  }, [questionNumber, showIfGoal, navigate]);

  const handleOptionSelect = (option: string) => {
    if (isMultiSelect) {
      setSelectedOptions(prev =>
        prev.includes(option)
          ? prev.filter(o => o !== option)
          : [...prev, option]
      );
    } else {
      setSelectedOptions([option]);
    }
  };

  const saveAnswer = () => {
    const savedAnswers = HealthAnalysisService.loadAnswers();
    const newAnswer: QuestionAnswer = {
      questionNumber,
      selectedOptions,
      question
    };
    const updatedAnswers = savedAnswers.filter(answer => answer.questionNumber !== questionNumber);
    updatedAnswers.push(newAnswer);
    updatedAnswers.sort((a, b) => a.questionNumber - b.questionNumber);
    HealthAnalysisService.saveAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) {
      // 按鈕本來就會 disabled，不應該到這裡，但加保險
      return;
    }
    saveAnswer();

    // 使用 service 計算下一個可見題目（避免導向被跳過頁面）
    const next = HealthAnalysisService.getNextVisibleQuestion(questionNumber);
    if (next) {
      navigate(`/nutrition/question/${next}`);
    } else {
      navigate("/nutrition/analysis");
    }
  };

  const isOptionSelected = (option: string) => selectedOptions.includes(option);
  const canProceed = selectedOptions.length > 0; // 多選也需至少選 1 個

  // 若尚未決定是否 allowed，或者已被判定不允許，則不 render UI （避免短暫閃動）
  if (isAllowed === null) return null;
  if (isAllowed === false) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-8">
              {previousRoute && (
                <Link to={previousRoute} className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  上一題
                </Link>
              )}
            </div>

            <div className="mb-8">
              <p className="text-gray-800 text-xl font-medium text-center leading-relaxed mb-4">
                {question}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {options.map((option, index) => (
                <div key={index} className="w-full">
                  {isMultiSelect ? (
                    <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                      <Checkbox
                        id={`option-${index}`}
                        checked={isOptionSelected(option)}
                        onCheckedChange={() => handleOptionSelect(option)}
                      />
                      <label htmlFor={`option-${index}`} className="text-gray-700 cursor-pointer flex-1 font-medium">
                        {option}
                      </label>
                    </div>
                  ) : (
                    <Button
                      variant={isOptionSelected(option) ? "default" : "outline"}
                      className={`w-full py-4 text-left h-auto font-medium ${
                        isOptionSelected(option)
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                          : "bg-white/60 text-gray-700 border-gray-200"
                      }`}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full disabled:bg-gray-300 disabled:opacity-60"
              >
                { /* 如果下一個是分析頁，按鈕上顯示完成問卷 */ }
                {HealthAnalysisService.getNextVisibleQuestion(questionNumber) ? "下一題" : "完成問卷"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NutritionQuestion;