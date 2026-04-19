'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 作物配置
const CROPS = [
  { id: 1, name: '核桃', identifier: 'hetao', harvestTime: 60, seedPrice: 100, fruitImage: '/images/hetaoshu.png' },
  { id: 2, name: '石榴', identifier: 'shiliu', harvestTime: 60, seedPrice: 100, fruitImage: '/images/shiliu.png' },
  { id: 3, name: '红枣', identifier: 'hongzao', harvestTime: 50, seedPrice: 100, fruitImage: '/images/guoshi.png' },
  { id: 4, name: '葡萄', identifier: 'putao', harvestTime: 50, seedPrice: 100, fruitImage: '/images/putao.png' },
  { id: 5, name: '哈密瓜', identifier: 'hamigua', harvestTime: 40, seedPrice: 100, fruitImage: '/images/hamigua.png' },
  { id: 6, name: '香梨', identifier: 'xiangli', harvestTime: 40, seedPrice: 100, fruitImage: '/images/xiangli.png' },
  { id: 7, name: '沙漠果', identifier: 'shamoguo', harvestTime: 20, seedPrice: 200, fruitImage: '/images/guoshi.png' },
  { id: 8, name: '人参果', identifier: 'renshenguo', harvestTime: 20, seedPrice: 200, fruitImage: '/images/guoshi2.png' },
];

interface LandData {
  status: number;      // -1=未开垦, 0=空地, 1=已种植
  cropId: number;      // 种植的作物ID
  plantTime: Date | null;
  stage: number;       // 0=种子, 1=发芽, 2=生长, 3=成熟
}

interface UserData {
  id: number;
  username: string;
  nickname: string;
  userlist: {
    gold: string;
    rmb: string;
    zs: string;
    lvl: number;
    zhongzi: number;
    hetao: string;
    shiliu: string;
    hongzao: string;
    putao: string;
    hamigua: string;
    xiangli: string;
    shamoguo: string;
    rensheuguo: string;
    tudi1: number;
    tudi2: number;
    tudi3: number;
    tudi4: number;
    tudi5: number;
    tudi6: number;
    tudi7: number;
    tudi8: number;
    tudi9: number;
    tudi10: number;
    tudi11: number;
    tudi12: number;
    zt1: string;
    zt2: string;
    zt3: string;
    zt4: string;
    zt5: string;
    zt6: string;
    zt7: string;
    zt8: string;
    zt9: string;
    zt10: string;
    zt11: string;
    zt12: string;
    kttime1: string | null;
    kttime2: string | null;
    kttime3: string | null;
    kttime4: string | null;
    kttime5: string | null;
    kttime6: string | null;
    kttime7: string | null;
    kttime8: string | null;
    kttime9: string | null;
    kttime10: string | null;
    kttime11: string | null;
    kttime12: string | null;
  };
}

export default function FarmPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [lands, setLands] = useState<LandData[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<number>(1);
  const [showShop, setShowShop] = useState(false);
  const [showStorage, setShowStorage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // 获取用户数据
  useEffect(() => {
    fetchUserData();
  }, []);

  // 定时刷新作物状态
  useEffect(() => {
    const timer = setInterval(() => {
      updateCropStages();
    }, 1000);
    return () => clearInterval(timer);
  }, [lands]);

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/auth/login');
      const data = await res.json();
      
      if (!data.success) {
        router.push('/');
        return;
      }
      
      setUser(data);
      initLands(data.userlist);
    } catch (error) {
      console.error('获取用户数据失败:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  // 初始化土地数据
  const initLands = (userlist: any) => {
    const landData: LandData[] = [];
    for (let i = 1; i <= 12; i++) {
      const status = userlist[`tudi${i}`] || 0;
      const zt = userlist[`zt${i}`] || '-1';
      const kttime = userlist[`kttime${i}`];
      
      let cropId = 0;
      let stage = 0;
      
      if (zt && zt !== '-1' && zt !== '0') {
        cropId = parseInt(zt);
        stage = 1;
      }
      
      landData.push({
        status: status === 1 ? 1 : -1,
        cropId,
        plantTime: kttime ? new Date(kttime) : null,
        stage
      });
    }
    setLands(landData);
  };

  // 更新作物阶段
  const updateCropStages = () => {
    setLands(prevLands => {
      return prevLands.map(land => {
        if (land.cropId === 0 || !land.plantTime) return land;
        
        const crop = CROPS.find(c => c.id === land.cropId);
        if (!crop) return land;
        
        const now = new Date();
        const elapsed = (now.getTime() - land.plantTime.getTime()) / 1000;
        const stageTime = crop.harvestTime * 60 / 4;
        
        let newStage = land.stage;
        if (elapsed >= stageTime * 3) newStage = 3;
        else if (elapsed >= stageTime * 2) newStage = 2;
        else if (elapsed >= stageTime) newStage = 1;
        
        return { ...land, stage: newStage };
      });
    });
  };

  // 开垦土地
  const openLand = async (index: number) => {
    try {
      const res = await fetch('/api/farm/open', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ landIndex: index })
      });
      
      const data = await res.json();
      if (data.success) {
        const newLands = [...lands];
        newLands[index] = { status: 1, cropId: 0, plantTime: null, stage: 0 };
        setLands(newLands);
        setUser(data.user);
        showMessage('开垦成功！');
      } else {
        showMessage(data.message || '开垦失败');
      }
    } catch (error) {
      showMessage('网络错误');
    }
  };

  // 种植作物
  const plantCrop = async (index: number) => {
    try {
      const res = await fetch('/api/farm/plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ landIndex: index, cropId: selectedCrop })
      });
      
      const data = await res.json();
      if (data.success) {
        const newLands = [...lands];
        newLands[index] = {
          status: 1,
          cropId: selectedCrop,
          plantTime: new Date(),
          stage: 0
        };
        setLands(newLands);
        setUser(data.user);
        showMessage('种植成功！');
      } else {
        showMessage(data.message || '种植失败');
      }
    } catch (error) {
      showMessage('网络错误');
    }
  };

  // 收获作物
  const harvestCrop = async (index: number) => {
    if (lands[index].stage !== 3) {
      showMessage('作物还未成熟');
      return;
    }
    
    try {
      const res = await fetch('/api/farm/harvest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ landIndex: index })
      });
      
      const data = await res.json();
      if (data.success) {
        const newLands = [...lands];
        newLands[index] = { status: 1, cropId: 0, plantTime: null, stage: 0 };
        setLands(newLands);
        setUser(data.user);
        showMessage(`收获成功！获得 ${data.fruitCount} 个果实`);
      } else {
        showMessage(data.message || '收获失败');
      }
    } catch (error) {
      showMessage('网络错误');
    }
  };

  // 退出登录
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <img src="/images/jiazai.gif" alt="加载中..." className="loading-gif" />
      </div>
    );
  }

  return (
    <div className="farm-container">
      {/* 顶部信息栏 */}
      <div className="top-bar">
        <div className="user-info">
          <img src="/images/user.jpg" alt="头像" className="avatar" />
          <div className="user-details">
            <span className="nickname">{user?.nickname || user?.username}</span>
            <span className="level">Lv.{user?.userlist?.lvl || 1}</span>
          </div>
        </div>
        <div className="resources">
          <div className="resource-item">
            <img src="/images/jinpai.png" alt="金币" />
            <span>{user?.userlist?.gold || '0'}</span>
          </div>
          <div className="resource-item">
            <img src="/images/zhibaoshi.png" alt="钻石" />
            <span>{user?.userlist?.zs || '0'}</span>
          </div>
        </div>
        <div className="top-buttons">
          <button onClick={() => setShowShop(true)} className="btn-shop">
            <img src="/images/daoju.png" alt="商店" />
          </button>
          <button onClick={() => setShowStorage(true)} className="btn-storage">
            <img src="/images/fangwushengji.png" alt="仓库" />
          </button>
          <button onClick={handleLogout} className="btn-logout">
            <img src="/images/tuichu.png" alt="退出" />
          </button>
        </div>
      </div>

      {/* 农田区域 */}
      <div className="farm-land-container">
        <div className="farm-land">
          {lands.map((land, index) => (
            <div
              key={index}
              className={`land-cell ${land.status === -1 ? 'locked' : ''}`}
              onClick={() => {
                if (land.status === -1) {
                  openLand(index);
                } else if (land.cropId === 0) {
                  plantCrop(index);
                } else if (land.stage === 3) {
                  harvestCrop(index);
                }
              }}
            >
              {land.status === -1 ? (
                <div className="land-locked">
                  <img src="/images/zw.png" alt="未开垦" />
                  <span>开垦</span>
                </div>
              ) : land.cropId === 0 ? (
                <div className="land-empty">
                  <img src="/images/zacao.png" alt="空地" />
                </div>
              ) : (
                <div className={`land-crop stage-${land.stage}`}>
                  <img
                    src={land.stage === 3 ? CROPS.find(c => c.id === land.cropId)?.fruitImage : '/images/bozhong.png'}
                    alt="作物"
                    className={land.stage === 3 ? 'crop-mature' : ''}
                  />
                  {land.stage === 3 && <div className="harvest-hint">点击收获</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 底部工具栏 */}
      <div className="bottom-bar">
        <div className="crop-selector">
          <span style={{ color: '#fff' }}>选择种子:</span>
          <div className="crop-list">
            {CROPS.map(crop => (
              <div
                key={crop.id}
                className={`crop-item ${selectedCrop === crop.id ? 'selected' : ''}`}
                onClick={() => setSelectedCrop(crop.id)}
              >
                <img src={crop.fruitImage} alt={crop.name} />
                <span>{crop.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 消息提示 */}
      {message && (
        <div className="message-toast">
          {message}
        </div>
      )}

      {/* 商店弹窗 */}
      {showShop && (
        <div className="modal-overlay" onClick={() => setShowShop(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>商店</h2>
            <div className="shop-items">
              <div className="shop-item">
                <img src="/images/jinpai.png" alt="金币" />
                <span>金币 x 10000</span>
                <span>¥10</span>
              </div>
              <div className="shop-item">
                <img src="/images/zhibaoshi.png" alt="钻石" />
                <span>钻石 x 100</span>
                <span>¥10</span>
              </div>
            </div>
            <button onClick={() => setShowShop(false)}>关闭</button>
          </div>
        </div>
      )}

      {/* 仓库弹窗 */}
      {showStorage && user?.userlist && (
        <div className="modal-overlay" onClick={() => setShowStorage(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>仓库</h2>
            <div className="storage-items">
              <div className="storage-item">
                <img src="/images/hetaoshu.png" alt="核桃" />
                <span>核桃: {user.userlist.hetao || '0'}</span>
              </div>
              <div className="storage-item">
                <img src="/images/shiliu.png" alt="石榴" />
                <span>石榴: {user.userlist.shiliu || '0'}</span>
              </div>
              <div className="storage-item">
                <img src="/images/guoshi.png" alt="红枣" />
                <span>红枣: {user.userlist.hongzao || '0'}</span>
              </div>
              <div className="storage-item">
                <img src="/images/putao.png" alt="葡萄" />
                <span>葡萄: {user.userlist.putao || '0'}</span>
              </div>
            </div>
            <button onClick={() => setShowStorage(false)}>关闭</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .farm-container {
          width: 100%;
          min-height: 100vh;
          background: url('/images/beijing.png') center top / cover no-repeat;
          display: flex;
          flex-direction: column;
        }
        
        .loading-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url('/images/beijing.png') center / cover;
        }
        
        .loading-gif {
          width: 80px;
          height: 80px;
        }
        
        .top-bar {
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid #FFD700;
        }
        
        .user-details {
          display: flex;
          flex-direction: column;
        }
        
        .nickname {
          color: #fff;
          font-size: 16px;
          font-weight: bold;
        }
        
        .level {
          font-size: 12px;
          color: #FFD700;
        }
        
        .resources {
          display: flex;
          gap: 15px;
        }
        
        .resource-item {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(0,0,0,0.3);
          padding: 5px 10px;
          border-radius: 15px;
          color: #fff;
          font-size: 14px;
        }
        
        .resource-item img {
          width: 20px;
          height: 20px;
        }
        
        .top-buttons {
          display: flex;
          gap: 10px;
        }
        
        .top-buttons button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        
        .top-buttons img {
          width: 35px;
          height: 35px;
        }
        
        .farm-land-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .farm-land {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          max-width: 400px;
        }
        
        .land-cell {
          width: 80px;
          height: 80px;
          background: #8B4513;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #654321;
          transition: transform 0.2s;
          position: relative;
        }
        
        .land-cell:hover {
          transform: scale(1.05);
        }
        
        .land-cell.locked {
          background: #666;
          border-color: #444;
        }
        
        .land-locked, .land-empty, .land-crop {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        
        .land-locked img, .land-empty img, .land-crop img {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }
        
        .land-locked span {
          color: #fff;
          font-size: 12px;
          margin-top: 5px;
        }
        
        .crop-mature {
          animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .harvest-hint {
          position: absolute;
          bottom: 5px;
          font-size: 10px;
          color: #fff;
          background: rgba(255,0,0,0.7);
          padding: 2px 5px;
          border-radius: 5px;
        }
        
        .bottom-bar {
          padding: 15px;
          background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
        }
        
        .crop-selector {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
        }
        
        .crop-list {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 5px;
        }
        
        .crop-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 5px;
          border-radius: 10px;
          background: rgba(255,255,255,0.2);
          min-width: 60px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .crop-item.selected {
          background: rgba(255,215,0,0.5);
          border: 2px solid #FFD700;
        }
        
        .crop-item img {
          width: 30px;
          height: 30px;
        }
        
        .crop-item span {
          font-size: 10px;
          color: #fff;
        }
        
        .message-toast {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0,0,0,0.8);
          color: #fff;
          padding: 15px 30px;
          border-radius: 10px;
          z-index: 1000;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }
        
        .modal-content {
          background: #fff;
          border-radius: 15px;
          padding: 20px;
          width: 90%;
          max-width: 400px;
        }
        
        .modal-content h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #6c3011;
        }
        
        .shop-items, .storage-items {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .shop-item, .storage-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
          background: #f5f5f5;
          border-radius: 10px;
        }
        
        .shop-item img, .storage-item img {
          width: 40px;
          height: 40px;
          margin-bottom: 5px;
        }
        
        .modal-content button {
          width: 100%;
          padding: 12px;
          background: #FF6600;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
