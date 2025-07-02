import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";

const RecommendationReport = () => {
  const recommendations = [
    {
      category: "飲食方面",
      title: "建議：",
      content: "您已有不錯的飲食習慣，建議請持續三餐均衡飲食，多重補充天然蔬果攝取營養，並避免過多的快餐與高油加工食品。"
    },
    {
      category: "心理方面",
      title: "建議：",
      content: "心理壓力較敏感，建議定期進行放鬆練習，如冥想、深呼吸、寫日記，或尋找讓您放心交流的朋友。若壓力持續過重，也可考慮尋求專業心理諮詢。"
    },
    {
      category: "作息方面",
      title: "建議：",
      content: "作息健康程度良好，請維持規律的作息時間，每晚獲得充足的7-9小時睡眠，並盡量在晚上11點前入睡，幫助身體修復和新陳代謝。"
    },
    {
      category: "體質方面",
      title: "建議：",
      content: "整體體質維持良好，請繼續持續均衡的營養攝取與適度運動，如每週進行至少3次的有氧運動，有助於提升免疫力與身體機能。"
    },
    {
      category: "運動方面",
      title: "建議：",
      content: "運動量明顯不足，建議每天從10-15分鐘的基礎運動開始，逐步增加強度。可以選擇快走、瑜伽、健身等您喜愛的運動，循序漸進增進身體健康和活力。"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/favicon.ico" 
                alt="Logo" 
                className="w-12 h-12 mr-3"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Healixir
              </h1>
            </Link>
          </div>
        </div>
        
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-blue-600 mr-2" />
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI 個人化健康建議
              </CardTitle>
            </div>
            <p className="text-gray-600 text-lg mt-2">
              根據您的問卷回答，我們為您制定了專屬的健康改善方案
            </p>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {rec.category}
                        </span>
                        <span className="ml-2 text-gray-700 font-medium">{rec.title}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{rec.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <p className="text-blue-800 font-bold text-lg mb-2">
                  如果生活的改變對您來說十分困難，沒關係！我們懂您的難處！
                </p>
                <p className="text-blue-700">
                  下面推薦您的這些保健食品也能夠改善您的問題！
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-8 justify-center">
              <Link to="/nutrition/analysis">
                <Button variant="outline" className="w-full sm:w-64 py-6 border-2 border-blue-300 text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5 mr-1" />返回健康分析結果
                </Button>
              </Link>
              <Link to="/nutrition/products">
                <Button className="w-full sm:w-64 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  查看推薦產品
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecommendationReport;