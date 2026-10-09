/* DEMO DATA — 全部统计数值为界面演示，不是官方统计。
 * 人口单位：万人；比例单位：%；床位：万张；医疗资源：每千人口卫生技术人员。
 * 所有绘图均从此文件读取。更换数据时保留字段与口径，并更新 provenance。
 */
window.SILVER_DATA = (() => {
  const history = [
    {year:1950,totalPopulation:55200,age60Plus:7.2,age65Plus:4.5,dependencyRatio:7.6,lifeExpectancy:43.8,workingRate:59.2},
    {year:1980,totalPopulation:98700,age60Plus:7.6,age65Plus:4.9,dependencyRatio:8.2,lifeExpectancy:67.8,workingRate:59.8},
    {year:2000,totalPopulation:126700,age60Plus:10.3,age65Plus:7.0,dependencyRatio:10.1,lifeExpectancy:71.4,workingRate:69.3},
    {year:2020,totalPopulation:141200,age60Plus:18.7,age65Plus:13.5,dependencyRatio:19.7,lifeExpectancy:77.9,workingRate:68.5},
    {year:2035,totalPopulation:137000,age60Plus:30.2,age65Plus:23.4,dependencyRatio:38.9,lifeExpectancy:80.5,workingRate:60.2,forecast:true},
    {year:2050,totalPopulation:125000,age60Plus:38.8,age65Plus:30.1,dependencyRatio:54.4,lifeExpectancy:83.0,workingRate:55.3,forecast:true}
  ];
  const ages = [{name:'0–14 岁',value:18,color:'#6b7777'},{name:'15–29 岁',value:17,color:'#8c9793'},{name:'30–44 岁',value:21,color:'#b6bdb7'},{name:'45–59 岁',value:25.3,color:'#dbd9ce'},{name:'60–74 岁',value:14.2,color:'#bda779'},{name:'75 岁以上',value:4.5,color:'#9f654d'}];
  const rows = [
    ['北京市',19.6,2190,'东部',32,11.9],['天津市',21.7,1386,'东部',34,9.8],['河北省',19.9,7461,'东部',28,7.3],['山西省',18.9,3492,'中部',30,8.5],['内蒙古自治区',19.8,2405,'西部',33,8.6],['辽宁省',25.7,4259,'东北',36,8.7],['吉林省',23.1,2407,'东北',34,8.3],['黑龙江省',23.2,3185,'东北',32,8.2],['上海市',23.4,2487,'东部',38,10.5],['江苏省',21.8,8475,'东部',37,8.4],['浙江省',18.7,6457,'东部',35,9.5],['安徽省',18.8,6103,'中部',29,6.6],['福建省',16,4154,'东部',27,7.2],['江西省',16.9,4519,'中部',26,6.8],['山东省',20.9,10153,'东部',32,8.4],['河南省',18.1,9937,'中部',25,7.1],['湖北省',20.4,5775,'中部',29,8.0],['湖南省',19.9,6645,'中部',28,7.7],['广东省',12.4,12601,'东部',23,7.4],['广西壮族自治区',16.7,5013,'西部',25,6.8],['海南省',14.7,1008,'东部',28,7.8],['重庆市',21.9,3205,'西部',33,8.6],['四川省',21.7,8367,'西部',31,7.8],['贵州省',15.4,3856,'西部',24,6.7],['云南省',14.9,4721,'西部',24,6.8],['西藏自治区',8.5,365,'西部',22,5.9],['陕西省',19.2,3953,'西部',30,8.9],['甘肃省',17.1,2502,'西部',26,7.5],['青海省',12.1,592,'西部',24,7.8],['宁夏回族自治区',13.5,720,'西部',27,8.2],['新疆维吾尔自治区',11.3,2585,'西部',25,7.6]
  ];
  const provinces = rows.map(([province,elderlyRate,totalPopulation,region,bedsPer1000,medicalResources])=>({province,elderlyRate,totalPopulation,region,bedsPer1000,medicalResources,age65Plus:+(elderlyRate*.72).toFixed(1),elderlyPopulation:+(totalPopulation*elderlyRate/100).toFixed(1),dependencyRatio:+(elderlyRate*.72/(100-elderlyRate*.72-18)*100).toFixed(1),status:'DEMO DATA'}));
  const ageBands = Array.from({length:16},(_,i)=>`${i*5}–${i*5+4}`).concat('80+');
  const shapes = {2000:[8.0,8.5,8.3,7.8,8.7,9.2,8.9,8.2,7,6,4.9,4.1,3.4,2.8,2.0,1.3,.9],2020:[5.8,6,6.2,5.2,5.4,6.4,7.4,7.1,6.5,8.3,8.7,8.3,6.6,4.5,3.1,2.1,2.4],2035:[3.7,4,4.2,4.5,4.9,5.3,5.9,6.1,6.6,7,7.6,7.8,8.7,7.7,6.5,4.8,4.7],2050:[3.3,3.4,3.5,3.8,4.1,4.3,4.6,4.8,5.1,5.5,6.2,6.7,7.3,8.0,8.6,8.4,12.4]};
  const pyramids = Object.fromEntries(Object.entries(shapes).map(([year,values])=>{const sum=values.reduce((a,b)=>a+b,0);return [year,{maleAgeStructure:values.map((v,i)=>+(v/sum*100*(.516-i*.0035)).toFixed(3)),femaleAgeStructure:values.map((v,i)=>+(v/sum*100*(.484+i*.0035)).toFixed(3))}]}));
  const resources = {years:[2010,2012,2014,2016,2018,2020],elderlyPopulation:[17700,19400,21200,23000,24900,26404],beds:[315,416,551,680,746,821],institutions:3.8,nurses:32,community:29.1,medical:1066,structure:[{name:'居家上门',value:52},{name:'社区照护',value:31},{name:'机构照护',value:17}]};
  const future=[{year:2030,totalPopulation:140000,age60Plus:26.1,workingRate:63.8,dependencyRatio:32.6},{year:2035,totalPopulation:137000,age60Plus:30.2,workingRate:60.2,dependencyRatio:38.9},{year:2040,totalPopulation:134000,age60Plus:33.5,workingRate:58.4,dependencyRatio:44.8},{year:2045,totalPopulation:130000,age60Plus:36.1,workingRate:56.8,dependencyRatio:49.8},{year:2050,totalPopulation:125000,age60Plus:38.8,workingRate:55.3,dependencyRatio:54.4}];
  const narratives={2000:'较宽的年轻年龄组支撑着人口结构。更大的青年群体，也意味着未来教育、就业与住房需求的集中释放。',2020:'当中部逐渐变宽、底部开始收窄，年轻的“塔”正在转向成熟的“柱”。养老、医疗与劳动市场，需要一起适应新的年龄结构。',2035:'在这一演示情景中，较大的人口队列逐步进入老年。社区照护、慢病管理与适老空间的需求同时上升。',2050:'在这一演示情景中，高龄人口比重进一步增加。更长的人生，需要更连续的照护，也需要更多跨代协作与社会参与的机会。'};
  return {provenance:{status:'DEMO DATA',description:'全部统计数据为项目演示；未来值为情景估计',sources:[]},history,ages,provinces,ageBands,pyramids,resources,future,narratives};
})();
