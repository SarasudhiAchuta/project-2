/**
 * CssToolsPanel.jsx
 * Milestone 4 — 5-tool CSS workspace grid.
 */
import GradientGenerator    from './GradientGenerator'
import BoxShadowBuilder     from './BoxShadowBuilder'
import BorderRadiusEditor   from './BorderRadiusEditor'
import TextShadowGenerator  from './TextShadowGenerator'
import TransitionGenerator  from './TransitionGenerator'

export default function CssToolsPanel() {
  return (
    <section
      id="panel-css-tools"
      role="tabpanel"
      aria-labelledby="tab-css-tools"
      className="py-8"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">CSS Tools</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Five live generators — tweak controls and copy production-ready CSS instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
        <GradientGenerator />
        <BoxShadowBuilder />
        <BorderRadiusEditor />
        <TextShadowGenerator />
        <TransitionGenerator />
      </div>
    </section>
  )
}
