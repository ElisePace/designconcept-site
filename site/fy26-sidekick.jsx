// Blue Insights — Research sidekick panel pieces
const { useState, useEffect, useRef } = React;
const DS = window.BlueInsightsDesignSystem_2bb2cd;
const { Button, IconButton, Badge, Avatar, Card, Alert, Modal, Checkbox, Textarea, ProgressBar, FindingSection, RefBadge, SourceRow, StepList, AiChip } = DS;

const Icon = ({ d, size = 14, sw = 2, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{children || <path d={d}></path>}</svg>
);
const IconRefresh = (p) => <Icon {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"></path><path d="M3 3v5h5"></path></Icon>;
const IconCheck = (p) => <Icon {...p} d="M20 6L9 17l-5-5" />;
const IconShare = (p) => <Icon {...p}><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"></path><path d="M12 15V3M8 7l4-4 4 4"></path></Icon>;
const IconLock = (p) => <Icon {...p}><rect x="4" y="11" width="16" height="9" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></Icon>;

const EYEBROW = { fontSize: 11, fontWeight: 'var(--font-weight-semibold)', letterSpacing: 'var(--letter-spacing-label)', textTransform: 'uppercase', color: 'var(--color-text-muted)' };
const TNUM = { fontFeatureSettings: "'tnum' 1, 'lnum' 1" };

function UpdatedBadge() {
  return <Badge tone="primary" uppercase style={{ gap: 4 }}><IconRefresh size={10} sw={3} />Updated</Badge>;
}

function SidekickHeader({ onClose, canShare, onShare }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, height: 60, padding: '0 16px', borderBottom: '1px solid var(--color-border)', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-soft)' }}>
          <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: 'var(--radius-pill)', background: 'var(--color-primary)' }}></span>
        </span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', lineHeight: 1.2 }}>Research sidekick</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.3 }}>Show your working</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {canShare && <Button variant="secondary" size="sm" leadingIcon={<IconShare size={14} />} onClick={onShare} style={{ color: 'var(--color-primary)' }}>Share / export</Button>}
        <IconButton variant="ghost" size="sm" ariaLabel="Collapse panel" onClick={onClose}><Icon size={16}><path d="M13 6l6 6-6 6M5 6l6 6-6 6"></path></Icon></IconButton>
      </div>
    </div>
  );
}

function SharedGoalBanner({ phase, step, corrected, status }) {
  const pct = phase === 'idle' ? 0 : phase === 'working' ? Math.round(((Math.min(step, PIPELINE.length - 1) + 1) / PIPELINE.length) * 80) : corrected ? 100 : 80;
  const turn = turnLabel(phase);
  const working = phase === 'working';
  return (
    <div style={{ flexShrink: 0, padding: '10px 16px 12px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-primary-soft)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <span style={{ display: 'flex', flexShrink: 0 }} aria-hidden="true">
            <Avatar initials="AR" size={24} style={{ fontSize: 10, boxShadow: '0 0 0 2px var(--color-canvas)' }} />
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, marginLeft: -6, borderRadius: 'var(--radius-pill)', background: 'var(--color-primary)', boxShadow: '0 0 0 2px var(--color-canvas)' }}>
              <span className={working ? 'pulse-dot' : ''} style={{ width: 7, height: 7, borderRadius: 'var(--radius-pill)', background: '#fff' }}></span>
            </span>
          </span>
          <span style={{ fontSize: 12.5, fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Shared goal: an answer you can defend.</span>
        </div>
        <span key={turn} className="swap-in" style={{ flexShrink: 0 }}><Badge tone={working ? 'primary' : 'warning'} dot>{turn}</Badge></span>
      </div>
      <ProgressBar value={pct} height={3} style={{ marginTop: 10, background: 'var(--color-border)' }} aria-label="Progress towards a defensible answer" />
      <div style={{ marginTop: 7 }} aria-live="polite" aria-atomic="true">
        <span key={status} className="swap-in" style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{status}</span>
      </div>
    </div>
  );
}

function Working({ step, sourceCount, correcting }) {
  const pct = Math.min(100, Math.round(((step + 0.5) / PIPELINE.length) * 100));
  const steps = PIPELINE.map((p, i) => ({
    label: p.label + (step === i ? '…' : ''),
    state: step > i ? 'done' : step === i ? 'active' : 'pending',
    note: p.key === 'retrieve' && step >= i ? `${sourceCount}/3` : null,
  }));
  return (
    <div>
      {correcting && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 13.5, fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary)' }}>
          <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: 'var(--radius-pill)', background: 'var(--color-primary)' }}></span>
          Re-checking with your correction…
        </div>
      )}
      <ProgressBar value={pct} height={4} style={{ marginBottom: 20 }} />
      <StepList steps={steps} style={{ gap: 16 }} />
      {step === PIPELINE.length - 1 && <div className="shimmer" style={{ height: 14, width: 96, borderRadius: 'var(--radius-sm)', marginTop: 16, marginLeft: 32 }}></div>}
    </div>
  );
}

function SourceDrawer({ source, onBack }) {
  const open = source !== null;
  const shownRef = useRef(source);
  if (source) shownRef.current = source;
  const s = shownRef.current;
  return (
    <div aria-hidden={!open} inert={open ? undefined : ''} style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', background: 'var(--color-canvas)', transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 250ms var(--ease-standard)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 60, padding: '0 12px', borderBottom: '1px solid var(--color-border)', flexShrink: 0 }}>
        <Button variant="ghost" size="sm" onClick={onBack} leadingIcon={<Icon size={16}><path d="M15 18l-6-6 6-6"></path></Icon>} style={{ color: 'var(--color-primary)' }}>Back to answer</Button>
        <span style={{ ...EYEBROW, marginLeft: 'auto' }}>Source preview</span>
      </div>
      {s && (
        <div className="scroll-quiet" style={{ minHeight: 0, flex: 1, overflow: 'auto', padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ ...TNUM, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, flexShrink: 0, borderRadius: 'var(--radius-sm)', background: 'var(--color-primary)', color: '#fff', fontSize: 12, fontWeight: 'var(--font-weight-semibold)' }}>{s.id}</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', lineHeight: 1.3 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>{s.type}</div>
            </div>
          </div>
          <div style={{ ...TNUM, marginTop: 12, fontSize: 12, color: 'var(--color-text-muted)' }}>{s.updated}</div>
          <div style={{ ...TNUM, whiteSpace: 'pre-wrap', marginTop: 12, padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-1)', fontSize: 12.5, lineHeight: 'var(--line-height-relaxed, 1.6)', color: 'var(--color-text-primary)' }}>{s.snippet}</div>
          <div style={{ ...EYEBROW, marginTop: 16 }}>Referenced values</div>
          <div style={{ marginTop: 6, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {s.rows.map((r, i) => (
              <div key={r.k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '9px 12px', borderTop: i ? '1px solid var(--color-border)' : 'none' }}>
                <span style={{ fontSize: 12.5, color: 'var(--color-text-secondary)' }}>{r.k}</span>
                <span style={{ ...TNUM, fontSize: 12.5, fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>{r.v}</span>
              </div>
            ))}
          </div>
          <Button fullWidth style={{ marginTop: 16 }} trailingIcon={<Icon size={14}><path d="M7 17L17 7M9 7h8v8"></path></Icon>}>Open source</Button>
        </div>
      )}
    </div>
  );
}

function WhyRow({ n, active, onCite, children }) {
  const [why, setWhy] = useState(false);
  return (
    <li>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ flex: 1 }}>{children}<RefBadge n={n} active={active} onClick={() => onCite(n)} /></span>
        <button onClick={() => setWhy((w) => !w)} style={{ flexShrink: 0, marginTop: 1, padding: '2px 7px', border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-sans)', fontSize: 11.5, fontWeight: 'var(--font-weight-semibold)', color: why ? '#fff' : 'var(--color-text-secondary)', background: why ? 'var(--color-text-secondary)' : 'var(--color-surface-2)' }}>Why?</button>
      </div>
      {why && <p className="rise" style={{ margin: '6px 0 0', paddingLeft: 10, borderLeft: '2px solid var(--color-secondary)', fontSize: 12.5, lineHeight: 1.55, color: 'var(--color-text-secondary)' }}>{WHY[n]}</p>}
    </li>
  );
}

function RestrictedRow() {
  const [requested, setRequested] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-2)' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, flexShrink: 0, borderRadius: 'var(--radius-sm)', background: 'var(--color-error-bg)', color: 'var(--color-error)' }}><IconLock size={13} sw={2.2} /></span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)' }}>Salesforce — EMEA opportunities</div>
        <div style={{ ...EYEBROW, color: 'var(--color-error)' }}>Restricted</div>
      </div>
      {requested ? (
        <span className="rise" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, flexShrink: 0, fontSize: 11.5, fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary)' }}><IconCheck size={13} sw={2.6} />Access requested</span>
      ) : (
        <Button variant="outlinePrimary" size="sm" onClick={() => setRequested(true)}>Request access</Button>
      )}
    </div>
  );
}

function useCountUp(target, run) {
  const [n, setN] = useState(run ? 0 : target);
  useEffect(() => {
    if (!run || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(target); return; }
    let i = 0;
    const id = window.setInterval(() => { i += 1; setN(Math.min(i, target)); if (i >= target) window.clearInterval(id); }, 90);
    return () => window.clearInterval(id);
  }, [target, run]);
  return n;
}

function TrustMeter({ corrected }) {
  const sources = useCountUp(ANSWER_BLOCKS.evidence, corrected);
  const filled = corrected ? 3 : 2;
  return (
    <div tabIndex={0} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }} aria-label={`Grounded in ${ANSWER_BLOCKS.evidence} verified sources, ${ANSWER_BLOCKS.assumption} assumption${corrected ? ' resolved' : ''}, ${ANSWER_BLOCKS.unknown} unknown.`}>
      <span style={{ display: 'flex', gap: 3, flexShrink: 0 }} aria-hidden="true">
        {[0, 1, 2].map((i) => <span key={i} style={{ height: 6, width: 16, borderRadius: 'var(--radius-pill)', background: i < filled ? 'var(--color-primary)' : 'var(--color-border)', transition: 'background var(--duration-normal) var(--ease-standard)', transitionDelay: `${i * 40}ms` }}></span>)}
      </span>
      <span style={{ ...TNUM, fontSize: 12, color: 'var(--color-text-muted)' }}>Grounded in {sources} verified sources · {ANSWER_BLOCKS.assumption} assumption{corrected && ' resolved'} · {ANSWER_BLOCKS.unknown} unknown</span>
    </div>
  );
}

