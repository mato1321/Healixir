
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft,
  Calendar,
  FileText,
  Download,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const AssessmentDetail = () => {
  const { id } = useParams();

  // Mock data - 實際應用中會從API獲取
  const assessment = {
    id: id,
    date: "2024-06-20",
    type: "營養目標評估",
    status: "已完成",
    result: "個人化營養建議已生成",
    summary: {
      overallScore: 78,
      recommendations: [
        "建議增加維他命D3的攝取",
        "Omega-3脂肪酸需要補充",
        "維持目前的鈣質攝取量",
        "建議增加益生菌補充"
      ],
      riskFactors: [
        "維他命D不足可能影響骨骼健康",
        "缺乏Omega-3可能影響心血管健康"
      ],
      lifestyle: {
        exercise: "中等",
        sleep: "良好", 
        stress: "偏高",
        diet: "需改善"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 頂部導航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/member" className="inline-flex items-center text-blue-600 hover:text-blue-800 mr-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回會員中心
              </Link>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Healixir</h1>
            </div>
          </div>
        </div>
      </header>

      {/* 主要內容 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">健康評估詳細報告</h1>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{assessment.date}</span>
            <span className="ml-4 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {assessment.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要內容區域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 整體評分 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  整體健康評分
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {assessment.summary.overallScore}
                  </div>
                  <div className="text-gray-600">分 / 100分</div>
                  <div className="mt-4 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${assessment.summary.overallScore}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 個人化建議 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  個人化營養建議
                </CardTitle>
                <CardDescription>
                  根據您的健康狀況量身打造的建議
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assessment.summary.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span className="text-gray-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 風險因子 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                  需要注意的健康風險
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assessment.summary.riskFactors.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span className="text-gray-700">{risk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 側邊欄 */}
          <div className="space-y-6">
            {/* 生活習慣評估 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">生活習慣評估</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">運動習慣</span>
                  <span className="font-medium text-blue-600">{assessment.summary.lifestyle.exercise}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">睡眠品質</span>
                  <span className="font-medium text-green-600">{assessment.summary.lifestyle.sleep}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">壓力程度</span>
                  <span className="font-medium text-orange-600">{assessment.summary.lifestyle.stress}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">飲食習慣</span>
                  <span className="font-medium text-red-600">{assessment.summary.lifestyle.diet}</span>
                </div>
              </CardContent>
            </Card>

            {/* 操作按鈕 */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  下載完整報告
                </Button>
                <Link to="/nutrition/recommendations">
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    查看產品推薦
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssessmentDetail;
