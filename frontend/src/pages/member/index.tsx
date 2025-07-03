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

  // PDF直接下載功能 - 與健康評估報告組件完全一致
  const downloadAsPDF = async (assessmentId: number) => {
    try {
      // 動態導入所需庫
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      // 創建臨時的HTML內容 - 設定為 A4 尺寸
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '210mm'; // A4 寬度
      tempDiv.style.minHeight = '297mm'; // A4 高度
      tempDiv.style.backgroundColor = '#ffffff';
      tempDiv.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
      tempDiv.style.fontSize = '12px';
      tempDiv.style.lineHeight = '1.5';
      tempDiv.style.color = '#000000';
      
      // 健康指標數據
      const healthMetrics = [
        { name: '飲食', score: 70, color: '#10b981', icon: '🍎' },
        { name: '作息', score: 85, color: '#10b981', icon: '⏰' },
        { name: '心理', score: 25, color: '#ef4444', icon: '🧠' },
        { name: '體質', score: 58, color: '#eab308', icon: '❤️' },
        { name: '運動', score: 9, color: '#ef4444', icon: '🏃' }
      ];

      // 建議數據
      const recommendations = [
        {
          number: 1,
          title: '飲食方面 建議：',
          content: '您目前有不錯的飲食習慣，建議繼持續三餐均衡飲食，多重視充天然蔬果攝取營養，並避免過多的快餐與高油加工食品。'
        },
        {
          number: 2,
          title: '心理方面 建議：',
          content: '心理壓力較敏感，建議定期進行放鬆練習，如冥想、深呼吸、寫日記，或尋找讓您放心交流的朋友、若壓力持續過重，也可考慮尋求專心理諮詢。'
        },
        {
          number: 3,
          title: '作息方面 建議：',
          content: '作息健康程度良好，請繼持現有的作息時間，每晚盡量充足的7-9小時睡眠，並盡量在晚上11點前入睡，幫助身體修復和新陳代謝。'
        },
        {
          number: 4,
          title: '體質方面 建議：',
          content: '整體體質維持良好，請繼續持續均衡的營養攝取與適度運動，如每週進行至少3次的有氧運動，有助於提升免疫力與身體機能。'
        },
        {
          number: 5,
          title: '運動方面 建議：',
          content: '運動量明顯不足，建議每天至少10-15分鐘的基礎運動開始，逐步增加強度，可以選擇快走、瑜伽、健身等您喜愛的運動，循序漸進提升身體健康和活力。'
        }
      ];

      // 生成健康指標的HTML
      const healthMetricsHTML = healthMetrics.map(metric => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
          <div style="display: flex; align-items: center;">
            <div style="width: 40px; height: 40px; background: linear-gradient(to right, #3b82f6, #9333ea); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
              <span style="font-size: 20px;">${metric.icon}</span>
            </div>
            <span style="color: #374151; font-weight: 500;">${metric.name}</span>
          </div>
          <div style="display: flex; align-items: center;">
            <div style="width: 128px; background: #e5e7eb; border-radius: 9999px; height: 12px; margin-right: 12px; overflow: hidden;">
              <div style="height: 100%; background: ${metric.color}; width: ${metric.score}%; border-radius: 9999px;"></div>
            </div>
            <span style="font-weight: bold; color: #1f2937; width: 32px; text-align: right;">${metric.score}</span>
          </div>
        </div>
      `).join('');

      // 生成建議的HTML
      const recommendationsHTML = recommendations.map((rec, index) => `
        <div style="background: rgba(255, 255, 255, 0.8); border-radius: 16px; padding: 24px; margin-bottom: 16px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
          <div style="display: flex; align-items: flex-start;">
            <div style="background: linear-gradient(to right, #3b82f6, #9333ea); color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 16px; flex-shrink: 0;">
              ${rec.number}
            </div>
            <div>
              <h4 style="font-weight: bold; color: #1f2937; margin-bottom: 12px;">${rec.title}</h4>
              <p style="color: #4b5563; line-height: 1.6;">${rec.content}</p>
            </div>
          </div>
        </div>
      `).join('');
      
      tempDiv.innerHTML = `
        <div style="padding: 32px; background: linear-gradient(to bottom right, #dbeafe, #e9d5ff, #d1fae5); min-height: 100vh;">
          <!-- 報告框架 -->
          <div style="background: white; border-radius: 24px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <!-- 報告頭部 -->
            <div style="background: linear-gradient(to right, #2563eb, #9333ea); color: white; padding: 32px; text-align: center;">
              <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <div style="width: 64px; height: 64px; background: white; border-radius: 8px; padding: 8px; margin-right: 16px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 32px;">❤️</span>
                </div>
                <div style="text-align: left;">
                  <h1 style="font-size: 30px; font-weight: bold; margin: 0;">Healixir</h1>
                  <p style="color: #ddd6fe; margin: 0;">智能保健顧問</p>
                </div>
              </div>
              <h2 style="font-size: 32px; font-weight: bold; margin-top: 24px;">健康評估報告</h2>
              <p style="color: #ddd6fe; margin-top: 8px;">報告生成日期：${new Date().toLocaleDateString('zh-TW')}</p>
            </div>

            <!-- 報告內容 -->
            <div style="padding: 32px;">
              <!-- 基本資料卡片 -->
              <div style="background: linear-gradient(to right, #dbeafe, #e9d5ff); border-radius: 16px; padding: 24px; margin-bottom: 32px; border: 1px solid #c7d2fe;">
                <h3 style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 16px;">基本資料</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; text-align: center;">
                  <div style="background: white; border-radius: 12px; padding: 16px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                    <p style="color: #6b7280; font-size: 14px; margin-bottom: 4px;">年齡</p>
                    <p style="font-size: 24px; font-weight: bold; color: #2563eb;">28</p>
                    <p style="color: #6b7280; font-size: 14px;">歲</p>
                  </div>
                  <div style="background: white; border-radius: 12px; padding: 16px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                    <p style="color: #6b7280; font-size: 14px; margin-bottom: 4px;">身高</p>
                    <p style="font-size: 24px; font-weight: bold; color: #9333ea;">170</p>
                    <p style="color: #6b7280; font-size: 14px;">公分</p>
                  </div>
                  <div style="background: white; border-radius: 12px; padding: 16px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                    <p style="color: #6b7280; font-size: 14px; margin-bottom: 4px;">體重</p>
                    <p style="font-size: 24px; font-weight: bold; color: #10b981;">61</p>
                    <p style="color: #6b7280; font-size: 14px;">公斤</p>
                  </div>
                </div>
              </div>

              <!-- 主要內容網格 -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
                <!-- 左側 - 健康分析 -->
                <div>
                  <!-- 綜合分析結果 -->
                  <div style="background: #f9fafb; border-radius: 16px; padding: 24px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 24px;">
                      <div>
                        <h3 style="font-size: 20px; font-weight: bold; color: #1f2937; display: flex; align-items: center; margin-bottom: 16px;">
                          <div style="width: 40px; height: 40px; background: linear-gradient(to right, #3b82f6, #9333ea); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                            <span style="color: white; font-size: 20px;">📊</span>
                          </div>
                          綜合分析結果
                        </h3>
                        <div style="font-size: 48px; font-weight: bold; background: linear-gradient(to right, #3b82f6, #9333ea); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">49分</div>
                      </div>
                      <div style="text-align: right;">
                        <div style="display: flex; align-items: center; color: #9333ea; margin-bottom: 8px;">
                          <span style="margin-right: 4px;">❤️</span>
                          <span style="font-weight: 600;">健康分析說明</span>
                        </div>
                        <p style="color: #6b7280; font-size: 14px; margin-bottom: 12px;">您的綜合健康分數超過</p>
                        <p style="font-size: 24px; font-weight: bold; color: #2563eb;">59% 的同齡人</p>
                      </div>
                    </div>
                    ${healthMetricsHTML}
                  </div>

                  <!-- BMI 卡片 -->
                  <div style="background: linear-gradient(to right, #10b981, #3b82f6); border-radius: 16px; padding: 24px; color: white; margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <p style="opacity: 0.9; margin-bottom: 4px;">您的身體質量指數為</p>
                        <p style="font-size: 24px; font-weight: bold;">21.1 kg/m²</p>
                        <p style="opacity: 0.9;">屬於正常範圍</p>
                      </div>
                      <div style="background: rgba(255, 255, 255, 0.9); border-radius: 12px; padding: 16px;">
                        <p style="color: #10b981; font-weight: bold; font-size: 18px;">BMI: 21.1</p>
                        <span style="color: #10b981; font-size: 14px; background: #d1fae5; padding: 4px 12px; border-radius: 9999px;">正常範圍</span>
                      </div>
                    </div>
                  </div>

                  <!-- 需要改善的領域 -->
                  <div style="background: linear-gradient(to right, #f97316, #ef4444); border-radius: 16px; padding: 24px; color: white;">
                    <h4 style="font-weight: bold; font-size: 18px; margin-bottom: 8px; display: flex; align-items: center;">
                      <div style="width: 32px; height: 32px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                        <span>⚠️</span>
                      </div>
                      需要改善的領域
                    </h4>
                    <p style="opacity: 0.9; margin-left: 44px;">心理和運動 方面需要特別關注</p>
                  </div>
                </div>

                <!-- 右側 - 建議 -->
                <div>
                  <h3 style="font-size: 24px; font-weight: bold; color: #1f2937; text-align: center; margin-bottom: 24px;">個人化健康建議</h3>
                  ${recommendationsHTML}
                </div>
              </div>

              <!-- 報告底部資訊 -->
              <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
                <p>本報告由 Healixir 智能健康評估系統生成</p>
                <p style="margin-top: 8px;">如有任何疑問，請諮詢專業醫療人員</p>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // 添加到頁面
      document.body.appendChild(tempDiv);
      
      // 等待一下讓樣式渲染
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 轉換為canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f3f4f6',
        width: 1200,
        height: tempDiv.scrollHeight,
        logging: false
      });
      
      // 移除臨時元素
      document.body.removeChild(tempDiv);
      
      // 創建PDF - A4大小
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // 計算圖片在PDF中的尺寸
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth * 25.4 / 96, pdfHeight / imgHeight * 25.4 / 96);
      
      // 將canvas轉為圖片並添加到PDF
      const imgData = canvas.toDataURL('image/png');
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;
      const x = (pdfWidth - finalWidth) / 2;
      const y = 0;
      
      // 如果內容超過一頁，需要分頁
      if (finalHeight > pdfHeight) {
        let position = 0;
        let pageHeight = imgHeight * pdfHeight / finalHeight;
        
        while (position < imgHeight) {
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = imgWidth;
          pageCanvas.height = Math.min(pageHeight, imgHeight - position);
          
          const pageCtx = pageCanvas.getContext('2d');
          pageCtx.drawImage(canvas, 0, -position);
          
          const pageData = pageCanvas.toDataURL('image/png');
          
          if (position > 0) {
            pdf.addPage();
          }
          
          pdf.addImage(pageData, 'PNG', x, y, finalWidth, pageCanvas.height * ratio);
          position += pageHeight;
        }
      } else {
        pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
      }
      
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
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 text-center">
  				<Link to="/nutrition/personal-info">
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