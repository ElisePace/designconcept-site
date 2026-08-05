// Blue Insights — FY26 Revenue dashboard shell + revenue chart
const { useState: useS, useEffect: useE, useRef: useR } = React;
const BI = window.BlueInsightsDesignSystem_2bb2cd;

function RevenueChart({ hover, setHover, onExplain }) {
  const W = 660, H = 320, padL = 52, padB = 36, padT = 18, max = 11;
  const plotH = H - padB - padT, plotW = W - padL - 16, bw = 62;
  const gap = (plotW - bw * REVENUE.length) / (REVENUE.length - 1);
  const x = (i) => padL + i * (bw + gap);
  const y = (v) => padT + plotH * (1 - v / max);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }} role="img"
      aria-label={`FY26 revenue by quarter. ${REVENUE.map((q) => `${q.label} $${q.value.toFixed(2)} million${q.projected ? ', projected' : ''}`).join('; ')}. Q3 is down 12% quarter on quarter.`}>
      {[0, 3, 6, 9].map((g) => (
        <g key={g}>
          <line x1={padL} x2={W - 16} y1={y(g)} y2={y(g)} stroke="var(--color-border)" strokeWidth="1"></line>
          <text x={padL - 12} y={y(g) + 4} textAnchor="end" fontSize="11.5" fill="var(--color-text-muted)" style={TNUM}>${g}M</text>
        </g>
      ))}
      {REVENUE.map((q, i) => {
        const isQ3 = q.label === 'Q3';
        const top = y(q.value), h = H - padB - top;
        return (
          <g key={q.label}>
            <rect x={x(i)} y={top} width={bw} height={h} rx="5"
              fill={isQ3 ? (hover ? 'var(--color-primary-hover)' : 'var(--color-chart-bar-active)') : q.projected ? 'var(--color-chart-bar-muted)' : 'var(--color-chart-bar)'}
              stroke={q.projected ? 'var(--color-border)' : 'none'} strokeDasharray={q.projected ? '4 3' : undefined}
              style={{ cursor: isQ3 ? 'pointer' : 'default', transition: 'fill var(--duration-normal) var(--ease-standard)' }}
              onMouseEnter={isQ3 ? () => setHover(true) : undefined} onMouseLeave={isQ3 ? () => setHover(false) : undefined} onClick={isQ3 ? onExplain : undefined}></rect>
            <text x={x(i) + bw / 2} y={H - padB + 19} textAnchor="middle" fontSize="12.5" fill="var(--color-text-muted)">{q.label}{q.projected ? ' ·' : ''}</text>
            <text x={x(i) + bw / 2} y={top - 9} textAnchor="middle" fontSize="12.5" fontWeight={isQ3 ? 700 : 500} fill={isQ3 ? 'var(--color-text-primary)' : 'var(--color-text-muted)'} style={TNUM}>${q.value.toFixed(2)}M</text>
          </g>
        );
      })}
    </svg>
  );
}

function App() {
  const [hover, setHover] = useS(false);
  const [open, setOpen] = useS(false);
  const [phase, setPhase] = useS('idle');
  const [dark, setDark] = useS(false);
  const [step, setStep] = useS(-1);
  const [sourceCount, setSourceCount] = useS(0);
  const [corrected, setCorrected] = useS(false);
  const [correcting, setCorrecting] = useS(false);
  const [activeCite, setActiveCite] = useS(null);
  const [shareOpen, setShareOpen] = useS(false);
  const [toast, setToast] = useS(false);
  const [quarter, setQuarter] = useS('Q3');
  const timers = useR([]);

  useE(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useE(() => {
    if (open) document.getElementById('sidekick-heading')?.focus();
  }, [open]);

  const clearTimers = () => { timers.current.forEach((t) => window.clearTimeout(t)); timers.current = []; };
  useE(() => () => clearTimers(), []);

  const runPipeline = (asCorrection) => {
    clearTimers();
    setActiveCite(null); setCorrecting(asCorrection); setPhase('working'); setStep(0); setSourceCount(0);
    const stepMs = asCorrection ? 460 : 700;
    PIPELINE.forEach((_, i) => timers.current.push(window.setTimeout(() => setStep(i), i * stepMs)));
    [1, 2, 3].forEach((c, i) => timers.current.push(window.setTimeout(() => setSourceCount(c), stepMs + 140 + i * 150)));
    timers.current.push(window.setTimeout(() => {
      setStep(PIPELINE.length); setPhase('answer'); if (asCorrection) setCorrected(true);
    }, PIPELINE.length * stepMs + 260));
  };

  const explain = () => { setOpen(true); setCorrected(false); setQuarter('Q3'); runPipeline(false); };
  const runQuarter = (q) => { setQuarter(q); setCorrected(false); runPipeline(false); };
  const resetDemo = () => {
    clearTimers(); setOpen(false); setPhase('idle'); setStep(-1); setSourceCount(0);
    setCorrected(false); setCorrecting(false); setActiveCite(null); setShareOpen(false); setToast(false); setQuarter('Q3');
  };

  const sc = SCENARIOS[quarter];
  const summary = corrected
    ? `${quarter} revenue fell ${sc.qoqCorr} QoQ once the 4 renewals still in negotiation are counted as open, not churned. The drop is still EMEA-enterprise-led, but shallower than first reported.`
    : `${quarter} revenue fell ${sc.qoq} QoQ. The drop is concentrated in the EMEA enterprise segment, mostly from delayed renewals.`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', minWidth: 1200, background: 'var(--color-canvas)' }}>
      <BI.AppBar product="Blue Insights" breadcrumb="FY26 Revenue" initials="AM" style={{ flexShrink: 0, height: 60, padding: '0 24px' }}
        right={<>
          <BI.IconButton label="Reset demo" size="sm" onClick={resetDemo}><IconRefresh size={14} sw={2.2} /></BI.IconButton>
          <BI.IconButton label={dark ? 'Light' : 'Dark'} size="sm" ariaLabel={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => setDark((d) => !d)}>
            {dark
              ? <Icon size={14} sw={2.2}><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></Icon>
              : <Icon size={14} sw={2.2} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />}
          </BI.IconButton>
        </>} />

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <main className="scroll-quiet" style={{ flex: 1, minWidth: 0, overflow: 'auto', padding: '40px 48px' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
              <div>
                <h1 style={{ margin: 0, fontSize: 24, fontWeight: 'var(--font-weight-semibold)', letterSpacing: '-0.01em', color: 'var(--color-text-primary)' }}>Revenue by quarter</h1>
                <p style={{ margin: '4px 0 0', fontSize: 13.5, color: 'var(--color-text-muted)' }}>Fiscal year 2026 · consolidated · USD</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ ...TNUM, fontSize: 22, fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>$35.30M</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>FY to date</div>
              </div>
            </div>

            <div style={{ position: 'relative', marginTop: 20, padding: '20px 20px 8px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', background: 'var(--color-surface-1)' }}>
              <RevenueChart hover={hover} setHover={setHover} onExplain={explain} />
              <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={explain}
                style={{ position: 'absolute', left: '53%', top: 110, display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', padding: '9px 12px', cursor: 'pointer', borderRadius: 'var(--radius-lg)', background: 'var(--color-canvas)', border: `1px solid ${hover ? 'var(--color-primary)' : 'var(--color-border)'}`, boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)', transform: hover ? 'translateY(-1px)' : 'none', transition: 'all var(--duration-fast) var(--ease-standard)', fontFamily: 'var(--font-sans)' }}>
                <span style={{ width: 7, height: 7, flexShrink: 0, borderRadius: 'var(--radius-pill)', background: 'var(--color-primary)' }}></span>
                <span>
                  <span style={{ display: 'block', fontSize: 12.5, fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>Revenue dipped in Q3</span>
                  <span style={{ ...TNUM, fontSize: 12, color: 'var(--color-error)' }}>−12% QoQ</span>
                </span>
                <span style={{ marginLeft: 4, padding: '5px 9px', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-soft)', color: 'var(--color-primary)', fontSize: 12, fontWeight: 'var(--font-weight-semibold)' }}>Explain this</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16 }}>
              <BI.KpiCard label="QoQ growth" value="−12.0%" delta={corrected && quarter === 'Q3' ? 'reported −12.0% · adjusted −9%' : '▼ vs Q2'} deltaTone="negative" />
              <BI.KpiCard label="YoY growth" value="+6.2%" delta="▲ vs FY25" deltaTone="positive" />
              <BI.KpiCard label="Net retention" value="104%" delta="— flat" deltaTone="neutral" />
            </div>

            <p style={{ margin: '16px 0 0', fontSize: 12, color: 'var(--color-text-muted)' }}>
              Q4 is projected · dashed bar. Click the Q3 annotation to ask the Research sidekick to show its working.
              <a href="about.html" style={{ marginLeft: 8, color: 'var(--color-text-muted)', textDecoration: 'underline', textDecorationColor: 'var(--color-border)', textUnderlineOffset: 3 }}>About this concept</a>
            </p>
          </div>
        </main>

        <aside style={{ flexShrink: 0, overflow: 'hidden', width: open ? 460 : 0, borderLeft: open ? '1px solid var(--color-border)' : 'none', background: 'var(--color-canvas)', transition: 'width var(--duration-normal) var(--ease-standard)' }}>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', width: 460, overflow: 'hidden' }}>
            <SidekickHeader onClose={() => setOpen(false)} canShare={phase === 'answer'} onShare={() => setShareOpen(true)} />
            <SharedGoalBanner phase={phase} step={step} corrected={corrected} status={agentStatus(phase, step, sourceCount, correcting)} />
            <div className="scroll-quiet" style={{ minHeight: 0, flex: 1, overflow: 'auto', padding: 16 }}>
              {phase === 'working' && <Working step={step} sourceCount={sourceCount} correcting={correcting} />}
              {phase === 'answer' && (
                <Answer key={`${quarter}-${corrected}`} quarter={quarter} corrected={corrected} summary={summary}
                  renewalDrop={corrected ? sc.renewalCorr : sc.renewal} pushed={corrected ? sc.pushedCorr : sc.pushed}
                  activeCite={activeCite} onCite={setActiveCite} onCorrect={() => runPipeline(true)} onRunQuarter={runQuarter} />
              )}
            </div>
            <SourceDrawer source={SOURCES.find((s) => s.id === activeCite) || null} onBack={() => setActiveCite(null)} />
          </div>
        </aside>
      </div>

      {shareOpen && <ShareModal summary={summary} onClose={() => setShareOpen(false)} onShared={() => { setShareOpen(false); setToast(true); window.setTimeout(() => setToast(false), 3200); }} />}
      <Toast show={toast} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
