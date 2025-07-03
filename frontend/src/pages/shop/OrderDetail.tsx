
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft,
  Calendar,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Phone
} from "lucide-react";

const OrderDetail = () => {
  const { id } = useParams();

  // Mock data - 實際應用中會從API獲取
  const order = {
    id: id || "ORD-2024-001",
    date: "2024-06-25",
    status: "已發貨",
    total: "NT$ 2,580",
    items: [
      {
        name: "維他命D3膠囊",
        quantity: 2,
        price: "NT$ 890",
        image: "/placeholder.svg"
      },
      {
        name: "Omega-3魚油",
        quantity: 1,
        price: "NT$ 1,690",
        image: "/placeholder.svg"
      }
    ],
    shipping: {
      address: "台北市信義區松高路11號",
      method: "宅配",
      fee: "免運費",
      trackingNumber: "1234567890"
    },
    payment: {
      method: "信用卡",
      cardLast4: "1234",
      transactionId: "TXN-20240625-001"
    },
    timeline: [
      { status: "訂單成立", date: "2024-06-25 10:30", completed: true },
      { status: "付款確認", date: "2024-06-25 10:35", completed: true },
      { status: "商品出貨", date: "2024-06-26 14:20", completed: true },
      { status: "配送中", date: "2024-06-27 08:00", completed: false },
      { status: "已送達", date: "", completed: false }
    ]
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">訂單詳情</h1>
          <div className="flex items-center text-gray-600">
            <span className="font-medium">訂單編號：{order.id}</span>
            <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要內容區域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 商品清單 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  商品清單
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">數量：{item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-800">{item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>總計</span>
                    <span className="text-blue-600">{order.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 配送進度 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-blue-600" />
                  配送進度
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.timeline.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${
                        step.completed ? 'bg-blue-600' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          step.completed ? 'text-gray-800' : 'text-gray-500'
                        }`}>
                          {step.status}
                        </div>
                        {step.date && (
                          <div className="text-sm text-gray-500">{step.date}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {order.shipping.trackingNumber && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">物流追蹤號碼</div>
                    <div className="font-medium text-blue-600">{order.shipping.trackingNumber}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 側邊欄 */}
          <div className="space-y-6">
            {/* 配送資訊 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  配送資訊
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">配送地址</div>
                  <div className="font-medium">{order.shipping.address}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">配送方式</div>
                  <div className="font-medium">{order.shipping.method}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">運費</div>
                  <div className="font-medium text-green-600">{order.shipping.fee}</div>
                </div>
              </CardContent>
            </Card>

            {/* 付款資訊 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CreditCard className="w-5 h-5 mr-2" />
                  付款資訊
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">付款方式</div>
                  <div className="font-medium">{order.payment.method}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">卡號末四碼</div>
                  <div className="font-medium">**** {order.payment.cardLast4}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">交易編號</div>
                  <div className="font-medium text-xs">{order.payment.transactionId}</div>
                </div>
              </CardContent>
            </Card>

            {/* 聯絡客服 */}
            <Card>
              <CardContent className="p-4">
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  聯絡客服
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetail;
