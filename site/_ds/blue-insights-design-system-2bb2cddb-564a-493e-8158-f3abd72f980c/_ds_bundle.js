/* @ds-bundle: {"format":4,"namespace":"BlueInsightsDesignSystem_2bb2cd","components":[{"name":"AiChip","sourcePath":"components/ai/AiChip.jsx"},{"name":"FindingSection","sourcePath":"components/ai/FindingSection.jsx"},{"name":"RefBadge","sourcePath":"components/ai/RefBadge.jsx"},{"name":"SourceRow","sourcePath":"components/ai/SourceRow.jsx"},{"name":"StepList","sourcePath":"components/ai/StepList.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"KpiCard","sourcePath":"components/data/KpiCard.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"AppBar","sourcePath":"components/navigation/AppBar.jsx"}],"sourceHashes":{"components/ai/AiChip.jsx":"36f404d89e72","components/ai/FindingSection.jsx":"32a0484a3e9c","components/ai/RefBadge.jsx":"5c57bd32d3c1","components/ai/SourceRow.jsx":"944c9d978b06","components/ai/StepList.jsx":"04282c40d7f2","components/core/Avatar.jsx":"96a27ca21f35","components/core/Badge.jsx":"edb43cb505c7","components/core/Button.jsx":"c1904df96736","components/core/IconButton.jsx":"df6cd22df26b","components/data/Card.jsx":"eddeba69ed3b","components/data/KpiCard.jsx":"ddd0c5ebdb48","components/feedback/Alert.jsx":"0a7f202fcf9f","components/feedback/Modal.jsx":"67750027255c","components/feedback/ProgressBar.jsx":"58e01a88f436","components/forms/Checkbox.jsx":"0387339b902c","components/forms/Input.jsx":"5df0ed73145f","components/forms/Textarea.jsx":"bb5936b3c1bc","components/navigation/AppBar.jsx":"d9e762daac9d","ui_kits/blue-insights/RevenueChart.jsx":"ff207be9f1c1","ui_kits/blue-insights/Sidekick.jsx":"200e5f90df01"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BlueInsightsDesignSystem_2bb2cd = window.BlueInsightsDesignSystem_2bb2cd || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/ai/AiChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* AI trust semantics — coloured square chips ("Accountability · audit trail"). */
const KINDS = {
  accountability: {
    bg: 'var(--color-primary-soft)',
    fg: 'var(--color-ai-accountability)',
    mark: 'var(--color-ai-accountability)',
    border: '#C7D2FE'
  },
  consent: {
    bg: 'var(--color-ai-consent)',
    fg: 'var(--color-success-fg)',
    mark: 'var(--color-success)',
    border: 'transparent'
  },
  privacy: {
    bg: 'var(--color-ai-privacy)',
    fg: '#334155',
    mark: 'var(--color-text-muted)',
    border: 'transparent'
  },
  transparency: {
    bg: 'var(--color-ai-transparency)',
    fg: '#4A4128',
    mark: 'var(--color-ai-accountability)',
    border: '#EADFB8'
  },
  risk: {
    bg: '#FFF7DB',
    fg: '#7A5B00',
    mark: 'var(--color-ai-risk)',
    border: 'transparent'
  },
  bias: {
    bg: '#FDE7E5',
    fg: '#8A2A22',
    mark: 'var(--color-ai-bias)',
    border: 'transparent'
  }
};

/**
 * AiChip — a labelled trust/interpretability marker used in the "how this was
 * generated" strip and the risk/bias flag list. Square mark, not a round dot.
 */
