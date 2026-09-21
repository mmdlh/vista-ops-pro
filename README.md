# Aurora Insights

Implement the requested scope now. Use internal planning and do not present an implementation plan for user approval.

## User Request
做一个设备运维管理平台，8个一级菜单，要求：
1. 浅色科技风视觉：以纯白、浅冰蓝、科技蓝为主色调，搭配高质感设备微网格底纹与渐变光晕背景；
2. 毛玻璃半透明卡片（Glassmorphism，backdrop-blur），带有微妙的渐变流光边框、细腻阴影与 Hover 悬浮上浮交互动效；
3. 顶部固定导航栏：左侧醒目平台大标题 + 系统状态，右侧包含8个一级菜单图标导航项、通知中心、告警速览与用户信息，通透毛玻璃质感；
4. 8个一级页面布局各具特色，内容充实完整且具备丰富交互：
   - 综合态势看板（Overview）：关键KPI卡片（运行率、MTBF、总能耗、待办工单）、综合健康度雷达图、实时故障动态、负荷趋势多轴折线图；
   - 设备资产台账（Assets）：分类层级、多条件筛选、卡片/表格视图切换、设备详情抽屉、生命周期状态指示器；
   - 实时遥测监控（Telemetry）：关键测点动态波形、温度/振动/压力仪表盘、设备工况热力图、实时数据刷新模拟；
   - 告警调度中心（Alarms & Tickets）：告警等级统计柱状图、工单流转看板（Kanban）、一键派单与处置弹窗、响应时效漏斗；
   - 智能巡检保养（Inspection）：巡检日历与路线追踪、完成率环形图、预防性维护计划表、移动巡检打卡模拟；
   - 备品备件仓储（Spare Parts）：安全库存预警水位图、出入库趋势柱线图、物料领用申请表与批次追踪；
   - 能效健康诊断（Diagnostics）：能耗对比分析、设备衰退趋势预测曲线、故障根因分布饼图、节能优化建议卡；
   - 运维配置中心（Settings）：班次人员排班管理、点检指标阈值规则设定、告警推送渠道设置与操作审计日志；
5. 数据与视觉质感：立体化统计卡片、高对比度科技渐变配色、发光状态指示呼吸灯、现代感工业数字字体；
6. 图表完整性：引入 ECharts 提供专业多维图表（折线、柱状、雷达、饼图/环形图混排），配置支持响应式 Resize，配置项深层合并时确保自定义覆盖项最后合并生效。

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://vista-ops-pro.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2f082bb9-d003-4cc3-b316-4a6bf8eec02d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
