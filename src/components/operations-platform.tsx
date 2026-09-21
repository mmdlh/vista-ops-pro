import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Activity, AlarmClock, Bell, Boxes, CalendarCheck, Check, ChevronRight, CircleGauge,
  ClipboardCheck, Cpu, Database, Factory, Filter, Gauge, Grid2X2, LayoutDashboard,
  List, PackageOpen, Plus, Radio, RefreshCw, Search, Settings, ShieldCheck, SlidersHorizontal,
  Thermometer, TicketCheck, UserRound, Warehouse, Wrench, X, Zap,
} from "lucide-react";
import type { EChartsOption } from "echarts";
import { Button } from "@/components/ui/button";

export type PageKey = "overview" | "assets" | "telemetry" | "alarms" | "inspection" | "spares" | "diagnostics" | "settings";

const nav = [
  { key: "overview", label: "综合态势", to: "/", icon: LayoutDashboard },
  { key: "assets", label: "资产台账", to: "/assets", icon: Boxes },
  { key: "telemetry", label: "实时遥测", to: "/telemetry", icon: Activity },
  { key: "alarms", label: "告警调度", to: "/alarms", icon: AlarmClock },
  { key: "inspection", label: "巡检保养", to: "/inspection", icon: ClipboardCheck },
  { key: "spares", label: "备品备件", to: "/spare-parts", icon: Warehouse },
  { key: "diagnostics", label: "能效诊断", to: "/diagnostics", icon: CircleGauge },
  { key: "settings", label: "运维配置", to: "/settings", icon: Settings },
] as const;

const palette = ["#1677ff", "#13c2c2", "#52c41a", "#faad14", "#f5222d"] as const;

function deepMerge(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
  const output = { ...base };
  Object.entries(override).forEach(([key, value]) => {
    const previous = output[key];
    if (value && typeof value === "object" && !Array.isArray(value) && previous && typeof previous === "object" && !Array.isArray(previous)) {
      output[key] = deepMerge(previous as Record<string, unknown>, value as Record<string, unknown>);
    } else output[key] = value;
  });
  return output;
}

export function EChart({ option, className = "h-72" }: { option: EChartsOption; className?: string }) {
  const target = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!target.current) return;
    let disposed = false;
    let chart: import("echarts").ECharts | undefined;
    const resize = () => chart?.resize();
    void import("echarts").then((echarts) => {
      if (disposed || !target.current) return;
      chart = echarts.init(target.current);
      const base: EChartsOption = {
        color: palette,
        animationDuration: 900,
        textStyle: { fontFamily: "Rajdhani, system-ui, sans-serif", color: "#52657a" },
        tooltip: { trigger: "axis", backgroundColor: "rgba(255,255,255,.96)", borderColor: "#d7e9ff", textStyle: { color: "#18334f" } },
        grid: { left: 42, right: 24, top: 42, bottom: 30 },
      };
      chart.setOption(deepMerge(base as Record<string, unknown>, option as Record<string, unknown>), true);
      window.addEventListener("resize", resize);
    });
    return () => { disposed = true; window.removeEventListener("resize", resize); chart?.dispose(); };
  }, [option]);
  return <div ref={target} className={className} />;
}