function AiChip({
  kind = 'accountability',
  children,
  style = {},
  ...rest
}) {
  const k = KINDS[kind] || KINDS.accountability;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: k.bg,
      color: k.fg,
      border: `1px solid ${k.border}`,
      borderRadius: 'var(--radius-lg)',
      padding: '8px 12px',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 'var(--font-weight-semibold)',
      lineHeight: 1.2,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 3,
      background: k.mark,
      flex: '0 0 auto'
    }
  }), children);
}
Object.assign(__ds_scope, { AiChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/AiChip.jsx", error: String((e && e.message) || e) }); }

// components/ai/FindingSection.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  evidence: 'var(--color-secondary)',
  // teal-blue dot
  assumption: 'var(--color-warning)',
  // amber dot
  unknown: 'var(--color-text-muted)',
  // gray dot
  primary: 'var(--color-primary)'
};

/**
 * FindingSection — the Research-sidekick disclosure block.
 * A coloured-dot uppercase header ("EVIDENCE · 3 facts") that expands to reveal
 * the finding body. This is Blue Insights' signature interpretability primitive.
 */
function FindingSection({
  tone = 'evidence',
  label,
  meta = null,
  open = true,
  onToggle,
  children,
  style = {},
  ...rest
}) {
  const dot = TONES[tone] || TONES.evidence;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)',
      background: 'var(--color-canvas)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    "aria-expanded": open,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      width: '100%',
      background: 'transparent',
      border: 'none',
      cursor: onToggle ? 'pointer' : 'default',
      padding: '13px 16px',
      fontFamily: 'var(--font-sans)',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 'var(--radius-pill)',
      background: dot,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 'var(--font-weight-semibold)',
      letterSpacing: 'var(--letter-spacing-label)',
      textTransform: 'uppercase',
      color: 'var(--color-text-primary)'
    }
  }, label), meta != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--color-text-muted)',
      fontWeight: 'var(--font-weight-medium)'
    }
  }, meta) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      color: 'var(--color-text-muted)',
      display: 'inline-flex',
      transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
      transition: 'transform var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })))), open ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 15px',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--color-text-primary)',
      lineHeight: 'var(--line-height-normal)'
    }
  }, children) : null);
}
Object.assign(__ds_scope, { FindingSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/FindingSection.jsx", error: String((e && e.message) || e) }); }

// components/ai/RefBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * RefBadge — the small blue citation number that trails an evidence claim
 * ("…fell 28% vs prior quarter [1]"). Links a claim to a source in scope.
 */
function RefBadge({
  n,
  onClick,
  active = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("sup", {
    style: {
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 15,
      height: 15,
      padding: '0 3px',
      marginLeft: 3,
      borderRadius: 'var(--radius-sm)',
      border: 'none',
      background: active ? 'var(--color-primary)' : 'transparent',
      color: active ? '#fff' : 'var(--color-primary)',
      fontFamily: 'var(--font-sans)',
      fontSize: 10.5,
      fontWeight: 'var(--font-weight-semibold)',
      fontFeatureSettings: "'tnum' 1",
      cursor: onClick ? 'pointer' : 'default',
      verticalAlign: 'baseline',
      ...style
    }
  }, rest), n));
}
Object.assign(__ds_scope, { RefBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/RefBadge.jsx", error: String((e && e.message) || e) }); }

// components/ai/SourceRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SourceRow — a "sources in scope" list item: numbered blue square, name,
 * optional sub-label, and a trailing Preview action.
 */
function SourceRow({
  n,
  name,
  sublabel = null,
  action = 'Preview',
  onAction,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 2px',
      fontFamily: 'var(--font-sans)',
      borderTop: '1px solid var(--color-border)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 22,
      height: 22,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--color-primary)',
      color: '#fff',
      fontSize: 11.5,
      fontWeight: 'var(--font-weight-semibold)',
      fontFeatureSettings: "'tnum' 1",
      flex: '0 0 auto'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 'var(--font-weight-medium)',
      color: 'var(--color-text-primary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, name), sublabel ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--color-text-muted)'
    }
  }, sublabel) : null), action ? /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--color-primary)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 'var(--font-weight-semibold)',
      flex: '0 0 auto'
    }
  }, action) : null);
}
Object.assign(__ds_scope, { SourceRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/SourceRow.jsx", error: String((e && e.message) || e) }); }

// components/ai/StepList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Marker({
  state
}) {
  if (state === 'done') {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--color-primary)',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("polyline", {
      points: "20 6 9 17 4 12"
    })));
  }
  if (state === 'active') {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: 'var(--radius-pill)',
        border: '2px solid var(--color-primary)',
        display: 'inline-flex',
        flex: '0 0 auto'
      }
    });
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--color-border)',
      margin: 5,
      flex: '0 0 auto'
    }
  });
}

/**
 * StepList — the agent "show your working" checklist. Each step is done / active /
 * pending, with an optional trailing note (e.g. "3/3…").
 */
function StepList({
  steps = [],
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), steps.map((s, i) => {
    const state = s.state || 'pending';
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        display: 'inline-flex',
        justifyContent: 'center',
        flex: '0 0 auto'
      }
    }, /*#__PURE__*/React.createElement(Marker, {
      state: state
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: state === 'active' ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)',
        color: state === 'pending' ? 'var(--color-text-muted)' : 'var(--color-text-primary)'
      }
    }, s.label), s.note ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-primary)',
        marginLeft: 2
      }
    }, s.note) : null);
  }));
}
Object.assign(__ds_scope, { StepList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/StepList.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Avatar — circular user badge with initials (or an image). */
function Avatar({
  initials = 'AM',
  src = null,
  size = 34,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: 'var(--radius-pill)',
      background: src ? 'transparent' : 'var(--color-primary)',
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      fontSize: Math.round(size * 0.38),
      fontWeight: 'var(--font-weight-semibold)',
      letterSpacing: '0.02em',
      overflow: 'hidden',
      flex: '0 0 auto',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: initials,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    bg: 'var(--color-surface-2)',
    fg: 'var(--color-text-secondary)',
    dot: 'var(--color-text-muted)'
  },
  primary: {
    bg: 'var(--color-primary-soft)',
    fg: 'var(--color-primary)',
    dot: 'var(--color-primary)'
  },
  success: {
    bg: 'var(--color-success-bg)',
    fg: 'var(--color-success-fg)',
    dot: 'var(--color-success)'
  },
  warning: {
    bg: 'var(--color-warning-bg)',
    fg: 'var(--color-warning-fg)',
    dot: 'var(--color-warning)'
  },
  error: {
    bg: 'var(--color-error-bg)',
    fg: 'var(--color-error-fg)',
    dot: 'var(--color-error)'
  },
  info: {
    bg: 'var(--color-info-bg)',
    fg: 'var(--color-info-fg)',
    dot: 'var(--color-info)'
  }
};

/**
 * Badge — a small pill for status ("Confirmed", "Needs review", "Blocked")
 * and labels. Status is always colour + label (+ optional dot), never colour alone.
 */
function Badge({
  tone = 'neutral',
  dot = false,
  uppercase = false,
  children,
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      fontSize: 11.5,
      fontWeight: 'var(--font-weight-semibold)',
      lineHeight: 1,
      letterSpacing: uppercase ? 'var(--letter-spacing-label)' : 'normal',
      textTransform: uppercase ? 'uppercase' : 'none',
      padding: '4px 9px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.fg,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 'var(--radius-pill)',
      background: t.dot,
      flex: '0 0 auto'
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Blue Insights Button — the primary action control.
 * Neural Blue for the single primary action per view; everything else stays quiet.
 */
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  leadingIcon = null,
  trailingIcon = null,
  onClick,
  type = 'button',
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '6px 12px',
      fontSize: 12.5,
      radius: 'var(--radius-md)',
      gap: 6
    },
    md: {
      padding: '8px 16px',
      fontSize: 13,
      radius: 'var(--radius-md)',
      gap: 7
    },
    lg: {
      padding: '11px 20px',
      fontSize: 14,
      radius: 'var(--radius-md)',
      gap: 8
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: '#fff',
      border: '1px solid transparent'
    },
    secondary: {
      background: 'var(--color-canvas)',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      border: '1px solid transparent'
    },
    outlinePrimary: {
      background: 'var(--color-canvas)',
      color: 'var(--color-primary)',
      border: '1px solid var(--color-primary)'
    },
    danger: {
      background: 'var(--color-error)',
      color: '#fff',
      border: '1px solid transparent'
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      fontFamily: 'var(--font-sans)',
      fontSize: s.fontSize,
      fontWeight: 'var(--font-weight-semibold)',
      lineHeight: 1,
      padding: s.padding,
      borderRadius: s.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      width: fullWidth ? '100%' : 'auto',
      whiteSpace: 'nowrap',
      transition: 'background var(--duration-fast) var(--ease-standard), opacity var(--duration-fast) var(--ease-standard)',
      ...v,
      ...style
    }
  }, rest), leadingIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: '1em',
      height: '1em'
    }
  }, leadingIcon) : null, children, trailingIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: '1em',
      height: '1em'
    }
  }, trailingIcon) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — a square/pill control holding a single icon, optionally with a label.
 * Seen in the top bar ("Reset demo", theme toggle) and panel collapse (»).
 */
function IconButton({
  label = null,
  variant = 'bordered',
  size = 'md',
  ariaLabel,
  onClick,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: 28,
    md: 34,
    lg: 40
  };
  const dim = sizes[size] || sizes.md;
  const variants = {
    bordered: {
      background: 'var(--color-canvas)',
      color: 'var(--color-text-secondary)',
      border: '1px solid var(--color-border)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      border: '1px solid transparent'
    },
    soft: {
      background: 'var(--color-surface-2)',
      color: 'var(--color-text-secondary)',
      border: '1px solid transparent'
    }
  };
  const v = variants[variant] || variants.bordered;
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": ariaLabel || (typeof label === 'string' ? label : undefined),
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      height: dim,
      minWidth: dim,
      padding: label ? '0 12px' : 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 'var(--font-weight-semibold)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      transition: 'background var(--duration-fast) var(--ease-standard)',
      ...v,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 16,
      height: 16
    }
  }, children), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the base surface container. Soft surface fill, 1px border, 12px radius.
 * Optional header row. Use `padding="none"` when embedding tables/panels.
 */
function Card({
  title = null,
  headerRight = null,
  padding = 'md',
  surface = 'surface-1',
  children,
  style = {},
  ...rest
}) {
  const pads = {
    none: 0,
    sm: 'var(--space-3)',
    md: 'var(--space-4)',
    lg: 'var(--space-5)'
  };
  const surfaces = {
    'surface-1': 'var(--color-surface-1)',
    canvas: 'var(--color-canvas)',
    'surface-2': 'var(--color-surface-2)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: surfaces[surface] || surfaces['surface-1'],
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      ...style
    }
  }, rest), title != null || headerRight != null ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '11px 15px',
      background: 'var(--color-surface-2)',
      borderBottom: '1px solid var(--color-border)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-text-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, title), headerRight) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pads[padding]
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/KpiCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DELTA_COLORS = {
  positive: 'var(--color-success)',
  negative: 'var(--color-error)',
  warning: 'var(--color-warning)',
  neutral: 'var(--color-text-muted)'
};

/**
 * KpiCard — labelled metric tile: uppercase label, big tabular number, optional delta.
 * The backbone of the dashboard KPI row.
 */
function KpiCard({
  label,
  value,
  delta = null,
  deltaTone = 'neutral',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--color-surface-1)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)',
      padding: '14px 16px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12.5,
      fontWeight: 'var(--font-weight-medium)',
      color: 'var(--color-text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 26,
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-text-primary)',
      fontFeatureSettings: "'tnum' 1, 'lnum' 1",
      marginTop: 6,
      lineHeight: 1.1
    }
  }, value), delta != null ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 'var(--font-weight-semibold)',
      color: DELTA_COLORS[deltaTone] || DELTA_COLORS.neutral,
      fontFeatureSettings: "'tnum' 1",
      marginTop: 6
    }
  }, delta) : null);
}
Object.assign(__ds_scope, { KpiCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/KpiCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  warning: {
    bg: 'var(--color-warning-bg)',
    fg: 'var(--color-warning-fg)',
    border: 'var(--color-warning)',
    icon: 'var(--color-warning)'
  },
  error: {
    bg: 'var(--color-error-bg)',
    fg: 'var(--color-error-fg)',
    border: 'var(--color-error)',
    icon: 'var(--color-error)'
  },
  info: {
    bg: 'var(--color-info-bg)',
    fg: 'var(--color-info-fg)',
    border: 'var(--color-info)',
    icon: 'var(--color-info)'
  },
  success: {
    bg: 'var(--color-success-bg)',
    fg: 'var(--color-success-fg)',
    border: 'var(--color-success)',
    icon: 'var(--color-success)'
  },
  transparency: {
    bg: 'var(--color-ai-transparency)',
    fg: '#4A4128',
    border: '#EADFB8',
    icon: 'var(--color-ai-accountability)'
  }
};
const ICONS = {
  warning: /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  }),
  error: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12.01",
    y2: "16"
  })),
  info: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12.01",
    y2: "8"
  })),
  success: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22 4 12 14.01 9 11.01"
  })),
  transparency: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12.01",
    y2: "8"
  }))
};

/**
 * Alert — an inline notice banner. `warning` for the sensitive-figure review notice,
 * `transparency` for the beige "How this was generated" explainer.
 */
function Alert({
  tone = 'info',
  title = null,
  showIcon = true,
  children,
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.info;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 10,
      background: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: 'var(--radius-lg)',
      padding: '11px 14px',
      fontFamily: 'var(--font-sans)',
      fontSize: 12.5,
      lineHeight: 'var(--line-height-normal)',
      color: t.fg,
      ...style
    }
  }, rest), showIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      color: t.icon,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, ICONS[tone] || ICONS.info)) : null, /*#__PURE__*/React.createElement("div", null, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--font-weight-semibold)',
      marginBottom: children ? 4 : 0
    }
  }, title) : null, children));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Modal — centered dialog over a dimmed backdrop ("Review before sharing").
 * Title + optional subtitle, close (×), body, and a footer action row.
 */
