import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ClipboardList, CheckCircle } from "lucide-react";

const QuestionnaireStart = () => {
  const navigate = useNavigate();
  const [hasUsedSupplements, setHasUsedSupplements] = useState<string>("");
  const [currentSupplementCount, setCurrentSupplementCount] = useState<string>("");
  const [supplementFrequency, setSupplementFrequency] = useState<string>("");

  const handleStart = () => {
    navigate("/nutrition/question/1");
  };

  const isFormComplete = hasUsedSupplements && currentSupplementCount && supplementFrequency;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* 頂部導航 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/favicon.ico" 
                  alt="Logo" 
                  className="w-10 h-10 mr-3"
                />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Healixir
                  </h1>
                  <p className="text-xs text-gray-500">智能保健顧問</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 標題區域 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            準備開始健康評估
          </h1>
        </div>
        
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <div className="p-6 pb-0">
            <Link to="/nutrition/health-goals">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回目標方向
              </Button>
            </Link>
          </div>
          <CardContent className="p-8 pt-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">問卷說明</h3>
              <div className="space-y-3 text-gray-700">
                <p>• 可以隨時返回修改之前的答案</p>
                <p>• 完成後將獲得個人化的健康建議</p>
              </div>
            </div>

            <div className="text-center space-y-8">
              <div className="text-xl font-semibold text-gray-800 mb-6">
                在開始問卷前，讓我們先了解您的保健食品使用情況
              </div>
              
              <div className="space-y-8">
                <div>
                  <div className="text-lg font-medium text-gray-800 mb-6">
                    有無吃過保健食品？
                  </div>
                  <div className="flex justify-center space-x-6">
                    <Button 
                      variant={hasUsedSupplements === "有" ? "default" : "outline"} 
                      className={`px-10 py-4 rounded-full font-medium text-lg min-w-[120px] ${
                        hasUsedSupplements === "有" 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg" 
                          : "bg-white/60 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                      onClick={() => setHasUsedSupplements("有")}
                    >
                      有
                    </Button>
                    <Button 
                      variant={hasUsedSupplements === "無" ? "default" : "outline"} 
                      className={`px-10 py-4 rounded-full font-medium text-lg min-w-[120px] ${
                        hasUsedSupplements === "無" 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg" 
                          : "bg-white/60 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                      onClick={() => setHasUsedSupplements("無")}
                    >
                      無
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="text-lg font-medium text-gray-800 mb-6">
                    您目前正在服用保健食品？
                  </div>
                  <div className="flex justify-center space-x-4">
                    {["0", "1-2", "3-5", "5+"].map((count) => (
                      <Button 
                        key={count}
                        variant={currentSupplementCount === count ? "default" : "outline"} 
                        className={`px-8 py-4 rounded-full font-medium text-lg min-w-[80px] ${
                          currentSupplementCount === count 
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg" 
                            : "bg-white/60 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                        onClick={() => setCurrentSupplementCount(count)}
                      >
                        {count}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-lg font-medium text-gray-800 mb-6">
                    您服用保健食品的頻率是？
                  </div>
                  <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {["沒有在吃", "想到才吃", "會吃但申請懶惰", "幾乎每天服用"].map((freq) => (
                      <Button 
                        key={freq}
                        variant={supplementFrequency === freq ? "default" : "outline"} 
                        className={`px-6 py-4 rounded-full font-medium text-lg ${
                          supplementFrequency === freq 
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg" 
                            : "bg-white/60 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                        onClick={() => setSupplementFrequency(freq)}
                      >
                        {freq}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  onClick={handleStart}
                  disabled={!isFormComplete}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-300 disabled:opacity-50 text-white px-16 py-4 rounded-full text-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <ClipboardList className="w-6 h-6 mr-3" />
                  開始問卷調查
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionnaireStart;