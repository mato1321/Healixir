import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HealthAnalysisService } from '@/services/healthAnalysis';

const HealthGoalsPage = () => {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  useEffect(() => {
    // 頁面載入時滾動到頂部
    window.scrollTo(0, 0);

    // 若有先前選取則載入（不改變樣式，僅恢復選取狀態）
    const prev = HealthAnalysisService.loadSelectedGoals();
    if (prev && prev.length) setSelectedGoals(prev);
  }, []);

  // 只改這裡的目標清單，頁面樣式其餘完全不變
  const healthGoals = [
    '眼睛',
    '骨關節',
    '腸胃',
    '精神體力',
    '免疫力',
    '皮膚',
    '睡眠'
  ];

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleNext = () => {
    // 儲存選取的目標（不影響頁面樣式），問卷頁面可依此決定要顯示哪些題目
    HealthAnalysisService.saveSelectedGoals(selectedGoals);
    navigate('/nutrition/question/1');
  };

  const handlePrevious = () => {
    navigate('/nutrition/personal-info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100">
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
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Healixir
                  </h1>
                  <p className="text-xs text-gray-500">專業保健顧問</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 標題區域 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            選擇您想保健的目標方向
          </h1>
          <p className="text-gray-600 text-lg">請選擇您最關心的健康領域，我們將為您提供更精準的建議</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8">
            {/* 上一題按鈕 */}
            <div className="flex items-center mb-8">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                onClick={handlePrevious}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回基本資訊
              </Button>
            </div>

            {/* 目標選擇網格 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {healthGoals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`p-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 font-medium ${
                    selectedGoals.includes(goal)
                      ? 'bg-blue-100/70 backdrop-blur-sm text-blue-800 shadow-lg border-2 border-blue-200'
                      : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>

            {/* 下一題按鈕 */}
            <div className="flex justify-center">
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-16 py-4 rounded-full text-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-3">繼續</span>
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthGoalsPage;