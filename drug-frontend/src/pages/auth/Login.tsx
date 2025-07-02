import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 登入成功，保存 token
        localStorage.setItem('token', data.access_token);
        console.log('Login successful, token saved');
        
        // 獲取用戶資訊
        try {
          const userResponse = await fetch('http://localhost:8000/auth/me', {
            headers: {
              'Authorization': `Bearer ${data.access_token}`,
            },
          });
          
          console.log('User API response status:', userResponse.status);
          
          if (userResponse.ok) {
            const userData = await userResponse.json();
            console.log('User data received:', userData);
            localStorage.setItem('user', JSON.stringify(userData));
            
            toast({
              title: "登入成功",
              description: `歡迎，${userData.name}！`,
            });
          } else {
            const errorData = await userResponse.json();
            console.error('User API error:', errorData);
            
            // 如果獲取用戶資訊失敗，使用 email 作為備用
            const fallbackUser = {
              email: email,
              name: email.split('@')[0]
            };
            localStorage.setItem('user', JSON.stringify(fallbackUser));
            
            toast({
              title: "登入成功",
              description: "歡迎回來！",
            });
          }
        } catch (userError) {
          console.error('Error fetching user data:', userError);
          
          // 使用 email 作為備用
          const fallbackUser = {
            email: email,
            name: email.split('@')[0]
          };
          localStorage.setItem('user', JSON.stringify(fallbackUser));
          
          toast({
            title: "登入成功",
            description: "歡迎回來！",
          });
        }
        
        navigate("/");
      } else {
        // 登入失敗
        console.error('Login failed:', data);
        toast({
          title: "登入失敗",
          description: data.detail || "請檢查您的郵箱和密碼",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "連接錯誤",
        description: "無法連接到伺服器，請稍後再試",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border-0">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/favicon.ico" 
              alt="Logo" 
              className="w-16 h-16 shadow-lg rounded-lg"
            />
          </div>
          <div className="mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Healixir
            </h1>
            <p className="text-xs text-gray-500">智能保健顧問</p>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">歡迎回來</CardTitle>
          <CardDescription className="text-gray-600">
            請登入您的帳戶，開始您的健康之旅
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                電子郵件
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="請輸入您的電子郵件"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/60 backdrop-blur-sm border-2 border-blue-200 focus:border-blue-400"
                  required
                  disabled={isLoading}
                />
              </div>  
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                密碼
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="請輸入您的密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/60 backdrop-blur-sm border-2 border-blue-200 focus:border-blue-400 pr-10"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "登入中..." : "登入"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              還沒有帳號？{" "}
              <Link to="/register" className="text-blue-600 hover:text-purple-600 hover:underline font-medium">
                立即註冊
              </Link>
            </div>

            <div className="text-center text-xs text-gray-500 mt-4 pt-4 border-t">
              登入即表示您同意我們的{" "}
              <Link to="/terms" className="text-blue-600 hover:text-purple-600 hover:underline">
                服務條款
              </Link>
              {" "}與{" "}
              <Link to="/privacy" className="text-blue-600 hover:text-purple-600 hover:underline">
                隱私政策
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;