export function Platform({ page }: { page: PageKey }) {
  const [alertsOpen, setAlertsOpen] = useState(false);
  const title = nav.find((item) => item.key === page)?.label ?? "综合态势";
  return (
    <div className="ops-bg min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-card/75 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-5 px-4 lg:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow"><Factory className="size-5" /></span>
            <span><strong className="block text-[15px] font-bold text-foreground">智维云 · OPS</strong><span className="flex items-center gap-1.5 text-[10px] text-success"><i className="status-dot" />系统运行正常</span></span>
          </Link>
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
            {nav.map((item) => <Link key={item.key} to={item.to} className={`nav-item ${page === item.key ? "nav-active" : ""}`}><item.icon className="size-4" /><span>{item.label}</span></Link>)}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative" aria-label="通知中心"><Bell className="size-4" /><span className="absolute right-1 top-1 size-1.5 rounded-full bg-destructive" /></Button>
            <Button variant="outline" size="sm" onClick={() => setAlertsOpen(true)} className="hidden gap-2 border-warning/30 bg-warning/5 text-warning sm:flex"><AlarmClock className="size-4" />3 条告警</Button>
            <div className="hidden h-8 items-center gap-2 border-l border-border pl-3 md:flex"><span className="grid size-8 place-items-center rounded-full bg-secondary text-primary"><UserRound className="size-4" /></span><span className="text-xs"><b className="block">林运维</b><span className="text-muted-foreground">值班主管</span></span></div>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-border/60 px-3 py-1.5 xl:hidden">{nav.map((item) => <Link key={item.key} to={item.to} className={`nav-item shrink-0 ${page === item.key ? "nav-active" : ""}`}><item.icon className="size-4" /><span>{item.label}</span></Link>)}</nav>
      </header>
      <main className="mx-auto max-w-[1800px] px-4 pb-10 pt-24 lg:px-6 xl:pt-20">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="mb-1 text-xs font-medium text-primary">EQUIPMENT OPERATIONS CENTER</p><h1 className="text-2xl font-bold">{title}</h1><p className="mt-1 text-sm text-muted-foreground">华东智造基地 · 数据更新于 2 秒前</p></div>
          <div className="flex items-center gap-2"><span className="glass-pill"><Radio className="size-3 text-success" />实时数据流</span><span className="glass-pill">2026-09-21 周一</span></div>
        </div>
        {page === "overview" && <Overview />}{page === "assets" && <Assets />}{page === "telemetry" && <Telemetry />}{page === "alarms" && <Alarms />}{page === "inspection" && <Inspection />}{page === "spares" && <Spares />}{page === "diagnostics" && <Diagnostics />}{page === "settings" && <SettingsPage />}
      </main>
      {alertsOpen && <Modal title="告警速览" onClose={() => setAlertsOpen(false)}><AlarmList compact /><Button className="mt-4 w-full" onClick={() => setAlertsOpen(false)}>已了解</Button></Modal>}
    </div>
  );
}

function Glass({ title, sub, children, className = "", action }: { title?: string; sub?: string; children: ReactNode; className?: string; action?: ReactNode }) {
  return <section className={`glass-card ${className}`}><div className="mb-4 flex items-start justify-between gap-3">{title && <div><h2 className="font-semibold">{title}</h2>{sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}</div>}{action}</div>{children}</section>;
}

function Kpi({ icon: Icon, label, value, unit, delta, tone = "primary" }: { icon: typeof Gauge; label: string; value: string; unit: string; delta: string; tone?: string }) {
  return <div className="glass-card group overflow-hidden"><div className={`kpi-icon tone-${tone}`}><Icon className="size-5" /></div><div className="mt-5 flex items-end justify-between"><div><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-digital text-3xl font-bold">{value}<small className="ml-1 text-sm font-medium text-muted-foreground">{unit}</small></p></div><span className="text-xs text-success">{delta}</span></div><div className="mt-4 h-1 overflow-hidden rounded-full bg-secondary"><div className={`h-full rounded-full bg-${tone}`} style={{ width: value.includes(".") ? value : "76%" }} /></div></div>;
}

function Overview() {
  const radar: EChartsOption = { radar: { indicator: ["可靠性", "能效", "安全", "维护", "产能", "环境"].map((name) => ({ name, max: 100 })), splitArea: { areaStyle: { color: ["rgba(22,119,255,.02)", "rgba(22,119,255,.06)"] } } }, series: [{ type: "radar", data: [{ value: [92, 81, 96, 78, 88, 85], name: "综合健康度", areaStyle: { opacity: .2 }, symbolSize: 5 }] }] };
  const trend: EChartsOption = { legend: { data: ["电力负荷", "设备负载", "环境温度"] }, xAxis: { type: "category", data: ["00", "04", "08", "12", "16", "20", "24"] }, yAxis: [{ type: "value", name: "kW" }, { type: "value", name: "% / °C" }], series: [{ name: "电力负荷", type: "line", smooth: true, areaStyle: { opacity: .1 }, data: [480, 430, 680, 790, 750, 620, 510] }, { name: "设备负载", type: "line", smooth: true, yAxisIndex: 1, data: [51, 48, 76, 89, 83, 72, 58] }, { name: "环境温度", type: "line", smooth: true, yAxisIndex: 1, data: [24, 23, 26, 29, 28, 26, 25] }] };
  return <div className="space-y-4"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Kpi icon={Gauge} label="设备综合运行率" value="96.8" unit="%" delta="↑ 1.4%" /><Kpi icon={ShieldCheck} label="平均无故障时间 MTBF" value="726" unit="h" delta="↑ 32h" tone="success" /><Kpi icon={Zap} label="本月累计总能耗" value="128.4" unit="MWh" delta="↓ 6.2%" tone="cyan" /><Kpi icon={TicketCheck} label="待办工单" value="18" unit="项" delta="3 项紧急" tone="warning" /></div><div className="grid gap-4 lg:grid-cols-12"><Glass title="综合健康度" sub="六维设备健康能力模型" className="lg:col-span-4"><EChart option={radar} /></Glass><Glass title="24H 负荷趋势" sub="负荷、产能与环境关联分析" className="lg:col-span-5"><EChart option={trend} /></Glass><Glass title="实时故障动态" sub="最新事件与响应进度" className="lg:col-span-3"><AlarmList /></Glass></div><div className="grid gap-4 lg:grid-cols-3"><MetricStrip title="在线设备" value="1,248 / 1,286" rate="97.0%" /><MetricStrip title="今日产能" value="8,642 件" rate="计划 92%" /><MetricStrip title="碳排放估算" value="62.3 tCO₂e" rate="同比 -4.8%" /></div></div>;
}

