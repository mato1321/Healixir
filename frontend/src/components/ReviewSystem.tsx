import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  productName: string;
  isLiked: boolean;
}

const ReviewSystem = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      userName: "張小美",
      rating: 5,
      comment: "維他命D3效果很好，服用一個月後感覺精神狀態明顯改善，骨骼也感覺更健康了。包裝很精美，服務態度也很棒！",
      date: "2024-06-15",
      likes: 12,
      productName: "維他命D3營養補充劑",
      isLiked: false
    },
    {
      id: 2,
      userName: "李先生",
      rating: 4,
      comment: "魚油品質不錯，沒有腥味，膠囊大小適中容易吞服。價格合理，會考慮回購。",
      date: "2024-06-10",
      likes: 8,
      productName: "Omega-3深海魚油",
      isLiked: true
    },
    {
      id: 3,
      userName: "王小姐",
      rating: 5,
      comment: "膠原蛋白粉溶解度很好，沒有怪味道。持續使用三週，皮膚確實變得比較有彈性，值得推薦！",
      date: "2024-06-08",
      likes: 15,
      productName: "膠原蛋白粉",
      isLiked: false
    }
  ]);

  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    productName: ""
  });

  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleStarClick = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = () => {
    if (newReview.rating > 0 && newReview.comment && newReview.productName) {
      const review: Review = {
        id: reviews.length + 1,
        userName: "我", // 在實際應用中會是登入用戶的名稱
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        productName: newReview.productName,
        isLiked: false
      };
      
      setReviews([review, ...reviews]);
      setNewReview({ rating: 0, comment: "", productName: "" });
      setShowReviewForm(false);
    }
  };

  const toggleLike = (reviewId: number) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            isLiked: !review.isLiked,
            likes: review.isLiked ? review.likes - 1 : review.likes + 1
          }
        : review
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          我的評論
        </h2>
        <Button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          寫評論
        </Button>
      </div>

      {/* 新增評論表單 */}
      {showReviewForm && (
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
              撰寫產品評論
            </CardTitle>
            <CardDescription className="text-gray-600">
              分享您使用產品的真實感受，幫助其他用戶做出更好的選擇
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                產品名稱
              </label>
              <input
                type="text"
                value={newReview.productName}
                onChange={(e) => setNewReview(prev => ({ ...prev, productName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/60 backdrop-blur-sm"
                placeholder="請輸入產品名稱"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                評分
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-8 h-8 cursor-pointer transition-all duration-200 hover:scale-110 ${
                      star <= newReview.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 hover:text-yellow-200"
                    }`}
                    onClick={() => handleStarClick(star)}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                評論內容
              </label>
              <Textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="請分享您的使用體驗..."
                rows={4}
                className="bg-white/60 backdrop-blur-sm border-gray-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={handleSubmitReview} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              >
                提交評論
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowReviewForm(false)}
                className="border-gray-300 hover:bg-gray-50"
              >
                取消
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 評論列表 */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">{review.userName}</h4>
                  <p className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                    {review.productName}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleLike(review.id)}
                  className={`transition-colors duration-200 ${
                    review.isLiked 
                      ? "text-blue-600 hover:text-blue-700 bg-blue-50" 
                      : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {review.likes}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {reviews.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">還沒有評論</h3>
            <p className="text-gray-400">成為第一個分享使用體驗的人吧！</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReviewSystem;