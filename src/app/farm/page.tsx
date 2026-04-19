'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import './farm.css';

interface UserlistData {
  gold: string;
  rmb: string;
  zs: string;
  lvl: number;
  zhongzi: number;
  fangwu: number;  // 房屋等级
  bg1: number;     // 背景1解锁状态
  bg2: number;     // 背景2解锁状态
  bg3: number;     // 背景3解锁状态
  hetao: string;
  shiliu: string;
  hongzao: string;
  putao: string;
  hamigua: string;
  xiangli: string;
  shamoguo: string;
  rensheuguo: string;
  muban: string;
  shitou: string;
  tudi1: number; tudi2: number; tudi3: number; tudi4: number;
  tudi5: number; tudi6: number; tudi7: number; tudi8: number;
  tudi9: number; tudi10: number; tudi11: number; tudi12: number;
  zt1: string; zt2: string; zt3: string; zt4: string;
  zt5: string; zt6: string; zt7: string; zt8: string;
  zt9: string; zt10: string; zt11: string; zt12: string;
  kttime1: string | null; kttime2: string | null; kttime3: string | null;
  kttime4: string | null; kttime5: string | null; kttime6: string | null;
  kttime7: string | null; kttime8: string | null; kttime9: string | null;
  kttime10: string | null; kttime11: string | null; kttime12: string | null;
  [key: string]: any;
}

interface UserData {
  id: number;
  username: string;
  nickname: string;
  userlist: UserlistData | null;
}

// 土地等级配置
const LAND_LEVELS = [
  { level: 1, name: '戈壁滩', img: '593f8d21643ec.png', output: '核桃 + 石榴 + 红枣 + 葡萄' },
  { level: 2, name: '盐碱地', img: '593f8d21643ec.png', output: '核桃 + 石榴 + 红枣 + 葡萄' },
  { level: 3, name: '胶泥地', img: '593f8dd6dbb6f.png', output: '核桃 + 石榴 + 红枣 + 葡萄 + 哈密瓜 + 香梨' },
  { level: 4, name: '金沙地', img: '593f8df0db170.png', output: '全部作物' },
];

export default function FarmPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLand, setActiveLand] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [jiansheTab, setJiansheTab] = useState(0); // 0: 房屋升级, 1: 土地升级
  const [selectedLandLevel, setSelectedLandLevel] = useState<number | null>(null); // 选中的土地等级
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  
  // 底部按钮展开状态
  const [leftExpanded, setLeftExpanded] = useState(true); // true = 收起, false = 展开
  const [rightExpanded, setRightExpanded] = useState(true); // true = 收起, false = 展开
  
  // 按钮激活状态
  const [activeLeftBtn, setActiveLeftBtn] = useState<number | null>(null);
  const [activeRightBtn, setActiveRightBtn] = useState<number | null>(null);
  
  // 签到相关状态
  const [signData, setSignData] = useState<{
    hasSignedToday: boolean;
    continuousDays: number;
    nextReward: { gold: number; diamond: number };
    calendar: Array<{
      day: number;
      date: number;
      gold: number;
      diamond: number;
      signed: boolean;
      isToday: boolean;
    }>;
    totalGold: number;
    totalDiamond: number;
  } | null>(null);
  const [signLoading, setSignLoading] = useState(false);

  // 设置 rem 单位和引入 CSS
  useEffect(() => {
    // 设置 rem 单位
    const setRem = () => {
      const clientWidth = document.documentElement.clientWidth;
      if (clientWidth) {
        document.documentElement.style.fontSize = 100 * (clientWidth / 750) + 'px';
      }
    };
    
    setRem();
    window.addEventListener('resize', setRem);
    window.addEventListener('orientationchange', setRem);
    
    // 动态加载 CSS
    const loadCSS = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };
    
    loadCSS('/css/public.css');
    loadCSS('/css/animate.min.css');
    
    return () => {
      window.removeEventListener('resize', setRem);
      window.removeEventListener('orientationchange', setRem);
    };
  }, []);

  // 获取用户数据
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/auth/login');
      const data = await res.json();
      
      if (!data.success) {
        router.push('/');
        return;
      }
      
      if (!data.userlist) {
        data.userlist = createDefaultUserlist();
      }
      
      setUser(data);
      console.log('用户数据:', data);
    } catch (error) {
      console.error('获取用户数据失败:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const createDefaultUserlist = (): UserlistData => {
    const data: any = {
      gold: '1000', zs: '10', rmb: '0', lvl: 1, zhongzi: 5, fangwu: 1,
      bg1: 1, bg2: 0, bg3: 0,
      hetao: '0', shiliu: '0', hongzao: '0', putao: '0',
      hamigua: '0', xiangli: '0', shamoguo: '0', rensheuguo: '0',
      muban: '0', shitou: '0',
    };
    for (let i = 1; i <= 12; i++) {
      data[`tudi${i}`] = i === 1 ? 1 : 0;
      data[`zt${i}`] = i === 1 ? '0' : '-1';
      data[`kttime${i}`] = null;
    }
    return data;
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const handleLandClick = (index: number) => {
    const tudi = user?.userlist?.[`tudi${index}`];
    const zt = user?.userlist?.[`zt${index}`];
    
    // 未开垦的土地（tudi = 0 或 zt = -1）
    if (tudi === 0 || zt === '-1') {
      setSelectedLandLevel(1); // 默认选中第一级土地升级
      setJiansheTab(1); // 切换到土地升级tab
      setShowModal('jianshe');
      return;
    }
    
    // 已开垦的土地，切换操作按钮
    setActiveLand(activeLand === index ? null : index);
  };

  const handleBigHouseClick = () => {
    setJiansheTab(0); // 默认显示房屋升级tab
    setShowModal('jianshe');
  };

  // 获取房屋等级
  const getFangwu = () => {
    return user?.userlist?.fangwu || 1;
  };

  // 计算升级房屋所需材料
  const getHouseUpgradeCost = () => {
    const lvl = getFangwu();
    return {
      muban: lvl * 30,
      shitou: lvl * 30,
      zs: lvl * 10,
    };
  };

  // 显示提示消息
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  // 房屋升级
  const handleHouseUpgrade = async () => {
    const cost = getHouseUpgradeCost();
    const muban = parseInt(user?.userlist?.muban || '0');
    const shitou = parseInt(user?.userlist?.shitou || '0');
    const zs = parseInt(user?.userlist?.zs || '0');
    
    if (muban < cost.muban || shitou < cost.shitou || zs < cost.zs) {
      showToast('材料不足，无法升级！', 'error');
      return;
    }
    
    try {
      const res = await fetch('/api/farm/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'house' }),
      });
      const data = await res.json();
      
      if (data.success) {
        showToast('房屋升级成功！');
        fetchUserData();
        setTimeout(() => setShowModal(null), 1500);
      } else {
        showToast(data.message || '升级失败', 'error');
      }
    } catch (error) {
      showToast('升级失败，请重试', 'error');
    }
  };

  // 土地升级
  const handleLandUpgrade = async (landLevel: number) => {
    try {
      const res = await fetch('/api/farm/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'land', level: landLevel }),
      });
      const data = await res.json();
      
      if (data.success) {
        showToast('土地升级成功！');
        fetchUserData();
        setTimeout(() => setShowModal(null), 1500);
      } else {
        showToast(data.message || '升级失败', 'error');
      }
    } catch (error) {
      showToast('升级失败，请重试', 'error');
    }
  };

  // 获取下一个需要开垦的土地编号
  const getNextLandToUnlock = () => {
    for (let i = 1; i <= 12; i++) {
      const tudi = user?.userlist?.[`tudi${i}`];
      if (tudi === 0) return i;
    }
    return null;
  };

  // 获取签到状态
  const fetchSignData = async () => {
    try {
      const res = await fetch('/api/farm/sign');
      const data = await res.json();
      if (data.success) {
        setSignData(data.data);
      }
    } catch (error) {
      console.error('获取签到状态失败:', error);
    }
  };

  // 执行签到
  const handleSign = async () => {
    if (signLoading || signData?.hasSignedToday) return;
    
    setSignLoading(true);
    try {
      const res = await fetch('/api/farm/sign', { method: 'POST' });
      const data = await res.json();
      
      if (data.success) {
        showToast(`签到成功！获得 ${data.data.gold} 金币${data.data.diamond > 0 ? ` 和 ${data.data.diamond} 钻石` : ''}`);
        fetchSignData();
        fetchUserData();
      } else {
        showToast(data.message || '签到失败', 'error');
      }
    } catch (error) {
      showToast('签到失败，请重试', 'error');
    } finally {
      setSignLoading(false);
    }
  };

  // 打开签到弹窗
  const openSignModal = () => {
    fetchSignData();
    setShowModal('qiandao');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <img src="/images/jiazai.gif" alt="加载中..." className="loading-gif" />
      </div>
    );
  }

  const houseCost = getHouseUpgradeCost();
  const nextLandToUnlock = getNextLandToUnlock();

  return (
    <>
      {/* 整体背景图 */}
      <div 
        className="farm-background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: user?.userlist?.bg1 ? 'url(/bg/bg1.jpg)' :
                     user?.userlist?.bg2 ? 'url(/bg/bg2.jpg)' :
                     user?.userlist?.bg3 ? 'url(/bg/bg3.jpg)' :
                     'url(/bg/bg1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      ></div>
    
      <div id="load" style={{ display: 'none' }}>
        <img src="/picture/jiazai.gif" alt="" />
      </div>
      
      <div className="sicoZhezhao"></div>
      <div id="mengban" style={{ display: 'none' }}></div>
      
      {/* 大房子 - 点击显示升级弹窗 */}
      <div 
        className="BigHouse animated" 
        style={{ 
          background: `url(/images/house_list/${getFangwu()}.png)`,
          backgroundSize: 'cover',
          cursor: 'pointer',
        }}
        onClick={handleBigHouseClick}
      ></div>
      {/* 小房子 */}
      <div className="SmallHouse animated" style={{ cursor: 'pointer' }} onClick={() => setShowModal('chongwu')}></div>

      {/* 页面左下角按钮 */}
      <div 
        className="footerLeft" 
        style={{ transform: leftExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
      >
        <div 
          className="leftBtn1" 
          style={{ background: activeLeftBtn === 1 ? 'url(/images/1.png)' : undefined, backgroundSize: 'cover' }}
          onTouchStart={() => setActiveLeftBtn(1)}
          onTouchEnd={() => { setActiveLeftBtn(null); setShowModal('cangku'); }}
          onClick={() => setShowModal('cangku')}
        ></div>
        <div 
          className="leftBtn2"
          style={{ background: activeLeftBtn === 2 ? 'url(/images/2.png)' : undefined, backgroundSize: 'cover' }}
          onTouchStart={() => setActiveLeftBtn(2)}
          onTouchEnd={() => { setActiveLeftBtn(null); setShowModal('duihuan'); }}
          onClick={() => setShowModal('duihuan')}
        ></div>
        <div 
          className="leftBtn3"
          style={{ background: activeLeftBtn === 3 ? 'url(/images/3.png)' : undefined, backgroundSize: 'cover' }}
          onTouchStart={() => setActiveLeftBtn(3)}
          onTouchEnd={() => { setActiveLeftBtn(null); setShowModal('shangdian'); }}
          onClick={() => setShowModal('shangdian')}
        ></div>
        <div 
          className="leftBtn4"
          style={{ background: activeLeftBtn === 4 ? 'url(/images/4.png)' : undefined, backgroundSize: 'cover' }}
          onTouchStart={() => setActiveLeftBtn(4)}
          onTouchEnd={() => { setActiveLeftBtn(null); setJiansheTab(0); setShowModal('jianshe'); }}
          onClick={() => { setJiansheTab(0); setShowModal('jianshe'); }}
        ></div>
      </div>
      <div 
        id="footerLeftBtn" 
        onClick={() => setLeftExpanded(!leftExpanded)}
        style={{ cursor: 'pointer' }}
      ></div>

      {/* 页面右下角按钮 */}
      <div 
        className="footerRight"
        style={{ transform: rightExpanded ? 'rotate(-90deg)' : 'rotate(0deg)' }}
      >
        <div 
          className="rightBtn1"
          style={{ background: activeRightBtn === 1 ? 'url(/images/6.png)' : undefined, backgroundSize: 'cover' }}
          onTouchStart={() => setActiveRightBtn(1)}
          onTouchEnd={() => { setActiveRightBtn(null); setShowModal('rizhi'); }}
          onClick={() => setShowModal('rizhi')}
        ></div>
        <div 
          className="rightBtn2"
          style={{ background: activeRightBtn === 2 ? 'url(/images/7.png)' : undefined, backgroundSize: 'cover' }}
          onTouchStart={() => setActiveRightBtn(2)}
          onTouchEnd={() => { setActiveRightBtn(null); setShowModal('paihang'); }}
          onClick={() => setShowModal('paihang')}
        ></div>
        <div 
          className="rightBtn3"
          style={{ background: activeRightBtn === 3 ? 'url(/images/8.png)' : undefined, backgroundSize: 'cover' }}
          onTouchStart={() => setActiveRightBtn(3)}
          onTouchEnd={() => { setActiveRightBtn(null); setShowModal('shezhi'); }}
          onClick={() => setShowModal('shezhi')}
        ></div>
        <div 
          className="rightBtn4"
          style={{ background: activeRightBtn === 4 ? 'url(/images/9.png)' : undefined, backgroundSize: 'cover' }}
          onTouchStart={() => setActiveRightBtn(4)}
          onTouchEnd={() => { setActiveRightBtn(null); setShowModal('chongwu'); }}
          onClick={() => setShowModal('chongwu')}
        ></div>
      </div>
      <div 
        id="footerRightBtn"
        onClick={() => setRightExpanded(!rightExpanded)}
        style={{ cursor: 'pointer' }}
      ></div>

      {/* 个人左上角按钮 */}
      <div className="gerenBox">
        <img src="/picture/bj.jpg" className="animated" alt="头像" />
        <div className="grBtn1 animated" onClick={() => setShowModal('geren')}></div>
        <div className="grBtn2 animated" onClick={() => setShowModal('chongzhi')}></div>
        <div className="grBtn3 animated" onClick={() => setShowModal('paihang')}></div>
        <div className="grBtn4 animated" onClick={handleLogout}></div>
        <p>黄金家园</p>
        <p>{user?.username}</p>
        <p id="lvl">{user?.userlist?.lvl || 1}</p>
      </div>

      {/* 签到 */}
      <div className="qiandao animated pulse infinite" onClick={openSignModal}></div>

      {/* 右上角信息 */}
      <div className="rightTop">
        <p id="memberGoldTop">{user?.userlist?.gold || '0'}</p>
        <p id="memberDiamondTop">{user?.userlist?.zs || '0'}</p>
      </div>

      {/* 土地区域 */}
      <div style={{ width: '100%', height: '6rem' }}></div>
      
      <div className="easteBox">
        <ul className="easte">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
            const tudi = user?.userlist?.[`tudi${i}`];
            const zt = user?.userlist?.[`zt${i}`];
            const isActive = activeLand === i;
            
            // 根据土地等级显示对应图片
            const tudiImage = tudi || 0;
            const canOperate = zt !== '-1' && tudi > 0;
            const isUnlocked = tudi > 0;
            
            return (
              <li 
                key={i} 
                style={{ 
                  background: `url(/images/tudi/tudi${tudiImage}.png)`, 
                  backgroundSize: 'cover' 
                }}
                onClick={() => handleLandClick(i)}
              >
                <div className="opacity"></div>
                {isUnlocked && (
                  <>
                    <img style={{ opacity: 0 }} className="zuowu" alt="" />
                    <img src="/picture/chongzi.png" style={{ display: 'none' }} className="chongzi" alt="" />
                    <img src="/picture/water.png" style={{ display: 'none' }} className="water" alt="" />
                    <img src="/picture/zacao.png" style={{ display: 'none' }} className="zacao" alt="" />
                    
                    {isActive && canOperate && (
                      <>
                        <img src="/picture/bozhong.png" className="caozuoBtn animated bozhongBtn" alt="播种" />
                        <img src="/picture/chanchu.png" className="caozuoBtn animated chanchuBtn" alt="铲除" />
                        <img src="/picture/jiaoshui.png" className="caozuoBtn animated jiaoshuiBtn" alt="浇水" />
                        <img src="/picture/shifei.png" className="caozuoBtn animated shifeiBtn" alt="施肥" />
                        <img src="/picture/shouge.png" className="caozuoBtn animated shougeBtn" alt="收割" />
                        <img src="/picture/xinxi.png" className="caozuoBtn animated xinxiBtn" alt="信息" />
                        <img src="/picture/qingli.png" className="caozuoBtn animated qingliBtn" alt="清理" />
                        <img src="/picture/chucao.png" className="caozuoBtn animated chucaoBtn" alt="除草" />
                        <img src="/picture/chuchong.png" className="caozuoBtn animated chuchongBtn" alt="除虫" />
                      </>
                    )}
                  </>
                )}
                <input type="hidden" value={i} />
              </li>
            );
          })}
        </ul>
      </div>

      {/* 四个雕像 */}
      <div className="diaoxiang1">
        <div className="diaoxiangBox" style={{ left: '-0.7rem' }}>
          <p style={{ color: '#ff0000' }}>丰收神像</p>
          <p>最大限度提升土地产量</p>
          <div style={{ width: '100%', height: '0.05rem' }}></div>
          <div className="dxjindu"><div id="sx1">未激活</div></div>
        </div>
      </div>
      <div className="diaoxiang2">
        <div className="diaoxiangBox" style={{ left: '-0.7rem' }}>
          <p style={{ color: '#ff0000' }}>雨露神像</p>
          <p>避免干旱</p>
          <div style={{ width: '100%', height: '0.05rem' }}></div>
          <div className="dxjindu"><div id="sx2">未激活</div></div>
        </div>
      </div>
      <div className="diaoxiang3">
        <div className="diaoxiangBox" style={{ left: '-0.7rem' }}>
          <p style={{ color: '#ff0000' }}>弑草神像</p>
          <p>免受杂草侵袭</p>
          <div style={{ width: '100%', height: '0.05rem' }}></div>
          <div className="dxjindu"><div id="sx3">未激活</div></div>
        </div>
      </div>
      <div className="diaoxiang4">
        <div className="diaoxiangBox">
          <p style={{ color: '#ff0000' }}>屠虫之神</p>
          <p>避免虫害</p>
          <div style={{ width: '100%', height: '0.05rem' }}></div>
          <div className="dxjindu"><div id="sx4">未激活</div></div>
        </div>
      </div>

      {/* 遮罩 */}
      <div className="shade" style={{ display: showModal ? 'block' : 'none' }} onClick={() => setShowModal(null)}></div>

      {/* 提示消息 */}
      {toastMessage && (
        <div 
          className={`duihuan_${toastType === 'success' ? 'chenggong' : 'shibai'} animated`}
          style={{ display: 'block' }}
        >
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 建设/升级弹窗 - 房屋升级和土地升级 */}
      {showModal === 'jianshe' && (
        <div className="jiansheBox animated" style={{ display: 'block' }}>
          <div className="remove animated" onClick={(e) => { e.stopPropagation(); setShowModal(null); }}></div>
          
          {/* Tab切换按钮 */}
          <ul className="jiansheTop">
            <li className="animated" onClick={(e) => { e.stopPropagation(); setJiansheTab(0); }}>
              <img src="/picture/fangwushengji.png" alt="房屋升级" style={{ display: jiansheTab === 0 ? 'none' : 'block' }} />
              <img src="/picture/fangwushengji2.png" alt="房屋升级" style={{ display: jiansheTab === 0 ? 'block' : 'none' }} />
            </li>
            <li className="animated" onClick={(e) => { e.stopPropagation(); setJiansheTab(1); }}>
              <img src="/picture/tdsj.png" alt="土地升级" style={{ display: jiansheTab === 1 ? 'none' : 'block' }} />
              <img src="/picture/tdsj2.png" alt="土地升级" style={{ display: jiansheTab === 1 ? 'block' : 'none' }} />
            </li>
          </ul>
          
          <ul className="jiansheBot">
            {/* 房屋升级 Tab */}
            <li className="houseInfo" style={{ display: jiansheTab === 0 ? 'block' : 'none' }}>
              <div className="gongyongList houseLevel">
                <div className="dhImgLeft" style={{ background: 'url(/images/fangzi.png)', backgroundSize: 'cover' }}>
                  <div className="diaoxiangBox" style={{ left: '1rem', top: '-0.2rem', color: '#512905' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '0.3rem', color: '#512905', textAlign: 'center', margin: '0.1rem 0rem' }}>房屋</p>
                    <p style={{ fontSize: '0.2rem', color: '#512905' }}>房屋等级每提升1级, 将获得1块新土地</p>
                  </div>
                </div>
                <div className="tudiName">
                  <img src="/picture/gebitan.png" alt="" />
                  <p style={{ textAlign: 'center', width: '1.57rem' }}>{getFangwu() + 1}级房屋</p>
                </div>
                
                {/* 升级按钮 */}
                <div 
                  className="tudishengji animated" 
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => { e.stopPropagation(); handleHouseUpgrade(); }}
                ></div>
                
                {/* 材料需求 */}
                <div className="shuiguo1 fT">
                  <img src="/images/593f8c9c2b7e3.png" alt="木板" />
                  <span className="muban">{user?.userlist?.muban || '0'}</span>
                  <div className="shuoguoNum">{houseCost.muban}</div>
                </div>
                
                <div className="shuiguoJiaJia sTUpLevelJiafu">+</div>
                
                <div className="shuiguo1 sT" style={{ left: '2.2rem' }}>
                  <img src="/images/593f86206e8d9.png" alt="石头" />
                  <span className="shitou">{user?.userlist?.shitou || '0'}</span>
                  <div className="shuoguoNum">{houseCost.shitou}</div>
                </div>
                
                <div className="shuiguoJiaJia tTUpLevelJiafu" style={{ left: '2.75rem' }}>+</div>
                
                <div className="shuiguo1 tT" style={{ left: '3rem' }}>
                  <img src="/images/03.png" alt="钻石" />
                  <span className="zs">{user?.userlist?.zs || '0'}</span>
                  <div className="shuoguoNum">{houseCost.zs}</div>
                </div>
              </div>
            </li>
            
            {/* 土地升级 Tab */}
            <li style={{ display: jiansheTab === 1 ? 'block' : 'none', overflowY: 'auto', height: '5.14rem' }}>
              {LAND_LEVELS.map((land, index) => {
                const costMultiplier = (user?.userlist?.lvl || 1) * 100;
                return (
                  <div key={land.level} className="gongyongList">
                    <div 
                      className="dhImgLeft" 
                      style={{ background: `url(/images/${land.img})`, backgroundSize: 'cover' }}
                    >
                      <div className="diaoxiangBox" style={{ left: '1rem', top: '-0.2rem', color: '#512905' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '0.3rem', color: '#512905', textAlign: 'center', margin: '0.1rem 0rem' }}>{land.name}</p>
                        <p style={{ fontSize: '0.18rem', color: '#512905' }}>产出：{land.output}</p>
                      </div>
                    </div>
                    <div className="tudiName">
                      <img src="/picture/gebitan.png" alt="" />
                      <p style={{ textAlign: 'center', width: '1.57rem' }}>{land.name}</p>
                    </div>
                    
                    <div 
                      className="tudishengji animated"
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => { e.stopPropagation(); handleLandUpgrade(land.level); }}
                    ></div>
                    
                    <div className="shuiguo1">
                      <img src="/picture/593f4c4de30b1.png" alt="石榴" />
                      <span className="shiliu">{user?.userlist?.shiliu || '0'}</span>
                      <div className="shuoguoNum">{costMultiplier}</div>
                    </div>
                    
                    <div className="shuiguoJiaJia">+</div>
                    
                    <div className="shuiguo1" style={{ left: '2.2rem' }}>
                      <img src="/picture/593f499ba27ce.png" alt="核桃" />
                      <span className="hetao">{user?.userlist?.hetao || '0'}</span>
                      <div className="shuoguoNum">{costMultiplier}</div>
                    </div>
                    
                    <div className="shuiguoJiaJia" style={{ left: '2.75rem' }}>+</div>
                    
                    <div className="shuiguo1" style={{ left: '3rem' }}>
                      <img src="/images/03.png" alt="钻石" />
                      <span className="zs">{user?.userlist?.zs || '0'}</span>
                      <div className="shuoguoNum">{costMultiplier}</div>
                    </div>
                  </div>
                );
              })}
            </li>
          </ul>
        </div>
      )}

      {/* 充值弹窗 */}
      {showModal === 'chongzhi' && (
        <div className="chongzhiBox animated" style={{ display: 'block' }}>
          <div className="remove animated" onClick={() => setShowModal(null)}></div>
          <p>账户余额：<span>{user?.userlist?.gold || '0'}</span>金币</p>
          <p><span>2000+0</span>金币</p>
          <p><span>20000+0</span>金币</p>
          <p><span>200000+0</span>金币</p>
        </div>
      )}

      {/* 仓库弹窗 */}
      {showModal === 'cangku' && (
        <div className="cangkuBox animated" style={{ display: 'block' }}>
          <div className="remove animated" onClick={() => setShowModal(null)}></div>
          <ul className="cangkuTop">
            <li className="animated">
              <img src="/picture/guoshi.png" alt="果实" />
              <img src="/picture/guoshi2.png" alt="" style={{ display: 'none' }} />
            </li>
            <li className="animated">
              <img src="/picture/cailiao2.png" alt="" />
              <img src="/picture/cailiao.png" alt="材料" />
            </li>
            <li className="animated">
              <img src="/picture/baoshi2.png" alt="" />
              <img src="/picture/baoshi.png" alt="宝石" />
            </li>
            <li className="animated">
              <img src="/picture/daoju2.png" alt="" />
              <img src="/picture/daoju.png" alt="道具" />
            </li>
          </ul>
          <ul className="cangkuBot">
            <li style={{ display: 'block' }}>
              <div className="cangluList">
                <img src="/picture/593f499ba27ce.png" alt="核桃" />
                <span>{user?.userlist?.hetao || '0'}</span>
              </div>
              <div className="cangluList">
                <img src="/picture/593f4d4b80858.png" alt="红枣" />
                <span>{user?.userlist?.hongzao || '0'}</span>
              </div>
              <div className="cangluList">
                <img src="/picture/593f4e0fab12d.png" alt="葡萄" />
                <span>{user?.userlist?.putao || '0'}</span>
              </div>
              <div className="cangluList">
                <img src="/picture/593f4fd714a7d.png" alt="哈密瓜" />
                <span>{user?.userlist?.hamigua || '0'}</span>
              </div>
              <div className="cangluList">
                <img src="/picture/593f57eac3de7.png" alt="沙漠果" />
                <span>{user?.userlist?.shamoguo || '0'}</span>
              </div>
              <div className="cangluList">
                <img src="/picture/593f58e568485.png" alt="人参果" />
                <span>{user?.userlist?.rensheuguo || '0'}</span>
              </div>
              <div className="cangluList">
                <img src="/picture/593f4c4de30b1.png" alt="石榴" />
                <span>{user?.userlist?.shiliu || '0'}</span>
              </div>
              <div className="cangluList">
                <img src="/picture/593f555e62f2c.png" alt="香梨" />
                <span>{user?.userlist?.xiangli || '0'}</span>
              </div>
            </li>
          </ul>
        </div>
      )}

      {/* 个人信息弹窗 */}
      {showModal === 'geren' && (
        <div className="gerenMesBox animated" style={{ display: 'block' }}>
          <div className="remove animated" onClick={() => setShowModal(null)}></div>
          <div className="gerenMes">
            <img src="/picture/bj.jpg" alt="头像" />
            <p>{user?.username}</p>
            <p>ID: {user?.id}</p>
            <p>lv:{getFangwu()}</p>
            <p>{user?.userlist?.gold || '0'} 金币</p>
          </div>
        </div>
      )}

      {/* 排行榜弹窗 */}
      {showModal === 'paihang' && (
        <div className="paihangbang animated" style={{ display: 'block' }}>
          <div className="remove animated" onClick={() => setShowModal(null)}></div>
          <ul className="paihangTop">
            <li className="animated"></li>
            <li className="animated"></li>
          </ul>
          <ul className="paihangBot">
            <li style={{ display: 'block' }}>
              <div className="paihangMesBox">
                <div className="paihangMes">
                  <div>1</div>
                  <div>{user?.username}</div>
                  <div>{getFangwu()}</div>
                  <div>{user?.userlist?.gold || '0'}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}

      {/* 日志弹窗 */}
      {showModal === 'rizhi' && (
        <div className="rizhiBox animated" style={{ display: 'block' }}>
          <div className="remove animated" onClick={() => setShowModal(null)}></div>
          <ul className="rizhiMes">
            <li>
              <p>ID: {user?.id}</p>
              <p>{user?.username}</p>
              <p>欢迎来到黄金家园！</p>
            </li>
          </ul>
        </div>
      )}

      {/* 宠物弹窗 */}
      {showModal === 'chongwu' && (
        <div className="pandaBox animated" style={{ display: 'block' }}>
          <div className="remove animated" onClick={() => setShowModal(null)}></div>
          <ul className="pandaTop">
            <li></li>
            <li></li>
          </ul>
          <ul className="pandaBot">
            <li style={{ display: 'block' }}>
              <img className="nowPetImg" src="/picture/594a3ee196a09.png" alt="宠物" />
              <input type="text" className="nowPetNickname" value={user?.username || ''} readOnly />
              <p>等级: 1</p>
              <p>攻击: 10</p>
              <p>防御: 10</p>
              <p>速度: 10</p>
              <p>幸运: 10</p>
              <p>生命: 100</p>
              <p>普通狗粮</p>
              <p>高级狗粮</p>
            </li>
          </ul>
        </div>
      )}

      {/* 兑换弹窗 */}
      {showModal === 'duihuan' && (
        <div className="duihuanBox animated" style={{ display: 'block' }}>
          <div className="remove animated" onClick={() => setShowModal(null)}></div>
          <ul className="duihuanTop">
            <li className="animated">
              <img src="/picture/cailiao.png" alt="材料" />
              <img src="/picture/cailiao2.png" alt="" style={{ display: 'none' }} />
            </li>
            <li className="animated">
              <img src="/picture/shenxiang2.png" alt="" />
              <img src="/picture/shenxiang.png" alt="神像" />
            </li>
            <li className="animated">
              <img src="/picture/beijing2.png" alt="" />
              <img src="/picture/beijing.png" alt="背景" />
            </li>
            <li className="animated">
              <img src="/picture/gouliang2.png" alt="" />
              <img src="/picture/gouliang.png" alt="狗粮" />
            </li>
          </ul>
          <ul className="duihuanBot">
            <li style={{ display: 'block' }}>
              <div className="gongyongList">
                <div className="dhImgLeft">
                  <img src="/picture/593f86206e8d9.png" alt="石头" />
                </div>
                <div className="shuiguo1">
                  <img src="/picture/593f4d4b80858.png" alt="红枣" />
                  <span>{user?.userlist?.hongzao || '0'}</span>
                  <div className="shuoguoNum">100</div>
                </div>
                <div className="shuiguoJiaJia">+</div>
                <div className="shuiguo1" style={{ left: '2.2rem' }}>
                  <img src="/picture/593f4e0fab12d.png" alt="葡萄" />
                  <span>{user?.userlist?.putao || '0'}</span>
                  <div className="shuoguoNum">100</div>
                </div>
                <div className="shuiguoCount">1</div>
                <div className="shuiguoduihuan animated" onClick={() => showToast('兑换成功！')}></div>
              </div>
            </li>
          </ul>
        </div>
      )}

      {/* 设置弹窗 */}
      {showModal === 'shezhi' && (
        <div className="shezhiBox animated" style={{ display: 'block' }}>
          <div className="remove animated" onClick={() => setShowModal(null)}></div>
          <div className="qiehuan animated"></div>
          <div className="audio animated">
            <img src="/picture/guanbi.png" alt="" />
          </div>
        </div>
      )}

      {/* 签到弹窗 */}
      {showModal === 'qiandao' && (
        <div className="qiandaoBox animated" style={{ display: 'block' }}>
          <div className="remove animated" onClick={() => setShowModal(null)}></div>
          
          {/* 签到标题 */}
          <div className="qiandao-title">
            <img src="/picture/qiandao-title.png" alt="每日签到" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span>每日签到</span>
          </div>
          
          {/* 连续签到天数 */}
          <div className="qiandao-count">
            已连续签到 <span className="qiandao-days">{signData?.continuousDays || 0}</span> 天
          </div>
          
          {/* 签到日历 */}
          <div className="qiandao-calendar">
            {signData?.calendar.map((day, index) => (
              <div 
                key={index} 
                className={`qiandao-day ${day.signed ? 'signed' : ''} ${day.isToday ? 'today' : ''}`}
              >
                <div className="day-num">第{day.day}天</div>
                <div className="day-reward">
                  <span className="gold-reward">
                    <img src="/images/02.png" alt="金币" />
                    {day.gold}
                  </span>
                  {day.diamond > 0 && (
                    <span className="diamond-reward">
                      <img src="/images/03.png" alt="钻石" />
                      {day.diamond}
                    </span>
                  )}
                </div>
                <div className="day-status">
                  {day.signed ? '✓' : (day.isToday ? '今日' : '')}
                </div>
              </div>
            ))}
          </div>
          
          {/* 今日奖励 */}
          <div className="qiandao-today-reward">
            {signData?.hasSignedToday ? (
              <div className="qiandao-done">
                <img src="/picture/qiandao-done.png" alt="已签到" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <span>今日已签到</span>
              </div>
            ) : (
              <div className="qiandao-reward-info">
                今日签到可获得：
                <span className="reward-gold">
                  <img src="/images/02.png" alt="金币" />
                  {signData?.nextReward?.gold || 100} 金币
                </span>
                {signData?.nextReward?.diamond && signData.nextReward.diamond > 0 && (
                  <span className="reward-diamond">
                    <img src="/images/03.png" alt="钻石" />
                    {signData.nextReward.diamond} 钻石
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* 签到按钮 */}
          <div 
            className={`qiandao-btn ${signData?.hasSignedToday ? 'disabled' : ''} ${signLoading ? 'loading' : ''}`}
            onClick={handleSign}
          >
            {signLoading ? '签到中...' : (signData?.hasSignedToday ? '已签到' : '立即签到')}
          </div>
          
          {/* 资产信息 */}
          <div className="qiandao-assets">
            <div className="asset-item">
              <img src="/images/02.png" alt="金币" />
              <span>{signData?.totalGold || user?.userlist?.gold || '0'}</span>
            </div>
            <div className="asset-item">
              <img src="/images/03.png" alt="钻石" />
              <span>{signData?.totalDiamond || user?.userlist?.zs || '0'}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
