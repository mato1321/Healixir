import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const navigate = useNavigate();

  useEffect(() => {
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

  // 模擬評估資料
  const mockAssessments = [
    {
      id: 1,
      date: "2024-06-20",
      type: "營養目標評估",
      status: "已完成",
      result: "個人化營養建議已生成"
    },
    {
      id: 2,
      date: "2024-05-15",
      type: "營養目標評估",
      status: "已完成",
      result: "個人化營養建議已生成"
    }
  ];

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

  // 下載功能 - 添加BOM以確保正確編碼
  const downloadAssessmentSummary = (assessmentId: number) => {
    const reportContent = `健康評估摘要報告
========================

基本資訊
--------
評估編號：${assessmentId}
評估日期：2024-06-20
評估類型：營養目標評估
狀態：已完成
用戶姓名：${user?.name || '未知用戶'}
用戶信箱：${user?.email || '未設定'}

評估結果
--------
✓ 個人化營養建議已生成
✓ 整體健康評分：78/100

主要建議
--------
1. 增加維他命D3攝取
2. 補充Omega-3脂肪酸
3. 維持目前的鈣質攝取量
4. 建議增加益生菌補充

注意事項
--------
• 如需詳細報告，請點擊"查看"按鈕進入完整評估頁面
• 建議定期進行健康評估以追蹤改善情況
• 如有疑問可聯絡客服或藥師諮詢

報告生成資訊
------------
生成時間：${new Date().toLocaleString('zh-TW')}
版本：1.0
系統：Healixir 健康管理平台

========================
© Healixir 版權所有`;

    try {
      // 添加UTF-8 BOM以確保正確編碼
      const BOM = '\uFEFF';
      const contentWithBOM = BOM + reportContent;
      
      const blob = new Blob([contentWithBOM], { 
        type: 'text/plain;charset=utf-8' 
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Healixir_健康評估報告_${user?.name || 'User'}_${assessmentId}_${new Date().toISOString().split('T')[0]}.txt`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('📥 評估報告下載成功！請使用記事本或其他文字編輯器開啟檔案。');
    } catch (error) {
      console.error('下載失敗:', error);
      alert('❌ 下載失敗，請稍後再試');
    }
  };

  // PDF直接下載功能 - 使用HTML轉PDF避免中文字體問題
  const downloadAsPDF = async (assessmentId: number) => {
    try {
      // 動態導入所需庫
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      // 創建臨時的HTML內容
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '794px'; // A4寬度
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.padding = '40px';
      tempDiv.style.fontFamily = '"Microsoft JhengHei", "PingFang TC", "Helvetica Neue", Arial, sans-serif';
      
      tempDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #2563eb; font-size: 28px; margin: 0;">健康評估摘要報告</h1>
          <p style="color: #666; margin: 10px 0;">Healixir 健康管理平台</p>
          <hr style="border: 2px solid #2563eb; margin: 20px 0;">
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #2563eb; border-left: 4px solid #2563eb; padding-left: 10px; margin-bottom: 15px;">📋 基本資訊</h3>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
            <p style="margin: 5px 0;"><strong>評估編號：</strong>${assessmentId}</p>
            <p style="margin: 5px 0;"><strong>評估日期：</strong>2024-06-20</p>
            <p style="margin: 5px 0;"><strong>用戶姓名：</strong>${user?.name || '未知用戶'}</p>
            <p style="margin: 5px 0;"><strong>評估類型：</strong>營養目標評估</p>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #2563eb; border-left: 4px solid #2563eb; padding-left: 10px; margin-bottom: 15px;">📊 整體健康評分</h3>
          <div style="text-align: center; background: #f8fafc; padding: 20px; border-radius: 8px;">
            <div style="font-size: 72px; color: #2563eb; font-weight: bold; margin: 0;">78</div>
            <div style="font-size: 18px; color: #666;">/ 100分</div>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #2563eb; border-left: 4px solid #2563eb; padding-left: 10px; margin-bottom: 15px;">💡 個人化營養建議</h3>
          <div style="background: #dbeafe; padding: 10px; margin: 8px 0; border-radius: 6px;">✓ 建議增加維他命D3的攝取</div>
          <div style="background: #dbeafe; padding: 10px; margin: 8px 0; border-radius: 6px;">✓ Omega-3脂肪酸需要補充</div>
          <div style="background: #dbeafe; padding: 10px; margin: 8px 0; border-radius: 6px;">✓ 維持目前的鈣質攝取量</div>
          <div style="background: #dbeafe; padding: 10px; margin: 8px 0; border-radius: 6px;">✓ 建議增加益生菌補充</div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #f59e0b; border-left: 4px solid #f59e0b; padding-left: 10px; margin-bottom: 15px;">⚠️ 需要注意的健康風險</h3>
          <div style="background: #fef3c7; padding: 10px; margin: 8px 0; border-radius: 6px;">• 維他命D不足可能影響骨骼健康</div>
          <div style="background: #fef3c7; padding: 10px; margin: 8px 0; border-radius: 6px;">• 缺乏Omega-3可能影響心血管健康</div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #2563eb; border-left: 4px solid #2563eb; padding-left: 10px; margin-bottom: 15px;">📝 注意事項</h3>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
            <p style="margin: 5px 0;">• 如需詳細報告，請登入系統查看完整評估頁面</p>
            <p style="margin: 5px 0;">• 建議定期進行健康評估以追蹤改善情況</p>
            <p style="margin: 5px 0;">• 如有疑問可聯絡客服或藥師諮詢</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 40px; color: #666; font-size: 12px;">
          <p>報告生成時間：${new Date().toLocaleString('zh-TW')}</p>
          <p>© Healixir 版權所有</p>
        </div>
      `;
      
      // 添加到頁面
      document.body.appendChild(tempDiv);
      
      // 轉換為canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: tempDiv.scrollHeight
      });
      
      // 移除臨時元素
      document.body.removeChild(tempDiv);
      
      // 創建PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / (imgWidth * 0.264583), pdfHeight / (imgHeight * 0.264583));
      const imgX = (pdfWidth - imgWidth * 0.264583 * ratio) / 2;
      const imgY = 0;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * 0.264583 * ratio, imgHeight * 0.264583 * ratio);
      
      // 下載PDF
      pdf.save(`Healixir_健康評估報告_${user?.name || 'User'}_${assessmentId}_${new Date().toISOString().split('T')[0]}.pdf`);
      
      alert('📥 PDF報告下載成功！');
    } catch (error) {
      console.error('PDF生成失敗:', error);
      alert('❌ PDF生成失敗，請確保已安裝 html2canvas 和 jsPDF 套件');
    }
  };

  // 如果正在載入，顯示載入狀態
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
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
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                    立即登入
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* 頂部導航 - 已移除Logo */}
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
                歡迎，<span className="font-medium text-purple-600">{user?.name || '會員'}</span>
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
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
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
                          <Package className="w-5 h-5 text-purple-600 mr-4" />
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
                            <p className="font-medium text-purple-600">{order.total}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link to="/cart">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
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
                  {mockAssessments.map((assessment) => (
                    <Link key={assessment.id} to={`/nutrition/assessment/${assessment.id}`}>
                      <div className="flex items-center justify-between p-4 border rounded-lg bg-white/60 hover:bg-white/80 transition-colors cursor-pointer">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-blue-600 mr-4" />
                          <div>
                            <div className="flex items-center mb-2">
                              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                              <span className="text-sm text-gray-500">{assessment.date}</span>
                              <span className="ml-4 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                {assessment.status}
                              </span>
                            </div>
                            <h3 className="font-medium text-gray-800 mb-1">{assessment.type}</h3>
                            <p className="text-sm text-gray-600">{assessment.result}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              downloadAsPDF(assessment.id);
                            }}
                            title="下載PDF報告"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            下載
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link to="/nutrition">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                      <FileText className="w-4 h-4 mr-2" />
                      進行新的評估
                    </Button>
                  </Link>
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