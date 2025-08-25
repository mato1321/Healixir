import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssessmentApiService, AssessmentListItem } from "@/services/assessmentApi";
import { HealthAnalysisService } from "@/services/healthAnalysis";
import { 
  ArrowLeft,
  User,
  FileText,
  Package,
  Calendar,
  ShoppingCart,
  Download,
  Eye,
  AlertTriangle,
  Settings
} from "lucide-react";

const Member = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [assessments, setAssessments] = useState<AssessmentListItem[]>([]);
  const [assessmentsLoading, setAssessmentsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 頁面載入時滾動到頂部
    window.scrollTo(0, 0);
    
    // 檢查用戶登入狀態
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log("🔍 檢查用戶資料:", { token: !!token, userData });
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("👤 解析後的用戶資料:", parsedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
    
    setIsLoading(false);
  }, []);

  // 載入評估記錄
  useEffect(() => {
    const loadAssessments = async () => {
      if (isLoggedIn && !isLoading) {
        setAssessmentsLoading(true);
        try {
          const data = await AssessmentApiService.getAssessments(0, 10);
          setAssessments(data);
        } catch (error) {
          console.error('載入評估記錄失敗:', error);
          // 如果API失敗，顯示空列表（不使用模擬數據）
          setAssessments([]);
        } finally {
          setAssessmentsLoading(false);
        }
      }
    };

    loadAssessments();
  }, [isLoggedIn, isLoading]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { text: '優秀', color: 'text-green-600' };
    if (score >= 60) return { text: '良好', color: 'text-yellow-600' };
    if (score >= 40) return { text: '普通', color: 'text-orange-600' };
    return { text: '需改善', color: 'text-red-600' };
  };

  // 模擬訂單資料
  const mockOrders = [
    {
      id: "ORD-2024-001",
      date: "2024-06-25",
      status: "已發貨",
      total: "NT$ 2,580",
      items: ["維他命D3膠囊 x2", "Omega-3魚油 x1"]
    },
    {
      id: "ORD-2024-002",
      date: "2024-06-10",
      status: "已完成",
      total: "NT$ 1,890",
      items: ["益生菌膠囊 x1", "維他命B群 x1"]
    }
  ];

  // 如果正在載入，顯示載入狀態
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  // 如果未登入，顯示登入提示
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回首頁
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-16">
          <Card className="border-yellow-200 bg-yellow-50/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">需要登入才能訪問會員中心</h2>
              <p className="text-gray-600 mb-6">
                請先登入您的帳戶以查看個人資料、評估紀錄和訂單資訊
              </p>
              <div className="space-x-4">
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
                    立即登入
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                    註冊新帳戶
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100">
      {/* 頂部導航 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回首頁
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                歡迎，<span className="font-medium text-blue-600">{user?.name || '會員'}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 主要內容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">會員中心</h1>
          <p className="text-gray-600">管理您的健康評估紀錄和訂單資訊</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              個人資料
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              訂單資訊
            </TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              歷史評估
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  基本資料
                </CardTitle>
                <CardDescription>管理您的帳戶資訊和偏好設定</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white/60">
                      {user?.name || '未設定'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">電子郵件</label>
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white/60">
                      {user?.email || '未設定'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">生日</label>
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white/60">
                      {user?.birth_date || '未設定'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">電話號碼</label>
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-yellow-50/80 text-yellow-800">
                      {user?.phone || '尚未設定電話號碼'}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Link to="/member/edit">
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
                      <Settings className="w-4 h-4 mr-2" />
                      編輯資料
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  訂單資訊
                </CardTitle>
                <CardDescription>
                  查看您的購買紀錄和訂單狀態
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <Link key={order.id} to={`/nutrition/order/${order.id}`}>
                      <div className="flex items-center justify-between p-4 border rounded-lg bg-white/60 hover:bg-white/80 transition-colors cursor-pointer">
                        <div className="flex items-center">
                          <Package className="w-5 h-5 text-blue-600 mr-4" />
                          <div>
                            <div className="flex items-center mb-2">
                              <span className="font-medium text-gray-800">訂單號碼: {order.id}</span>
                              <span className={`ml-4 px-2 py-1 text-xs rounded-full ${
                                order.status === '已完成' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="flex items-center mb-2">
                              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                              <span className="text-sm text-gray-500">{order.date}</span>
                            </div>
                            <div className="mb-2">
                              <p className="text-sm text-gray-600">商品：</p>
                              <p className="text-sm text-gray-700 ml-4">{order.items.join(", ")}</p>
                            </div>
                            <p className="font-medium text-blue-600">{order.total}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link to="/cart">
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      前往購物車
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  健康評估紀錄
                </CardTitle>
                <CardDescription>
                  查看您的健康評估歷史紀錄和建議報告
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessmentsLoading ? (
                    <div className="text-center py-8">
                      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600">載入評估記錄中...</p>
                    </div>
                  ) : assessments.length > 0 ? (
                    assessments.map((assessment) => {
                      const scoreStatus = getScoreStatus(assessment.overall_score);
                      return (
                        <Link key={assessment.id} to={`/nutrition/assessment/${assessment.id}`}>
                          <div className="flex items-center justify-between p-4 border rounded-lg bg-white/60 hover:bg-white/80 transition-colors cursor-pointer">
                            <div className="flex items-center flex-1">
                              <FileText className="w-5 h-5 text-blue-600 mr-4" />
                              <div className="flex-1">
                                <div className="flex items-center mb-2">
                                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                  <span className="text-sm text-gray-500">
                                    {formatDate(assessment.created_at)}
                                  </span>
                                  <span className="ml-4 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    已完成
                                  </span>
                                </div>
                                <h3 className="font-medium text-gray-800 mb-1">
                                  {assessment.assessment_type === 'nutrition_assessment' ? '營養健康評估' : '健康評估'}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  綜合健康分數：
                                  <span className={`font-semibold ml-1 ${scoreStatus.color}`}>
                                    {assessment.overall_score}分 ({scoreStatus.text})
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <div className={`text-2xl font-bold ${scoreStatus.color}`}>
                                {assessment.overall_score}
                              </div>
                              <div className="text-xs text-gray-500">總分</div>
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">尚未有評估記錄</p>
                      <p className="text-sm text-gray-500">完成健康評估後，您的記錄會顯示在這裡</p>
                    </div>
                  )}
                </div>
                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => {
                      // 清除舊的評估數據後再導航
                      HealthAnalysisService.clearAllData();
                      navigate('/nutrition/personal-info');
                    }}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    進行新的評估
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Member;