type AssetRow = [string, string, string, string, string];
const assets: AssetRow[] = [
  ["CNC-04-018", "五轴加工中心", "精密加工区", "运行中", "92%"], ["AIR-02-006", "螺杆空压机", "动力站房", "预警", "71%"], ["PMP-01-023", "循环水泵", "公辅系统", "运行中", "88%"], ["ROB-03-012", "焊装机器人", "焊装产线", "保养中", "64%"], ["TRF-01-002", "干式变压器", "配电中心", "运行中", "95%"],
];

function Assets() {
  const [table, setTable] = useState(true); const [selected, setSelected] = useState<AssetRow | null>(null);
  return <div className="grid gap-4 xl:grid-cols-[230px_1fr]"><Glass title="设备分类" sub="按资产层级筛选"><TreeItem label="全厂设备" count="1,286" active /><TreeItem label="生产设备" count="824" indent /><TreeItem label="公辅设备" count="286" indent /><TreeItem label="检测设备" count="108" indent /><TreeItem label="物流设备" count="68" indent /><div className="mt-5 border-t border-border pt-4"><p className="mb-3 text-xs font-medium text-muted-foreground">生命周期</p>{["规划", "采购", "安装", "运行", "维护", "报废"].map((x, i) => <div key={x} className="mb-2 flex items-center gap-2 text-xs"><i className={`size-2 rounded-full ${i === 3 ? "bg-success" : "bg-border"}`} />{x}<span className="ml-auto text-muted-foreground">{[12, 18, 26, 1104, 38, 88][i]}</span></div>)}</div></Glass><div className="space-y-4"><Glass><div className="flex flex-wrap items-center gap-2"><div className="relative min-w-56 flex-1"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><input className="field pl-9" placeholder="搜索设备编号、名称或位置" /></div><select className="field w-auto"><option>全部状态</option><option>运行中</option><option>预警</option></select><Button variant="outline"><Filter className="size-4" />高级筛选</Button><div className="ml-auto flex rounded-md border border-border bg-background p-0.5"><Button variant={table ? "secondary" : "ghost"} size="icon" onClick={() => setTable(true)} aria-label="表格视图"><List className="size-4" /></Button><Button variant={!table ? "secondary" : "ghost"} size="icon" onClick={() => setTable(false)} aria-label="卡片视图"><Grid2X2 className="size-4" /></Button></div></div></Glass>{table ? <Glass title="设备资产清单" sub="共 1,286 台设备"><div className="overflow-x-auto"><table className="data-table"><thead><tr><th>设备编号</th><th>设备名称</th><th>所在区域</th><th>实时状态</th><th>健康度</th><th>操作</th></tr></thead><tbody>{assets.map((a) => <tr key={a[0]}><td className="font-digital text-primary">{a[0]}</td><td>{a[1]}</td><td>{a[2]}</td><td><Status value={a[3]} /></td><td><div className="flex items-center gap-2"><div className="h-1.5 w-20 rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: a[4] }} /></div>{a[4]}</div></td><td><Button variant="ghost" size="sm" onClick={() => setSelected(a)}>详情<ChevronRight className="size-3" /></Button></td></tr>)}</tbody></table></div></Glass> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{assets.map((a) => <Glass key={a[0]}><div className="mb-4 flex justify-between"><span className="font-digital text-sm text-primary">{a[0]}</span><Status value={a[3]} /></div><Cpu className="mb-4 size-9 text-primary" /><h3 className="font-semibold">{a[1]}</h3><p className="text-xs text-muted-foreground">{a[2]}</p><Button className="mt-5 w-full" variant="outline" onClick={() => setSelected(a)}>查看设备档案</Button></Glass>)}</div>}</div>{selected && <Drawer title="设备资产详情" onClose={() => setSelected(null)}><div className="asset-visual"><Cpu className="size-16" /></div><h2 className="mt-5 text-xl font-bold">{selected[1]}</h2><p className="font-digital text-primary">{selected[0]}</p><Info label="安装位置" value={selected[2]} /><Info label="当前状态" value={selected[3]} /><Info label="健康指数" value={selected[4]} /><Info label="投运日期" value="2022-06-18" /><Info label="责任工程师" value="王海峰" /><h3 className="mt-6 mb-3 font-semibold">生命周期轨迹</h3>{["设备采购验收", "安装调试完成", "年度大修", "当前运行阶段"].map((x, i) => <div key={x} className="relative ml-2 border-l border-primary/30 pb-5 pl-5 text-sm"><i className="absolute -left-1.5 top-0 size-3 rounded-full bg-primary" /><b>{x}</b><p className="text-xs text-muted-foreground">{2022 + i} 年</p></div>)}</Drawer>}</div>;
}

function Telemetry() {
  const [tick, setTick] = useState(0); useEffect(() => { const id = window.setInterval(() => setTick((x) => x + 1), 2000); return () => window.clearInterval(id); }, []);
  const wave = (offset: number) => Array.from({ length: 30 }, (_, i) => Number((Math.sin((i + tick + offset) / 3) * 8 + 60 + Math.random() * 3).toFixed(1)));
  const waveOption: EChartsOption = { animationDurationUpdate: 500, xAxis: { type: "category", show: false, data: Array.from({ length: 30 }, (_, i) => i) }, yAxis: { type: "value", min: 45, max: 75 }, series: [{ type: "line", smooth: true, symbol: "none", areaStyle: { opacity: .12 }, data: wave(0) }, { type: "line", smooth: true, symbol: "none", data: wave(4) }] };
  return <div className="space-y-4"><div className="grid gap-4 lg:grid-cols-3"><GaugeCard icon={Thermometer} label="轴承温度" value={String(64 + tick % 3)} unit="°C" max="80" /><GaugeCard icon={Activity} label="径向振动" value={(2.6 + tick % 4 / 10).toFixed(1)} unit="mm/s" max="7.1" /><GaugeCard icon={Gauge} label="润滑压力" value={(4.1 + tick % 2 / 10).toFixed(1)} unit="MPa" max="6.0" /></div><div className="grid gap-4 lg:grid-cols-12"><Glass title="关键测点动态波形" sub="CNC-04-018 · 采样频率 1 kHz" className="lg:col-span-8" action={<span className="glass-pill"><RefreshCw className="size-3 animate-spin" />{tick * 2}s</span>}><EChart option={waveOption} className="h-80" /></Glass><Glass title="设备工况热力图" sub="最近 12 小时负载分布" className="lg:col-span-4"><div className="heatmap">{Array.from({ length: 48 }, (_, i) => <div key={i} className={`heat-${(i * 7 + tick) % 5}`} title={`测点 ${i + 1}`} />)}</div><div className="mt-4 flex justify-between text-xs text-muted-foreground"><span>低负载</span><span>高负载</span></div><div className="mt-6 space-y-3"><MetricLine label="主轴转速" value="8,420 rpm" /><MetricLine label="进给速度" value="1,260 mm/min" /><MetricLine label="主轴负载" value="68.4%" /><MetricLine label="切削时长" value="06:42:18" /></div></Glass></div></div>;
}

function Alarms() {
  const [assigned, setAssigned] = useState(false); const [detail, setDetail] = useState(false);
  const bar: EChartsOption = { xAxis: { type: "category", data: ["紧急", "严重", "一般", "提示"] }, yAxis: { type: "value" }, series: [{ type: "bar", barWidth: 28, data: [{ value: 3, itemStyle: { color: palette[4] } }, { value: 8, itemStyle: { color: palette[3] } }, { value: 24, itemStyle: { color: palette[0] } }, { value: 42, itemStyle: { color: palette[1] } }], label: { show: true, position: "top" } }] };
  const cards = ["空压机排气温度过高", "循环泵振动超限", "机器人伺服电流异常", "配电柜温升预警", "冷却塔液位偏低"];
  return <div className="space-y-4"><div className="grid gap-4 lg:grid-cols-3"><Glass title="告警等级统计" sub="今日新增 77 条"><EChart option={bar} className="h-64" /></Glass><Glass title="响应时效漏斗" sub="平均响应 8.6 分钟"><div className="funnel"><div className="w-full bg-primary">接收 77</div><div className="w-[82%] bg-cyan">确认 63</div><div className="w-[60%] bg-warning">响应 46</div><div className="w-[42%] bg-success">关闭 32</div></div></Glass><Glass title="调度概览" sub="当前班次"><div className="grid grid-cols-2 gap-3">{[["在线工程师", "18"], ["待派工单", "7"], ["处理中", "14"], ["超时风险", "3"]].map(([a,b]) => <div className="stat-box" key={a}><b>{b}</b><span>{a}</span></div>)}</div><Button className="mt-4 w-full" onClick={() => setAssigned(true)}><Zap className="size-4" />一键智能派单</Button></Glass></div><Glass title="工单流转看板" sub="拖拽式调度视图"><div className="grid gap-3 md:grid-cols-4">{["待分派", "已响应", "处理中", "待验收"].map((stage, col) => <div className="kanban" key={stage}><div className="mb-3 flex justify-between text-sm font-semibold"><span>{stage}</span><span className="count">{col + 2}</span></div>{cards.slice(col, col + (col === 0 ? 3 : 2)).map((x, i) => <button className="ticket" key={x} onClick={() => setDetail(true)}><span className={i === 0 && col === 0 ? "severity-high" : "severity-med"}>{i === 0 ? "紧急" : "一般"}</span><b>{x}</b><small>工单 WO-2609{col}{i + 2}</small><div><span>陈工</span><span>{8 + col * 4} 分钟</span></div></button>)}</div>)}</div></Glass>{assigned && <Modal title="智能派单完成" onClose={() => setAssigned(false)}><div className="success-check"><Check /></div><p className="text-center text-sm text-muted-foreground">已根据技能、距离与负荷完成 7 张工单派发。</p><Button className="mt-5 w-full" onClick={() => setAssigned(false)}>查看派单结果</Button></Modal>}{detail && <Modal title="告警处置" onClose={() => setDetail(false)}><Info label="告警设备" value="AIR-02-006 螺杆空压机" /><Info label="告警时间" value="09:42:18" /><Info label="触发值" value="104.2 °C（阈值 95 °C）" /><textarea className="field mt-4 min-h-24" placeholder="填写处置说明" /><Button className="mt-3 w-full" onClick={() => setDetail(false)}>确认处置并关闭</Button></Modal>}</div>;
}

function Inspection() {
  const [checked, setChecked] = useState(false);
  const ring: EChartsOption = { series: [{ type: "pie", radius: ["68%", "84%"], label: { show: true, position: "center", formatter: "92%\n完成率", fontSize: 18, fontWeight: "bold" }, data: [{ value: 92, itemStyle: { color: palette[0] } }, { value: 8, itemStyle: { color: "#e8f1fb" } }] }] };
  return <div className="space-y-4"><div className="grid gap-4 lg:grid-cols-12"><Glass title="九月巡检日历" sub="今日 6 条任务" className="lg:col-span-5"><CalendarGrid /></Glass><Glass title="巡检完成率" sub="本月累计" className="lg:col-span-3"><EChart option={ring} className="h-64" /><div className="grid grid-cols-2 gap-2"><MetricStrip title="已完成" value="286" rate="项" compact /><MetricStrip title="待执行" value="24" rate="项" compact /></div></Glass><Glass title="今日巡检路线" sub="动力站房 A 线" className="lg:col-span-4"><RouteTrack /><Button className="mt-4 w-full" onClick={() => setChecked(true)}><Radio className="size-4" />移动端模拟打卡</Button></Glass></div><Glass title="预防性维护计划" sub="未来 30 天计划"><Table headers={["计划编号", "设备", "保养项目", "计划日期", "责任班组", "状态"]} rows={[["PM-260921-01", "五轴加工中心", "主轴润滑系统保养", "09-23", "机修一组", "待执行"], ["PM-260924-03", "螺杆空压机", "油滤与空滤更换", "09-25", "动力组", "已排期"], ["PM-261002-08", "焊装机器人", "减速器间隙检测", "10-02", "自动化组", "待确认"], ["PM-261008-11", "干式变压器", "绝缘电阻检测", "10-08", "电气组", "待执行"]]} /></Glass>{checked && <Modal title="巡检打卡" onClose={() => setChecked(false)}><div className="scan"><Radio className="size-12" /><span>已识别 NFC 点位</span><b>动力站房 · 2# 空压机</b></div><label className="text-sm font-medium">设备状态</label><div className="mt-2 grid grid-cols-3 gap-2"><Button variant="outline">正常</Button><Button variant="outline">异常</Button><Button variant="outline">停机</Button></div><Button className="mt-4 w-full" onClick={() => setChecked(false)}>提交巡检记录</Button></Modal>}</div>;
}

function Spares() {
  const [request, setRequest] = useState(false);
  const stock: EChartsOption = { xAxis: { type: "category", data: ["4月", "5月", "6月", "7月", "8月", "9月"] }, yAxis: [{ type: "value" }, { type: "value" }], legend: { data: ["入库", "出库", "库存金额"] }, series: [{ name: "入库", type: "bar", data: [82, 96, 76, 112, 89, 105] }, { name: "出库", type: "bar", data: [65, 88, 91, 73, 102, 96] }, { name: "库存金额", type: "line", yAxisIndex: 1, smooth: true, data: [128, 136, 132, 145, 139, 142] }] };
  return <div className="space-y-4"><div className="grid gap-4 lg:grid-cols-12"><Glass title="安全库存预警" sub="12 种物料低于安全线" className="lg:col-span-4"><WaterLevel value={68} /><div className="mt-5 space-y-3"><MetricLine label="库存品类" value="3,842 SKU" /><MetricLine label="库存总额" value="¥ 142.6 万" /><MetricLine label="周转天数" value="28.4 天" /></div></Glass><Glass title="出入库趋势" sub="数量 / 库存金额（万元）" className="lg:col-span-8"><EChart option={stock} className="h-80" /></Glass></div><Glass title="物料与批次追踪" sub="库存更新于 09:52" action={<Button onClick={() => setRequest(true)}><Plus className="size-4" />领用申请</Button>}><Table headers={["物料编码", "物料名称", "规格型号", "当前库存", "安全库存", "最新批次", "状态"]} rows={[["SP-00182", "主轴轴承", "SKF 7014 CE", "8 件", "10 件", "B260815-03", "库存偏低"], ["SP-00316", "液压滤芯", "HX-160×20", "36 件", "20 件", "B260903-01", "充足"], ["SP-00842", "伺服电机", "1FK7103", "4 台", "3 台", "B260712-02", "正常"], ["SP-01205", "空压机油", "S-46 / 20L", "12 桶", "15 桶", "B260821-08", "库存偏低"]]} /></Glass>{request && <Drawer title="物料领用申请" onClose={() => setRequest(false)}><Field label="领用设备" placeholder="搜索设备编号" /><Field label="物料编码" placeholder="选择备件物料" /><Field label="领用数量" placeholder="输入数量" /><Field label="用途说明" placeholder="填写维修任务或工单编号" /><Button className="mt-6 w-full" onClick={() => setRequest(false)}>提交领用申请</Button></Drawer>}</div>;
}

function Diagnostics() {
  const decline: EChartsOption = { legend: { data: ["健康指数", "预测值", "检修阈值"] }, xAxis: { type: "category", data: ["4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月"] }, yAxis: { type: "value", min: 50, max: 100 }, series: [{ name: "健康指数", type: "line", smooth: true, data: [94, 92, 90, 88, 85, 81, null, null] }, { name: "预测值", type: "line", smooth: true, lineStyle: { type: "dashed" }, data: [null, null, null, null, null, 81, 76, 69] }, { name: "检修阈值", type: "line", symbol: "none", data: [70,70,70,70,70,70,70,70], lineStyle: { color: palette[4], type: "dotted" } }] };
  const pie: EChartsOption = { legend: { orient: "vertical", left: "right", top: "middle" }, series: [{ type: "pie", radius: ["42%", "70%"], center: ["35%", "50%"], label: { show: false }, data: [{ name: "润滑系统", value: 32 }, { name: "电气系统", value: 26 }, { name: "机械磨损", value: 21 }, { name: "操作因素", value: 13 }, { name: "其他", value: 8 }] }] };
  return <div className="space-y-4"><div className="grid gap-4 md:grid-cols-3"><Kpi icon={Zap} label="单位产量能耗" value="12.4" unit="kWh" delta="↓ 5.8%" tone="cyan" /><Kpi icon={Activity} label="综合健康指数" value="86.2" unit="分" delta="↑ 2.1" /><Kpi icon={ShieldCheck} label="预测准确率" value="94.6" unit="%" delta="近 30 天" tone="success" /></div><div className="grid gap-4 lg:grid-cols-5"><Glass title="设备衰退趋势预测" sub="AI 预测未来 60 天健康变化" className="lg:col-span-3"><EChart option={decline} /></Glass><Glass title="故障根因分布" sub="近 90 天故障归因" className="lg:col-span-2"><EChart option={pie} /></Glass></div><Glass title="节能优化建议" sub="基于实时工况与历史基线生成"><div className="grid gap-3 md:grid-cols-3"><Advice icon={Zap} title="空压系统压力优化" saving="预计节省 ¥2.8万/月" text="将主管压力由 0.72MPa 下调至 0.68MPa，并修复 3 处泄漏点。" /><Advice icon={Activity} title="加工中心待机策略" saving="预计节省 18.6MWh/月" text="对夜班低负载设备启用 15 分钟自动休眠策略。" /><Advice icon={Thermometer} title="冷却水温差优化" saving="能效提升约 7.2%" text="调整冷冻泵变频下限，目标供回水温差 5.5°C。" /></div></Glass></div>;
}

function SettingsPage() {
  const [push, setPush] = useState([true, true, false, true]);
  return <div className="grid gap-4 lg:grid-cols-2"><Glass title="班次人员排班" sub="本周值班安排"><div className="schedule">{["周一 21", "周二 22", "周三 23", "周四 24", "周五 25"].map((day, i) => <div key={day}><b>{day}</b><span>早班 · {i % 2 ? "王海峰" : "陈志强"}</span><span>晚班 · {i % 2 ? "刘杰" : "李晓燕"}</span></div>)}</div><Button variant="outline" className="mt-4"><CalendarCheck className="size-4" />编辑排班</Button></Glass><Glass title="告警推送渠道" sub="按告警等级匹配通知方式"><div className="space-y-3">{[["短信通知", "紧急与严重告警"], ["企业微信", "所有告警"], ["邮件摘要", "每日 08:00 汇总"], ["语音外呼", "仅紧急告警"]].map(([a,b], i) => <div className="setting-row" key={a}><div><b>{a}</b><p>{b}</p></div><button aria-label={`切换${a}`} onClick={() => setPush((old) => old.map((v, n) => n === i ? !v : v))} className={`switch ${push[i] ? "on" : ""}`}><i /></button></div>)}</div></Glass><Glass title="点检指标阈值规则" sub="触发后自动生成告警"><Table headers={["指标名称", "预警阈值", "告警阈值", "延迟", "状态"]} rows={[["轴承温度", "> 75°C", "> 85°C", "30s", "启用"], ["径向振动", "> 4.5mm/s", "> 7.1mm/s", "10s", "启用"], ["润滑压力", "< 3.2MPa", "< 2.8MPa", "15s", "启用"]]} /><Button variant="outline" className="mt-4"><Plus className="size-4" />添加规则</Button></Glass><Glass title="操作审计日志" sub="关键配置变更记录"><div className="space-y-1">{[["09:46:20", "林运维", "调整轴承温度预警阈值"], ["09:12:04", "系统管理员", "新增巡检路线 A-04"], ["08:35:42", "王海峰", "修改夜班值守人员"], ["昨日 17:28", "林运维", "启用企业微信推送"]].map(([t,u,a]) => <div className="audit" key={t}><span className="font-digital text-xs text-primary">{t}</span><b>{u}</b><p>{a}</p></div>)}</div></Glass></div>;
}

function AlarmList({ compact = false }: { compact?: boolean }) { return <div className="space-y-2">{[["紧急", "空压机排气温度过高", "AIR-02-006 · 刚刚"], ["严重", "循环泵振动超限", "PMP-01-023 · 4分钟前"], ["一般", "冷却塔液位偏低", "CLT-01-009 · 12分钟前"], ...(compact ? [["提示", "滤芯寿命即将到期", "CNC-04-018 · 25分钟前"]] : [])].map(([level, title, sub]) => <button className="alarm-row" key={title}><span className={`severity-${level === "紧急" ? "high" : level === "严重" ? "med" : "low"}`}>{level}</span><span className="min-w-0 flex-1 text-left"><b>{title}</b><small>{sub}</small></span><ChevronRight className="size-4 text-muted-foreground" /></button>)}</div> }
function MetricStrip({ title, value, rate, compact = false }: { title: string; value: string; rate: string; compact?: boolean }) { return <div className={compact ? "stat-box" : "glass-card flex items-center justify-between"}><span className="text-xs text-muted-foreground">{title}</span><b className="font-digital text-lg">{value}</b><span className="text-xs text-primary">{rate}</span></div> }
function TreeItem({ label, count, active, indent }: { label: string; count: string; active?: boolean; indent?: boolean }) { return <button className={`tree-item ${active ? "active" : ""} ${indent ? "ml-4" : ""}`}><span>{label}</span><span>{count}</span></button> }
function Status({ value }: { value: string }) { return <span className={`status ${value === "运行中" || value === "充足" || value === "正常" || value === "启用" ? "ok" : value.includes("预警") || value.includes("偏低") ? "warn" : "idle"}`}><i />{value}</span> }
function Info({ label, value }: { label: string; value: string }) { return <div className="info"><span>{label}</span><b>{value}</b></div> }
function MetricLine({ label, value }: { label: string; value: string }) { return <div className="flex justify-between border-b border-border/70 pb-2 text-sm"><span className="text-muted-foreground">{label}</span><b className="font-digital">{value}</b></div> }
function GaugeCard({ icon: Icon, label, value, unit, max }: { icon: typeof Gauge; label: string; value: string; unit: string; max: string }) { return <Glass><div className="flex items-center justify-between"><div className="kpi-icon tone-primary"><Icon className="size-5" /></div><Status value="运行中" /></div><p className="mt-5 text-sm text-muted-foreground">{label}</p><p className="font-digital text-4xl font-bold">{value}<small className="ml-1 text-sm">{unit}</small></p><div className="mt-4 h-2 rounded-full bg-secondary"><div className="h-full w-2/3 rounded-full bg-primary shadow-glow" /></div><p className="mt-2 text-xs text-muted-foreground">量程上限 {max} {unit}</p></Glass> }
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) { return <div className="overflow-x-auto"><table className="data-table"><thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={c}>{i === r.length - 1 ? <Status value={c} /> : c}</td>)}</tr>)}</tbody></table></div> }
function CalendarGrid() { return <div><div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">{"一二三四五六日".split("").map((x) => <span key={x}>周{x}</span>)}</div><div className="mt-2 grid grid-cols-7 gap-1">{Array.from({ length: 35 }, (_, i) => <button key={i} className={`calendar-day ${i === 20 ? "today" : ""} ${[5,8,13,17,20,25].includes(i) ? "task" : ""}`}>{i < 2 ? 30 + i : i - 1}</button>)}</div></div> }
function RouteTrack() { return <div className="route-track">{[["08:30", "冷却泵房", true], ["09:10", "空压站", true], ["10:00", "配电中心", false], ["10:45", "污水处理站", false]].map(([t,n,done]) => <div key={String(t)}><i className={done ? "done" : ""}>{done ? <Check /> : null}</i><span><b>{n}</b><small>{t} · {done ? "已完成" : "待到达"}</small></span></div>)}</div> }
function WaterLevel({ value }: { value: number }) { return <div className="water-wrap"><div className="water" style={{ height: `${value}%` }} /><span><b>{value}%</b><small>库存健康水位</small></span></div> }
function Advice({ icon: Icon, title, saving, text }: { icon: typeof Zap; title: string; saving: string; text: string }) { return <div className="advice"><div className="kpi-icon tone-success"><Icon className="size-5" /></div><h3>{title}</h3><b>{saving}</b><p>{text}</p><Button variant="ghost" size="sm">查看实施方案<ChevronRight className="size-3" /></Button></div> }
function Field({ label, placeholder }: { label: string; placeholder: string }) { return <label className="mt-4 block text-sm font-medium">{label}<input className="field mt-2" placeholder={placeholder} /></label> }
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) { return <div className="overlay" onMouseDown={onClose}><div className="modal" onMouseDown={(e) => e.stopPropagation()}><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold">{title}</h2><Button variant="ghost" size="icon" onClick={onClose}><X className="size-4" /></Button></div>{children}</div></div> }
function Drawer({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) { return <div className="overlay justify-end" onMouseDown={onClose}><aside className="drawer" onMouseDown={(e) => e.stopPropagation()}><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold">{title}</h2><Button variant="ghost" size="icon" onClick={onClose}><X className="size-4" /></Button></div>{children}</aside></div> }