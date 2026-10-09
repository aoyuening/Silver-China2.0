# 银发中国 · SILVER CHINA

纯 HTML / CSS / JavaScript / ECharts 交互式数据叙事作品。无需安装 npm、数据库或后端。

## 运行
在 VS Code 打开本项目文件夹，安装 Live Server 扩展，右键 index.html → Open with Live Server。
也可直接打开 index.html（地图通过本地 JS 加载，不依赖 fetch），但需要网络加载 ECharts CDN。

## 文件
- index.html：页面入口与六章叙事结构。
- css/style.css：视觉设计、响应式布局、入场动画与 reduced-motion 适配。
- js/data.js：全部人口、地区、资源、年龄分布与未来情景统计数据。
- js/charts.js：ECharts 配置、提示框、图例、地图、金字塔与自适应。
- js/main.js：年份切换、数字动画、导航、滚动动画、未来轨道播放、装饰年轮。
- data/china.json：中国省级 GeoJSON 边界。
- js/china-map.js：同一边界的 JS 封装，允许直接用 file:// 打开。

## 数据状态与替换
当前全部统计值均标注 DEMO DATA。部分数值接近公开统计，但未完成来源核验，不能当作官方数据引用。
历史年份的演示值与未来情景估计在界面分别标注。金字塔是独立的示意分布，不与全国汇总数据严格校准，不能用于数值分析。

真实数据替换入口为 js/data.js：
1. 保持对象字段名称、年龄组、年份索引与单位，替换 history、ages、provinces、pyramids、resources、future。
2. 人口单位为万人、床位总量单位为万张、比例为 0–100 百分数。
3. maleAgeStructure / femaleAgeStructure 为各性别年龄组占总人口百分比，而非占同性别比例。两组之和应约等于 100%。
4. 省份名称必须与 china.json 中的完整名称一致。缺失值应保留为缺失并在图表提示中处理，不能填为 0。
5. 更新 provenance，逐项记录来源 URL、发布机构、统计年份、采集日期、口径与实际/预测状态。
6. 核验人口总量、年龄组汇总、地区加权值、抚养比及金字塔的一致性后，再修改页面演示标签和页脚声明。
7. 若修改年份集合，同步修改 main.js 的金字塔年份按钮及首页截面选择；首页默认 2020。

养老资源压力指数是本项目构建的非官方指标。计算实现位于 charts.js，口径展示在页面可展开说明内；所有归一化阈值均为演示假设。
未来床位需求按每千名老人 40 张估算，不是官方政策目标。
地图中港澳台显示为无统计数据，不参加排名或加权计算。

## 外部依赖与来源
ECharts 5.6.0：https://cdn.jsdelivr.net/npm/echarts@5.6.0/dist/echarts.min.js
无外部字体、图片及统计接口请求。地图边界下载自阿里云 DataV GeoAtlas：
https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json
地图已保存至本地。正式参赛前，应审核地图使用规范、授权与边界表示要求。
页脚的国家统计局、民政部等是待核验来源渠道，不代表当前演示数据来自这些机构。

## 交互
六章锚点导航；六个历史/未来时间节点；四个人口金字塔对比年份；中国地图和全部 ECharts 提示；趋势、金字塔与供给结构图例切换；未来年份滑块与自动播放；屏幕尺寸变化自动重绘。
