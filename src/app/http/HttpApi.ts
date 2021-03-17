
export const  BaseUrl = 'http://218.77.104.37:58080/hnwx-app';
export const Api: any =
  {
    doLogin : BaseUrl + '/doLogin', // 登录
    getVerifyCode : BaseUrl + '/getVerifyCode', // 获取验证码
    refreshToken : BaseUrl + '/refreshToken', //  刷新token
    axleInit : BaseUrl + '/common/axleInit', //  轴数初始化
    superviseInit : BaseUrl + '/common/superviseInit', //  督查情况列表初始化
    getAccessToken : BaseUrl + '/common/getAccessToken', //  获取萤石云视频播放token
    tenterpriseInit : BaseUrl + '/common/tenterpriseInit', //  源头企业初始化
    tweighInit : BaseUrl + '/common/tweighInit', //  站点初始化
    entering : BaseUrl + '/case/entering', //  执法录入
    getAlarmRecordCount : BaseUrl + '/dispatch/alarmRecord/getAlarmRecordCount', //  指挥调度-查看是否有报警任务
    listRealTimeAlarmRecord : BaseUrl + '/dispatch/alarmRecord/listRealTimeAlarmRecord', //  指挥调度-任务列表
    historyIllegal : BaseUrl + '/dispatch/enforce/enforcementLedger/historyIllegal', //  指挥调度-获取历史违法记录
    getAlarmRecordJumpDetails : BaseUrl + '/dispatch/getAlarmRecordJumpDetails', //  指挥调度-报警记录跳转详情
    queryResourceList : BaseUrl + '/dispatch/queryResourceList', //  指挥调度-获取资源列表
    infoFeedbackSubmit : BaseUrl + '/dispatch/infoFeedback/submit', //  指挥调度-信息反馈
    carNativeReport : BaseUrl + '/reportQuery/carNativeReport', //  车辆车籍地统计
    overNumReport : BaseUrl + '/reportQuery/overNumReport', //  超限量统计
    overRateReport : BaseUrl + '/reportQuery/overRateReport', //  超限率综合统计
    getBayonetByCode : BaseUrl + '/enterprise/getBayonetByCode', //  获取单个企业视频卡口
    enterpriseGetById : BaseUrl + '/enterprise/getById', //  企业过车详情
    getInfoByCode : BaseUrl + '/enterprise/getInfoByCode', //  获取单个企业信息
    mapListAll : BaseUrl + '/enterprise/mapListAll', //  源头企业点位地图展示
    pageList : BaseUrl + '/enterprise/pageList', //  源头企业实时数据查询
    supervise : BaseUrl + '/enterprise/supervise', //  源头督查
    superviseRecord : BaseUrl + '/enterprise/superviseRecord', //  督查记录
    carPassQueryGetById : BaseUrl + '/carPassQuery/getById', //  根据id获取过车对象
    carPassQueryPageList : BaseUrl + '/carPassQuery/pageList', //  过车记录查询
    carInfo : BaseUrl + '/transport/carInfo', //  获取车辆信息
    companyInfo : BaseUrl + '/transport/companyInfo', //  获取企业信息
    getDriverInfo : BaseUrl + '/transport/getDriverInfo', //  获取驾驶员信息
    queryPassNDaysOL : BaseUrl + '/operationMonitor/report/carPassReport/queryPassNDaysOL', //  图表分析-7天超限率统计
    queryStationPassNDaysOL : BaseUrl + '/operationMonitor/report/carPassReport/queryStationPassNDaysOL', //  运行轨迹-查看数据计
    queryTopOLTruckByUnitCode : BaseUrl + '/operationMonitor/tCarPass/queryTopOLTruckByUnitCode', //  图表分析-超限货车排行
    selectGcllAndCzll : BaseUrl + '/operationMonitor/tCarPass/selectGcllAndCzll', //  图表分析-今日过车统计
    truckInfo : BaseUrl + '/operationMonitor/tCarPass/truckInfo', //  图表分析-超限货车排行-查看计
    queryCzGclAndCzlToDay : BaseUrl + '/operationMonitor/tGaode/queryCzGclAndCzlToDay', //  运行轨迹-查询检测点详情信息
    stationCarPass : BaseUrl + '/operationMonitor/tWeigh/stationCarPass', //  图表分析-非现场检测点超限率排名
    stationStats : BaseUrl + '/operationMonitor/tWeigh/stationStats', //  运行轨迹-统计检测点数目
    tWeighList : BaseUrl + '/operationMonitor/tWeigh/list', //  运行轨迹-查询页面数据
    weighPointByRegionCode : BaseUrl + '/operationMonitor/tWeigh/weighPointByRegionCode', //  运行轨迹-查询称重点信息
    illegalQueryGetById : BaseUrl + '/illegalQuery/getById', //  根据id获取过车对象
    illegalQueryPageList : BaseUrl + '/illegalQuery/pageList', //  根据id获取过车对象
    trace : BaseUrl + '/dispatch/trace', //  指挥调度-开始追踪
    getProvinceCode : BaseUrl + '/common/getProvinceCode', //  '获取省编码'
    getSuperviseById : BaseUrl + '/enterprise/getSuperviseById', //督查记录详情
    updatePass : BaseUrl + '/user/updatePass', //修改密码
    getSystemInfo : BaseUrl + '/common/getSystemInfo', //查询系统信息
    getAlarmRecordContent : BaseUrl + '/dispatch/alarmRecord/getAlarmRecordContent', //指挥调度-查看是否有报警任务

    // /illegalQuery/pageList
    // 违法记录查询



  };

