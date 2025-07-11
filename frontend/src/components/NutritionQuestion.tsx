import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";

interface NutritionQuestionProps {
  questionNumber: number;
  question: string;
  options: string[];
  isMultiSelect?: boolean;
  skipCondition?: string;
  currentRoute: string;
  nextRoute: string | null;
  previousRoute: string | null;
}

const NutritionQuestion = ({
  questionNumber,
  question,
  options,
  isMultiSelect = false,
  skipCondition,
  currentRoute,
  nextRoute,
  previousRoute
}: NutritionQuestionProps) => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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

  const handleNext = () => {
    if (nextRoute) {
      navigate(nextRoute);
    }
  };

  const handleSkip = () => {
    if (nextRoute) {
      navigate(nextRoute);
    }
  };

  const isOptionSelected = (option: string) => selectedOptions.includes(option);
  const canProceed = selectedOptions.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Healixir
          </h1>
          <p className="text-xs text-gray-500">智能保健顧問</p>
        </div>
        
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              {previousRoute && (
                <Link to={previousRoute} className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  上一題
                </Link>
              )}
              <div className="text-sm text-gray-500">
                第 {questionNumber} 題 / 共 48 題
              </div>
            </div>

            <div className="mb-8">
              <p className="text-gray-800 text-xl font-medium text-center leading-relaxed mb-4">
                {question}
              </p>
              {skipCondition && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-700 text-center">
                    {skipCondition}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3 mb-8">
              {options.map((option, index) => (
                <div key={index} className="w-full">
                  {isMultiSelect ? (
                    <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all">
                      <Checkbox
                        id={`option-${index}`}
                        checked={isOptionSelected(option)}
                        onCheckedChange={() => handleOptionSelect(option)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <label
                        htmlFor={`option-${index}`}
                        className="text-gray-700 cursor-pointer flex-1 font-medium"
                      >
                        {option}
                      </label>
                    </div>
                  ) : (
                    <Button
                      variant={isOptionSelected(option) ? "default" : "outline"}
                      className={`w-full py-4 text-left justify-start text-wrap h-auto font-medium ${
                        isOptionSelected(option)
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                          : "bg-white/60 backdrop-blur-sm hover:bg-blue-50 text-gray-700 border-gray-200 hover:border-blue-300"
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
              {isMultiSelect && skipCondition && (
                <Button
                  onClick={handleSkip}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-medium"
                >
                  跳過此題
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed && !isMultiSelect}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-300 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
