from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from typing import Any, Dict

# 創建基礎類
Base = declarative_base()

class BaseModel(Base):
    """
    所有模型的基礎類
    提供共同的方法，不包含額外欄位
    因為現有資料庫結構已經確定
    """
    __abstract__ = True
    
    def to_dict(self) -> Dict[str, Any]:
        """
        將模型轉換為字典
        方便序列化和API回傳
        """
        result = {}
        for column in self.__table__.columns:
            value = getattr(self, column.name)
            # 處理日期時間格式
            if isinstance(value, datetime):
                result[column.name] = value.isoformat()
            else:
                result[column.name] = value
        return result
    
    def update_from_dict(self, data: Dict[str, Any]) -> None:
        """
        從字典更新模型屬性
        用於更新操作
        """
        for key, value in data.items():
            if hasattr(self, key) and key != 'email':  # 不允許更新主鍵email
                setattr(self, key, value)
    
    def __repr__(self) -> str:
        """
        模型的字串表示
        方便除錯
        """
        class_name = self.__class__.__name__
        # 使用email作為識別符（因為它是主鍵）
        email = getattr(self, 'email', 'unknown')
        return f"<{class_name}(email={email})>"