function Answer({ quarter, corrected, summary, renewalDrop, pushed, activeCite, onCite, onCorrect, onRunQuarter }) {
  const [showForm, setShowForm] = useState(false);
  const [note, setNote] = useState('Renewals in negotiation aren’t churned');
  const [vote, setVote] = useState(null);
  const [saved, setSaved] = useState(false);
  const [qMenu, setQMenu] = useState(false);
  const [openBlocks, setOpenBlocks] = useState({ evidence: true, assumption: true, unknown: true });
  const toggle = (k) => setOpenBlocks((o) => ({ ...o, [k]: !o[k] }));
  const submit = () => { setShowForm(false); onCorrect(); };
  const strong = { fontWeight: 'var(--font-weight-semibold)', ...TNUM };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {corrected && <Alert tone="info" showIcon={false} className="rise" style={{ alignItems: 'center', gap: 8, background: 'var(--color-primary-soft)', border: '1px solid transparent', color: 'var(--color-primary)', fontWeight: 'var(--font-weight-medium)' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconRefresh size={14} sw={2.2} />Re-ran with your correction — figures updated.</span></Alert>}

      <div className="rise">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={EYEBROW}>Summary</span>
          {corrected && <UpdatedBadge />}
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--color-text-primary)' }}>{summary}</p>
      </div>

      <FindingSection tone="evidence" label="Evidence" meta={corrected ? '3 facts · updated' : '3 facts'} open={openBlocks.evidence} onToggle={() => toggle('evidence')} style={{ background: 'var(--color-surface-1)', borderColor: corrected ? 'var(--color-primary)' : 'var(--color-border)' }}>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: 0, padding: 0, listStyle: 'none' }}>
          <WhyRow n={1} active={activeCite === 1} onCite={onCite}>EMEA enterprise renewals fell <span style={strong}>{renewalDrop}</span> vs prior quarter</WhyRow>
          <WhyRow n={2} active={activeCite === 2} onCite={onCite}><span style={strong}>{pushed}</span> accounts pushed renewal into Q4</WhyRow>
          <WhyRow n={3} active={activeCite === 3} onCite={onCite}>New-business bookings were <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>flat</span>, not down</WhyRow>
        </ul>
      </FindingSection>

      <FindingSection tone="assumption" label="Assumption" open={openBlocks.assumption} onToggle={() => toggle('assumption')} style={{ background: 'var(--color-surface-1)', borderColor: corrected ? 'var(--color-primary)' : 'var(--color-border)' }}>
        {!corrected ? (
          <>
            <p style={{ margin: 0 }}>Assumes the <span style={strong}>4</span> renewals still “in negotiation” are treated as churned<RefBadge n={2} active={activeCite === 2} onClick={() => onCite(2)} />.</p>
            {!showForm ? (
              <Button variant="secondary" size="sm" onClick={() => setShowForm(true)} style={{ marginTop: 10, borderColor: 'var(--color-warning)', color: 'var(--color-warning-fg)' }}>This doesn’t hold</Button>
            ) : (
              <div className="rise" style={{ marginTop: 10, padding: 10, border: '1px solid var(--color-warning)', borderRadius: 'var(--radius-lg)', background: 'var(--color-warning-bg)' }}>
                <label style={{ ...EYEBROW, color: 'var(--color-warning-fg)' }}>What’s wrong with this assumption?</label>
                <Textarea value={note} rows={2} onChange={(e) => setNote(e.target.value)} style={{ marginTop: 6, resize: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                  <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
                  <Button size="sm" disabled={!note.trim()} onClick={submit}>Re-run with this</Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <p style={{ margin: 0, textDecoration: 'line-through', color: 'var(--color-text-muted)' }}>Assumes the 4 renewals still “in negotiation” are treated as churned.</p>
            <p style={{ margin: '6px 0 0' }}>The <span style={strong}>4</span> in-negotiation renewals are counted as <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>open</span>, not churned<RefBadge n={2} active={activeCite === 2} onClick={() => onCite(2)} />.</p>
            <p style={{ margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' }}><IconCheck size={13} sw={2.6} />Applied your correction: “{note.trim()}”</p>
          </>
        )}
      </FindingSection>

      <FindingSection tone="unknown" label="Unknown" open={openBlocks.unknown} onToggle={() => toggle('unknown')} style={{ background: 'var(--color-surface-1)' }}>
        <p style={{ margin: 0 }}>Can’t confirm whether {quarter} discount changes affected deal size — that data isn’t in your permitted scope.</p>
        <div style={{ marginTop: 10 }}><RestrictedRow /></div>
      </FindingSection>

      <button className="rise hover-tint-subtle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, textAlign: 'left', padding: '12px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
        <span>
          <span style={{ ...EYEBROW, color: 'var(--color-primary)' }}>Suggested next check</span>
          <span style={{ display: 'block', marginTop: 3, fontSize: 13.5, fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>Compare EMEA renewal cohort to APAC</span>
        </span>
        <span style={{ flexShrink: 0, padding: '6px 12px', borderRadius: 'var(--radius-md)', background: 'var(--color-primary)', color: '#fff', fontSize: 12.5, fontWeight: 'var(--font-weight-semibold)' }}>Run check</span>
      </button>

      <div className="rise" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button variant={saved ? 'outlinePrimary' : 'secondary'} size="sm" fullWidth disabled={saved} onClick={() => setSaved(true)} leadingIcon={saved ? <IconCheck size={14} sw={2.4} /> : <Icon size={14}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></Icon>} style={{ opacity: 1, color: 'var(--color-primary)', background: saved ? 'var(--color-primary-soft)' : undefined }}>{saved ? 'Saved as repeatable check' : 'Save as repeatable check'}</Button>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <Button variant="secondary" size="sm" onClick={() => setQMenu((m) => !m)} trailingIcon={<Icon size={13} sw={2.2}><path d="M6 9l6 6 6-6"></path></Icon>}>Re-run</Button>
          {qMenu && (
            <div className="rise" style={{ position: 'absolute', right: 0, bottom: '100%', zIndex: 20, marginBottom: 6, width: 184, overflow: 'hidden', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-canvas)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ ...EYEBROW, padding: '7px 12px', borderBottom: '1px solid var(--color-border)' }}>Re-run on another quarter</div>
              {['Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
                <button key={q} className="hover-tint-subtle" onClick={() => { setQMenu(false); onRunQuarter(q); }} style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-sans)', fontSize: 13.5, color: q === quarter ? 'var(--color-primary)' : 'var(--color-text-primary)' }}>
                  <span style={{ ...TNUM, fontWeight: 'var(--font-weight-medium)' }}>{q} FY26</span>
                  {q === quarter && <span style={{ fontSize: 11.5, fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary)' }}>current</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rise" style={{ marginTop: 4, paddingTop: 14, borderTop: '1px solid var(--color-border)' }}>
        <div style={{ ...EYEBROW, marginBottom: 4 }}>Sources in scope</div>
        {SOURCES.map((s) => <SourceRow key={s.id} n={s.id} name={s.title} sublabel={s.type} onAction={() => onCite(s.id)} />)}
        <div style={{ marginTop: 10 }}><RestrictedRow /></div>
      </div>

      <div className="rise" style={{ paddingTop: 14, borderTop: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <Badge tone={corrected ? 'primary' : 'warning'} dot>{corrected ? 'High confidence' : 'Medium confidence'}</Badge>
          <span style={{ ...TNUM, fontSize: 12, color: 'var(--color-text-muted)', textAlign: 'right' }}>Based on 3 sources you can access · 1 restricted</span>
        </div>
        <TrustMeter corrected={corrected} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
          <AiChip kind="accountability">Accountability · audit trail</AiChip>
          <AiChip kind="transparency">Transparency · working shown</AiChip>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 28 }}>
        {vote === null ? (
          <>
            <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Was this useful?</span>
            <IconButton size="sm" ariaLabel="Helpful" onClick={() => setVote('up')}><Icon size={15} sw={1.9}><path d="M7 10v11M2 13v6a2 2 0 0 0 2 2h13.3a2 2 0 0 0 2-1.7l1.4-9a2 2 0 0 0-2-2.3H14V4a2 2 0 0 0-2-2l-3 7v11"></path></Icon></IconButton>
            <IconButton size="sm" ariaLabel="Not helpful" onClick={() => setVote('down')}><Icon size={15} sw={1.9}><path d="M17 14V3M22 11V5a2 2 0 0 0-2-2H6.7a2 2 0 0 0-2 1.7l-1.4 9A2 2 0 0 0 5.3 16H10v4a2 2 0 0 0 2 2l3-7V3"></path></Icon></IconButton>
          </>
        ) : (
          <p className="rise" style={{ margin: 0, fontSize: 12.5, fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' }}>{vote === 'up' ? 'Thanks — noted this explanation as helpful.' : 'Thanks — flagged for review. I’ll tighten the next pass.'}</p>
        )}
      </div>
    </div>
  );
}

const FIGURE_RE = /(\$[\d.]+M|[−-]?\d+(?:\.\d+)?%)/g;

function ShareModal({ summary, onClose, onShared }) {
  const [text, setText] = useState(summary);
  const [reviewed, setReviewed] = useState(false);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const prev = document.activeElement;
    const dialog = document.querySelector('[role="dialog"]');
    dialog?.querySelector('textarea')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); closeRef.current(); return; }
      if (e.key !== 'Tab' || !dialog) return;
      const items = dialog.querySelectorAll('button:not([disabled]), [href], input, textarea, [tabindex]:not([tabindex="-1"])');
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); if (prev && prev.focus) prev.focus(); };
  }, []);
  const figures = Array.from(new Set(text.match(FIGURE_RE) || []));
  const share = () => { if (!reviewed) return; if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {}); onShared(); };
  return (
    <Modal open title="Review before sharing" subtitle="Nothing is exported until you confirm." width={520} onClose={onClose}
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button disabled={!reviewed} onClick={share} leadingIcon={<Icon size={14}><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15V5a2 2 0 0 1 2-2h10"></path></Icon>}>Copy / share</Button></>}>
      <label style={EYEBROW}>Summary to share — edit as needed</label>
      <Textarea value={text} rows={4} onChange={(e) => setText(e.target.value)} style={{ ...TNUM, marginTop: 6, resize: 'none' }} />
      {figures.length > 0 && (
        <Alert tone="warning" title={`Review before sharing — ${figures.length} sensitive figure${figures.length > 1 ? 's' : ''}`} style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
            {figures.map((f) => <span key={f} style={{ ...TNUM, padding: '2px 8px', borderRadius: 'var(--radius-pill)', background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning)', color: 'var(--color-warning-fg)', fontSize: 11.5, fontWeight: 'var(--font-weight-semibold)' }}>{f}</span>)}
          </div>
        </Alert>
      )}
      <Checkbox boxed checked={reviewed} onChange={() => setReviewed((r) => !r)} label="I’ve reviewed this and the figures are OK to share" style={{ marginTop: 14, borderColor: reviewed ? 'var(--color-primary)' : 'var(--color-border)', background: reviewed ? 'var(--color-primary-soft)' : 'var(--color-canvas)' }} />
    </Modal>
  );
}

function Toast({ show }) {
  return (
    <div aria-live="polite" style={{ pointerEvents: 'none', position: 'fixed', bottom: 24, left: '50%', zIndex: 1100, opacity: show ? 1 : 0, transform: `translate(-50%, ${show ? 0 : 8}px)`, transition: 'all var(--duration-normal) var(--ease-standard)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 'var(--radius-lg)', background: '#1E293B', color: '#fff', fontSize: 13.5, fontWeight: 'var(--font-weight-semibold)', boxShadow: 'var(--shadow-lg)' }}>
        <span style={{ color: 'var(--color-secondary-alt)', display: 'inline-flex' }}><IconCheck size={16} sw={2.6} /></span>
        Summary copied — ready to share
      </div>
    </div>
  );
}

Object.assign(window, { Icon, IconRefresh, IconCheck, IconShare, EYEBROW, TNUM, SidekickHeader, SharedGoalBanner, Working, SourceDrawer, Answer, ShareModal, Toast, RestrictedRow });