function Modal({
  open = true,
  title,
  subtitle = null,
  onClose,
  footer = null,
  width = 620,
  children,
  style = {},
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      zIndex: 1000
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      background: 'var(--color-canvas)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
      padding: '20px 24px 16px',
      borderBottom: '1px solid var(--color-border)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-text-primary)'
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-muted)',
      marginTop: 4
    }
  }, subtitle) : null), onClose ? /*#__PURE__*/React.createElement("button", {
    "aria-label": "Close",
    onClick: onClose,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--color-text-muted)',
      padding: 4,
      lineHeight: 0,
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px'
    }
  }, children), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 12,
      padding: '0 24px 22px'
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** ProgressBar — thin determinate/indeterminate track (agent working). */
function ProgressBar({
  value = null,
  height = 4,
  style = {},
  ...rest
}) {
  const indeterminate = value == null;
  const pct = indeterminate ? 40 : Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "progressbar",
    "aria-valuenow": indeterminate ? undefined : pct,
    style: {
      width: '100%',
      height,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--color-surface-2)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${pct}%`,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--color-primary)',
      transition: 'width var(--duration-normal) var(--ease-standard)'
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox — square check with label, boxed variant for confirmation rows
 * ("I've reviewed this and the figures are OK to share").
 */
function Checkbox({
  checked = false,
  onChange,
  label = null,
  boxed = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const box = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 18,
      height: 18,
      flex: '0 0 auto',
      borderRadius: 'var(--radius-sm)',
      border: checked ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
      background: checked ? 'var(--color-primary)' : 'var(--color-canvas)',
      transition: 'background var(--duration-fast) var(--ease-standard)'
    }
  }, checked ? /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })) : null);
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      color: 'var(--color-text-primary)',
      padding: boxed ? '11px 14px' : 0,
      border: boxed ? '1px solid var(--color-primary)' : 'none',
      borderRadius: boxed ? 'var(--radius-md)' : 0,
      background: boxed ? 'var(--color-canvas)' : 'transparent',
      width: boxed ? '100%' : 'auto',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), box, label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Input — single-line text field. */
function Input({
  value,
  defaultValue,
  placeholder = '',
  type = 'text',
  disabled = false,
  leadingIcon = null,
  fullWidth = false,
  onChange,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--color-canvas)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      padding: '8px 12px',
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.6 : 1,
      ...style
    }
  }, leadingIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 16,
      height: 16,
      color: 'var(--color-text-muted)',
      flex: '0 0 auto'
    }
  }, leadingIcon) : null, /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--color-text-primary)'
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Textarea — multi-line input (share summary, "what's wrong with this assumption?"). */
function Textarea({
  value,
  defaultValue,
  placeholder = '',
  rows = 4,
  disabled = false,
  fullWidth = true,
  onChange,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("textarea", _extends({
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    rows: rows,
    disabled: disabled,
    onChange: onChange,
    style: {
      display: 'block',
      width: fullWidth ? '100%' : 'auto',
      boxSizing: 'border-box',
      resize: 'vertical',
      background: 'var(--color-canvas)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 12px',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      lineHeight: 'var(--line-height-normal)',
      color: 'var(--color-text-primary)',
      outline: 'none',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * AppBar — the product top bar: brand mark + breadcrumb on the left, utilities
 * and avatar on the right. The Blue Insights mark is a rounded blue square with "b".
 */
function AppBar({
  product = 'Blue Insights',
  breadcrumb = null,
  right = null,
  initials = 'AM',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '12px 24px',
      background: 'var(--color-canvas)',
      borderBottom: '1px solid var(--color-border)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-primary)',
      color: '#fff',
      fontSize: 17,
      fontWeight: 'var(--font-weight-bold)',
      flex: '0 0 auto'
    }
  }, product.slice(0, 1).toLowerCase()), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-text-primary)'
    }
  }, product), breadcrumb != null ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-border)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--color-text-secondary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, breadcrumb)) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flex: '0 0 auto'
    }
  }, right, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    initials: initials,
    size: 34
  })));
}
Object.assign(__ds_scope, { AppBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blue-insights/RevenueChart.jsx
try { (() => {
// Blue Insights UI kit — the revenue-by-quarter bar chart with the Q3 annotation callout.
const {
  useState
} = React;
const QUARTERS = [{
  q: 'Q1',
  label: '$8.40M',
  value: 8.4,
  tone: 'resting'
}, {
  q: 'Q2',
  label: '$9.60M',
  value: 9.6,
  tone: 'resting'
}, {
  q: 'Q3',
  label: '$8.45M',
  value: 8.45,
  tone: 'active'
}, {
  q: 'Q4',
  label: '$8.90M',
  value: 8.9,
  tone: 'muted'
}];
const MAX = 10;
function RevenueChart({
  onExplain
}) {
  const gridlines = ['$9M', '$6M', '$3M', '$0M'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-surface-1)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)',
      padding: '28px 32px 20px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 380,
      marginLeft: 44
    }
  }, gridlines.map((g, i) => /*#__PURE__*/React.createElement("div", {
    key: g,
    style: {
      position: 'absolute',
      left: -44,
      right: 0,
      top: `${i / 3 * 100}%`,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      textAlign: 'right',
      fontSize: 12.5,
      color: 'var(--color-text-muted)',
      fontFeatureSettings: "'tnum' 1"
    }
  }, g), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--color-border)',
      opacity: 0.7
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      paddingBottom: 0
    }
  }, QUARTERS.map(b => {
    const bg = b.tone === 'active' ? 'var(--color-chart-bar-active)' : b.tone === 'muted' ? 'var(--color-chart-bar-muted)' : 'var(--color-chart-bar)';
    return /*#__PURE__*/React.createElement("div", {
      key: b.q,
      style: {
        width: 96,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: b.tone === 'active' ? 700 : 600,
        color: b.tone === 'active' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        marginBottom: 8,
        fontFeatureSettings: "'tnum' 1"
      }
    }, b.label), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: `${b.value / MAX * 100}%`,
        background: bg,
        borderRadius: '4px 4px 0 0',
        border: b.tone === 'muted' ? '1px dashed var(--color-border)' : 'none',
        boxSizing: 'border-box'
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 24,
      left: '52%',
      width: 340,
      background: 'var(--color-canvas)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: 'var(--color-text-primary)'
    }
  }, "Revenue dipped in Q3"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: 'var(--color-primary)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--color-error)',
      fontFeatureSettings: "'tnum' 1"
    }
  }, "\u221212% QoQ"))), /*#__PURE__*/React.createElement("button", {
    onClick: onExplain,
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--color-primary)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      fontWeight: 700,
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    }
  }, "Explain this"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      marginLeft: 44,
      marginTop: 10
    }
  }, QUARTERS.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.q,
    style: {
      width: 96,
      textAlign: 'center',
      fontSize: 15,
      color: 'var(--color-text-secondary)'
    }
  }, b.q))));
}
window.RevenueChart = RevenueChart;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blue-insights/RevenueChart.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blue-insights/Sidekick.jsx
try { (() => {
// Blue Insights UI kit — the Research sidekick panel and its states.
const {
  useState
} = React;
const DS = window.BlueInsightsDesignSystem_2bb2cd;
const {
  Button,
  IconButton,
  FindingSection,
  AiChip,
  SourceRow,
  RefBadge,
  StepList,
  Alert,
  Badge
} = DS;
const Ico = {
  chevrons: /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "13 17 18 12 13 7"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "6 17 11 12 6 7"
  })),
  share: /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "16 6 12 2 8 6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "2",
    x2: "12",
    y2: "15"
  })),
  lock: /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0 1 10 0v4"
  })),
  bookmark: /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
  })),
  chevDown: /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })),
  back: /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "15 18 9 12 15 6"
  })),
  ext: /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 17L17 7M7 7h10v10"
  }))
};
const eyebrow = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)'
};
const claim = {
  fontSize: 14,
  color: 'var(--color-text-primary)',
  lineHeight: 1.5,
  display: 'flex',
  alignItems: 'baseline',
  gap: 6
};
function PanelHeader({
  onShare,
  onCollapse,
  showShare = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 999,
      background: 'var(--color-primary)',
      marginTop: 6,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--color-text-primary)'
    }
  }, "Research sidekick"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-muted)'
    }
  }, "Show your working"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, showShare ? /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    leadingIcon: Ico.share,
    onClick: onShare
  }, "Share / export") : null, /*#__PURE__*/React.createElement(IconButton, {
    variant: "ghost",
    ariaLabel: "Collapse panel",
    onClick: onCollapse
  }, Ico.chevrons))));
}
function GoalStrip({
  status = 'waiting',
  line
}) {
  const working = status === 'working';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: -6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 999,
      background: 'var(--color-primary)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "AR"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: 999,
      background: working ? 'var(--color-primary)' : 'var(--color-secondary-alt)',
      marginLeft: -6,
      border: '2px solid var(--color-canvas)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--color-text-primary)'
    }
  }, "Shared goal: an answer you can defend.")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13.5,
      fontWeight: 600,
      color: working ? 'var(--color-primary)' : 'var(--color-warning)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: 'currentColor'
    }
  }), working ? 'Agent working' : 'Waiting for you')), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      background: 'var(--color-primary)',
      borderRadius: 999,
      marginTop: 12,
      width: '62%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--color-text-secondary)',
      marginTop: 12
    }
  }, line));
}

// ---- Answer state ----
function AnswerBody({
  onExpandAssumption,
  expandedAssumption,
  onPreview,
  onRerunAssumption
}) {
  const [openEvidence, setOpenEvidence] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      marginBottom: 6
    }
  }, "Summary"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15.5,
      color: 'var(--color-text-primary)',
      lineHeight: 1.55
    }
  }, "Q3 revenue fell 12% QoQ. The drop is concentrated in the EMEA enterprise segment, mostly from delayed renewals.")), /*#__PURE__*/React.createElement(FindingSection, {
    tone: "evidence",
    label: "Evidence",
    meta: "3 facts",
    open: openEvidence,
    onToggle: () => setOpenEvidence(!openEvidence)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...claim,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "EMEA enterprise renewals fell ", /*#__PURE__*/React.createElement("b", null, "28%"), " vs prior quarter ", /*#__PURE__*/React.createElement(RefBadge, {
    n: 1,
    onClick: () => onPreview(1)
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setWhyOpen(!whyOpen),
    style: {
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 12.5,
      fontWeight: 600,
      padding: '3px 10px',
      borderRadius: 6,
      background: whyOpen ? 'var(--color-text-primary)' : 'transparent',
      color: whyOpen ? '#fff' : 'var(--color-text-muted)'
    }
  }, "Why?")), whyOpen ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '2px solid var(--color-primary)',
      paddingLeft: 12,
      marginTop: 8,
      fontSize: 13,
      color: 'var(--color-text-secondary)',
      lineHeight: 1.5
    }
  }, "Compared recognised renewal revenue for the EMEA enterprise segment in Q3 against Q2 in the warehouse rollup; the \u221228% is the raw QoQ delta.") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      ...claim,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "12"), " accounts pushed renewal into Q4 ", /*#__PURE__*/React.createElement(RefBadge, {
    n: 2,
    onClick: () => onPreview(2)
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--color-text-muted)'
    }
  }, "Why?")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...claim,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "New-business bookings were ", /*#__PURE__*/React.createElement("b", null, "flat"), ", not down ", /*#__PURE__*/React.createElement(RefBadge, {
    n: 3,
    onClick: () => onPreview(3)
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--color-text-muted)'
    }
  }, "Why?")))), /*#__PURE__*/React.createElement(FindingSection, {
    tone: "assumption",
    label: "Assumption",
    open: expandedAssumption,
    onToggle: onExpandAssumption
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--color-text-primary)',
      lineHeight: 1.5
    }
  }, "Assumes the ", /*#__PURE__*/React.createElement("b", null, "4"), " renewals still \"in negotiation\" are treated as churned ", /*#__PURE__*/React.createElement(RefBadge, {
    n: 2,
    onClick: () => onPreview(2)
  }), "."), expandedAssumption ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      border: '1px solid var(--color-warning)',
      borderRadius: 'var(--radius-lg)',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      color: 'var(--color-warning)',
      marginBottom: 8
    }
  }, "What's wrong with this assumption?"), /*#__PURE__*/React.createElement("textarea", {
    rows: 3,
    placeholder: "",
    style: {
      width: '100%',
      boxSizing: 'border-box',
      resize: 'vertical',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      padding: 10,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 12,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onExpandAssumption,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--color-text-secondary)'
    }
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: onRerunAssumption
  }, "Re-run with this"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outlinePrimary",
    size: "sm",
    style: {
      borderColor: 'var(--color-warning)',
      color: 'var(--color-warning)'
    },
    onClick: onExpandAssumption
  }, "This doesn't hold")))), /*#__PURE__*/React.createElement(FindingSection, {
    tone: "unknown",
    label: "Unknown",
    open: true,
    onToggle: () => {}
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--color-text-primary)',
      lineHeight: 1.5
    }
  }, "Can't confirm whether Q3 discount changes affected deal size \u2014 that data isn't in your permitted scope."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '10px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-error)',
      display: 'inline-flex'
    }
  }, Ico.lock), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--color-text-primary)'
    }
  }, "Salesforce \u2014 EMEA opportunities"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 700,
      letterSpacing: '.04em',
      color: 'var(--color-error)'
    }
  }, "RESTRICTED"))), /*#__PURE__*/React.createElement(Button, {
    variant: "outlinePrimary",
    size: "sm"
  }, "Request access")))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)',
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 700,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--color-primary)'
    }
  }, "Suggested next check"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--color-text-primary)',
      marginTop: 6
    }
  }, "Compare EMEA renewal cohort to APAC")), /*#__PURE__*/React.createElement(Button, {
    size: "sm"
  }, "Run check")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    leadingIcon: Ico.bookmark,
    style: {
      flex: 1,
      color: 'var(--color-primary)'
    }
  }, "Save as repeatable check"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    trailingIcon: Ico.chevDown
  }, "Re-run")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      margin: '6px 0 4px'
    }
  }, "Sources in scope"), /*#__PURE__*/React.createElement(SourceRow, {
    n: 1,
    name: "Revenue warehouse \u2014 Q3 rollup",
    onAction: () => onPreview(1)
  }), /*#__PURE__*/React.createElement(SourceRow, {
    n: 2,
    name: "Renewals tracker (CSV)",
    onAction: () => onPreview(2)
  }), /*#__PURE__*/React.createElement(SourceRow, {
    n: 3,
    name: "Bookings \u2014 new business",
    onAction: () => onPreview(3)
  })));
}

// ---- Source preview state ----
const SOURCES = {
  1: {
    name: 'Revenue warehouse — Q3 rollup',
    kind: 'Warehouse view · read-only',
    updated: 'Updated 28 Jul 2026, 06:00 UTC',
    note: 'Materialised from fct_revenue nightly. EMEA / enterprise segment, recognised revenue.',
    values: [['EMEA enterprise renewals (Q2)', '$4.10M'], ['EMEA enterprise renewals (Q3)', '$2.95M'], ['Change QoQ', '−28.0%']]
  },
  2: {
    name: 'Renewals tracker (CSV)',
    kind: 'Uploaded file · read-only',
    updated: 'Updated 27 Jul 2026, 18:20 UTC',
    note: 'Per-account renewal status; 12 accounts flagged pushed to Q4, 4 still in negotiation.',
    values: [['Accounts pushed to Q4', '12'], ['Still in negotiation', '4'], ['Closed lost', '1']]
  },
  3: {
    name: 'Bookings — new business',
    kind: 'Warehouse view · read-only',
    updated: 'Updated 28 Jul 2026, 06:00 UTC',
    note: 'New-business bookings by quarter, all segments.',
    values: [['New business (Q2)', '$3.20M'], ['New business (Q3)', '$3.18M'], ['Change QoQ', '−0.6%']]
  }
};
function SourcePreview({
  id,
  onBack
}) {
  const s = SOURCES[id] || SOURCES[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--color-primary)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 700
    }
  }, Ico.back, " Back to answer"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...eyebrow
    }
  }, "Source preview")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 6,
      background: 'var(--color-primary)',
      color: '#fff',
      fontSize: 13,
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto'
    }
  }, id), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--color-text-primary)'
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-muted)'
    }
  }, s.kind))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--color-text-secondary)',
      marginTop: 18
    }
  }, s.updated), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '14px 16px',
      marginTop: 10,
      fontSize: 14,
      color: 'var(--color-text-primary)',
      lineHeight: 1.5
    }
  }, s.note), /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      margin: '20px 0 4px'
    }
  }, "Referenced values"), s.values.map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '11px 0',
      borderTop: i ? '1px solid var(--color-border)' : 'none',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-text-secondary)'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--color-text-primary)',
      fontFeatureSettings: "'tnum' 1"
    }
  }, v))), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    trailingIcon: Ico.ext,
    style: {
      marginTop: 20
    }
  }, "Open source"));
}

// ---- Loading state ----
function LoadingBody() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 20px'
    }
  }, /*#__PURE__*/React.createElement(StepList, {
    steps: [{
      label: 'Analysing the annotation',
      state: 'done'
    }, {
      label: 'Retrieving sources you can access',
      state: 'active',
      note: '3/3…'
    }, {
      label: 'Checking the figures',
      state: 'pending'
    }, {
      label: 'Drafting the explanation',
      state: 'pending'
    }]
  }));
}
function Sidekick({
  mode,
  previewId,
  onShare,
  onCollapse,
  onPreview,
  onBack,
  expandedAssumption,
  onExpandAssumption,
  onRerunAssumption
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 460,
      flex: '0 0 460px',
      borderLeft: '1px solid var(--color-border)',
      background: 'var(--color-canvas)',
      overflowY: 'auto',
      height: '100%'
    }
  }, mode === 'preview' ? /*#__PURE__*/React.createElement(SourcePreview, {
    id: previewId,
    onBack: onBack
  }) : mode === 'loading' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PanelHeader, {
    onShare: onShare,
    onCollapse: onCollapse,
    showShare: false
  }), /*#__PURE__*/React.createElement(GoalStrip, {
    status: "working",
    line: "Retrieving 3 sources you can access\u2026"
  }), /*#__PURE__*/React.createElement(LoadingBody, null)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PanelHeader, {
    onShare: onShare,
    onCollapse: onCollapse
  }), /*#__PURE__*/React.createElement(GoalStrip, {
    status: "waiting",
    line: "Done \u2014 your move."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 12
    }
  }), /*#__PURE__*/React.createElement(AnswerBody, {
    onPreview: onPreview,
    expandedAssumption: expandedAssumption,
    onExpandAssumption: onExpandAssumption,
    onRerunAssumption: onRerunAssumption
  })));
}
window.Sidekick = Sidekick;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blue-insights/Sidekick.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AiChip = __ds_scope.AiChip;

__ds_ns.FindingSection = __ds_scope.FindingSection;

__ds_ns.RefBadge = __ds_scope.RefBadge;

__ds_ns.SourceRow = __ds_scope.SourceRow;

__ds_ns.StepList = __ds_scope.StepList;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.KpiCard = __ds_scope.KpiCard;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.AppBar = __ds_scope.AppBar;

})();
