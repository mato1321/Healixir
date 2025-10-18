import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { HealthAnalysisService, QuestionAnswer } from "@/services/healthAnalysis";

interface NutritionQuestionProps {
  questionNumber: number;
  question: string;
  options: string[];
  isMultiSelect?: boolean;
  currentRoute: string;
  nextRoute?: string;
  previousRoute?: string;
  // 新增：僅在使用者已選此目標時顯示此題（若未選則會自動跳過）
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

  useEffect(() => {
    window.scrollTo(0, 0);

    // 如果本題只應顯示於某目標被選取時，檢查是否已選該目標
    if (showIfGoal) {
      const selectedGoals = HealthAnalysisService.loadSelectedGoals();
      if (!selectedGoals.includes(showIfGoal)) {
        // 當不應顯示時，自動跳至下一題（不存答案）
        if (nextRoute) {
          navigate(nextRoute);
        }
        return;
      }
    }

    // 載入之前儲存的答案（若有）
    const savedAnswers = HealthAnalysisService.loadAnswers();
    const currentAnswer = savedAnswers.find(answer => answer.questionNumber === questionNumber);
    if (currentAnswer) {
      setSelectedOptions(currentAnswer.selectedOptions);
    }
  }, [questionNumber, showIfGoal, nextRoute, navigate]);

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
    if (selectedOptions.length > 0) {
      saveAnswer();
    }
    if (nextRoute) {
      navigate(nextRoute);
    }
  };

  const isOptionSelected = (option: string) => selectedOptions.includes(option);
  const canProceed = selectedOptions.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* 頁首、題目顯示、選項 render 保持原樣 */}
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
                disabled={!canProceed && !isMultiSelect}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full"
              >
                {nextRoute === "/nutrition/analysis" ? "完成問卷" : "下一題"}
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