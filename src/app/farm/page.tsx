'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './farm.css';

interface UserlistData {
  gold: string;
  rmb: string;
  zs: string;
  lvl: number;
  zhongzi: number;
  fangwu: number;  // 房屋等级
  hetao: string;
  shiliu: string;
  hongzao: string;
  putao: string;
  hamigua: string;
  xiangli: string;
  shamoguo: string;
  rensheuguo: string;
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

export default function FarmPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLand, setActiveLand] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<string | null>(null);

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
      hetao: '0', shiliu: '0', hongzao: '0', putao: '0',
      hamigua: '0', xiangli: '0', shamoguo: '0', rensheuguo: '0',
    };
    // 初始化12块土地状态
    // tudi: 0=未开垦(灰色), 1=已开垦(亮色)
    // zt: -1=未开垦, 0=空地可播种, 1=已播种, 2=枯萎
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
    setActiveLand(activeLand === index ? null : index);
  };

  // 获取房屋等级
  const getFangwu = () => {
    return user?.userlist?.fangwu || 1;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <img src="/images/jiazai.gif" alt="加载中..." className="loading-gif" />
      </div>
    );
  }

  return (
    <>
      <div id="load" style={{ display: 'none' }}>
        <img src="/picture/jiazai.gif" alt="" />
      </div>
      
      <div className="sicoZhezhao"></div>
      <div id="mengban" style={{ display: 'none' }}></div>
      
      {/* 大房子 - 根据房屋等级显示不同图片 */}
      <div 
        className="BigHouse animated" 
        style={{ 
          background: `url(/images/house_list/${getFangwu()}.png)`,
          backgroundSize: 'cover'
        }}
      ></div>
      {/* 小房子 */}
      <div className="SmallHouse animated"></div>

      {/* 页面左下角按钮 */}
      <div className="footerLeft">
        <div className="leftBtn1" onClick={() => setShowModal('cangku')}></div>
        <div className="leftBtn2" onClick={() => setShowModal('duihuan')}></div>
        <div className="leftBtn3" onClick={() => setShowModal('shangdian')}></div>
        <div className="leftBtn4" onClick={() => setShowModal('jianshe')}></div>
      </div>
      <div id="footerLeftBtn" onClick={() => setShowModal('geren')}></div>

      {/* 页面右下角按钮 */}
      <div className="footerRight">
        <div className="rightBtn1" onClick={() => setShowModal('rizhi')}></div>
        <div className="rightBtn2" onClick={() => setShowModal('paihang')}></div>
        <div className="rightBtn3" onClick={() => setShowModal('shezhi')}></div>
        <div className="rightBtn4" onClick={() => setShowModal('chongwu')}></div>
      </div>
      <div id="footerRightBtn"></div>

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
      <div className="qiandao animated pulse infinite" onClick={() => setShowModal('qiandao')}></div>

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
            // tudi: 0=未开垦(灰色土地), 1=已开垦(亮色土地)
            // zt: -1=未开垦状态, 0=空地可播种, 1=已播种, 2=枯萎
            const tudi = user?.userlist?.[`tudi${i}`];
            const zt = user?.userlist?.[`zt${i}`];
            const isActive = activeLand === i;
            
            // 根据土地状态决定显示哪个图片
            // 如果 zt 是 -1（未开垦），显示 tudi0.png（灰色土地）
            // 否则显示 tudi1.png（已开垦的亮色土地）
            const tudiImage = zt === '-1' ? 0 : (tudi || 1);
            
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
                <img style={{ opacity: 0 }} className="zuowu" alt="" />
                <img src="/picture/chongzi.png" style={{ display: 'none' }} className="chongzi" alt="" />
                <img src="/picture/water.png" style={{ display: 'none' }} className="water" alt="" />
                <img src="/picture/zacao.png" style={{ display: 'none' }} className="zacao" alt="" />
                
                {isActive && (
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
                <div className="shuiguoduihuan animated"></div>
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
    </>
  );
}
