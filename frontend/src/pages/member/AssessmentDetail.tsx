import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Heart, Activity, User, LogOut, LogIn } from "lucide-react";
import { AssessmentApiService, AssessmentResponse } from "@/services/assessmentApi";

const AssessmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<AssessmentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 檢查用戶登入狀態
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
    } else {
      navigate('/login');
      return;
    }

    // 載入評估詳情
    const loadAssessment = async () => {
      if (!id) {
        setError('無效的評估ID');
        setLoading(false);
        return;
      }

      try {
        const data = await AssessmentApiService.getAssessmentById(parseInt(id));
        setAssessment(data);
      } catch (error) {
        console.error('載入評估詳情失敗:', error);
        setError('載入評估詳情失敗，請稍後再試');
      } finally {
        setLoading(false);
      }
    };

    loadAssessment();
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-green-400 to-green-600";
    if (score >= 60) return "from-yellow-400 to-yellow-600";
    if (score >= 40) return "from-orange-400 to-orange-600";
    return "from-red-400 to-red-600";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入評估詳情中...</p>
        </div>
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">載入失敗</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => navigate('/member')} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回會員中心
          </Button>
        </div>
      </div>
    );
  }

  const analysisData = [
    { category: "飲食", score: assessment.diet_score, color: getScoreColor(assessment.diet_score) },
    { category: "作息", score: assessment.lifestyle_score, color: getScoreColor(assessment.lifestyle_score) },
    { category: "心理", score: assessment.mental_score, color: getScoreColor(assessment.mental_score) },
    { category: "體質", score: assessment.physical_score, color: getScoreColor(assessment.physical_score) },
    { category: "運動", score: assessment.exercise_score, color: getScoreColor(assessment.exercise_score) }
  ];

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
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                    Healixir
                  </h1>
                  <p className="text-xs text-gray-500">專業保健顧問</p>
                </div>
              </Link>
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">首頁</Link>
              <Link to="/member">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                  <User className="w-4 h-4 mr-2" />
                  會員
                </Button>
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">
                    歡迎，<span className="font-medium text-blue-600">{user.name || user.email}</span>
                  </span>
                  <Button 
                    onClick={handleLogout}
                    variant="ghost" 
                    size="sm"
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    登出
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                    <LogIn className="w-4 h-4 mr-2" />
                    登入
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 返回按鈕和標題 */}
        <div className="mb-8">
          <Button 
            onClick={() => navigate('/member')}
            variant="ghost" 
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回會員中心
          </Button>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-2">
              健康評估詳情
            </h1>
            <p className="text-gray-600">評估時間：{formatDate(assessment.created_at)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 綜合分析結果 */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex justify-between items-center">
                <span className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
                  綜合分析結果
                </span>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                  {assessment.overall_score}分
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {analysisData.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{item.category}</span>
                    <span className="font-bold text-lg text-gray-800">{item.score}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                    <div 
                      className={`bg-gradient-to-r ${item.color} h-4 rounded-full transition-all duration-1000 shadow-sm`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-sm text-gray-500 mt-6 px-1">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </CardContent>
          </Card>

          {/* 健康分析說明 */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-blue-600" />
                健康分析說明
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-gray-700 space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <p className="mb-2">您的綜合健康分數超過</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-2">
                    {assessment.percentile}% 的同齡人
                  </p>
                </div>
                
                {assessment.bmi && (
                  <div className={`rounded-lg p-4 ${assessment.bmi >= 18.5 && assessment.bmi <= 24.9 ? 'bg-green-50' : 'bg-orange-50'}`}>
                    <p className="mb-2">您的身體質量指數為</p>
                    <p className="mb-2">
                      <span className={`font-bold text-lg ${assessment.bmi >= 18.5 && assessment.bmi <= 24.9 ? 'text-green-600' : 'text-orange-600'}`}>
                        {assessment.bmi} kg/m²
                      </span>
                      <span className="text-gray-600">，
                        {assessment.bmi < 18.5 ? '體重過輕' : 
                         assessment.bmi <= 24.9 ? '屬於正常範圍' : 
                         assessment.bmi <= 29.9 ? '體重過重' : '肥胖'}
                      </span>
                    </p>
                  </div>
                )}
                
                {assessment.needs_improvement.length > 0 && (
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="font-medium text-orange-800 mb-2">需要改善的領域：</p>
                    <p className="text-orange-700">
                      <span className="font-semibold">{assessment.needs_improvement.join('、')}</span> 方面需要特別關注
                    </p>
                  </div>
                )}

                {assessment.recommendations.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="font-medium text-blue-800 mb-3">個人化建議：</p>
                    <ul className="space-y-2">
                      {assessment.recommendations.map((recommendation, index) => (
                        <li key={index} className="text-blue-700 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssessmentDetail;