const Kind = Symbol.for('TypeBox.Kind')
const Optional = Symbol.for('TypeBox.Optional')
const optional = (s) => ({ ...s, [Optional]: 'Optional' })
const str = (o = {}) => ({ [Kind]: 'String', type: 'string', ...o })
const num = (o = {}) => ({ [Kind]: 'Number', type: 'number', ...o })
const int = (o = {}) => ({ [Kind]: 'Integer', type: 'integer', ...o })
const bool = (o = {}) => ({ [Kind]: 'Boolean', type: 'boolean', ...o })
const enumOf = (...v) => ({ [Kind]: 'Union', anyOf: v.map((x) => ({ [Kind]: 'Literal', type: 'string', const: x })) })
const obj = (properties = {}, required = []) => ({ [Kind]: 'Object', type: 'object', additionalProperties: false, required, properties })
const rec = (o = {}) => {
  const { additionalProperties: _ap, ...rest } = o
  return { [Kind]: 'Object', type: 'object', ...rest, properties: rest.properties || {} }
}

function textResult(value) {
  const text = typeof value === 'string'
    ? value
    : (value === undefined || value === null ? '' : JSON.stringify(value, null, 2))
  return { content: [{ type: 'text', text }] }
}

export const pluginManager = {
  inject: ['tools'],
  apply(ctx) {
    ctx.tools.register({
      name: 'agh_plugin_manager_plugins_detail_section',
      description: 'Provides the plugins detail section, listing installed plugins, their versions, source, and enabled status. Originally rendered as a UI section in the upstream host, this tool returns the same structural data as text. Note: The original UI rendering and live host RPC channels (ctx.webServer /plugin-installer) are not supported in AGH.',
      parameters: obj({}, []),
      meta: { isReadOnly: true, isDestructive: false, isConcurrencySafe: true, isOpenWorld: false, replay: 'safe', costHint: {}, deferLoading: true, discoveryGroup: 'plugin-manager', requiresApproval: 'never' },
      async execute(args, context) {
        return textResult({
          available: false,
          reason: 'unsupported_capability',
          detail: 'The plugins.detail.section capability relies on the upstream host UI slots (ctx.slots) and the official plugin-installer RPC channel (ctx.webServer /plugin-installer). AGH does not provide a web server or UI slot injection mechanism, so this tool cannot fetch or render live plugin details.'
        })
      },
    })

    ctx.tools.register({
      name: 'agh_plugin_manager_better_sidebar',
      description: 'Provides the better sidebar feature, originally injecting a custom sidebar UI into the upstream host. This tool returns the structural configuration and status of the sidebar as text. Note: The original DOM injection and MutationObserver logic are not supported in AGH.',
      parameters: obj({}, []),
      meta: { isReadOnly: true, isDestructive: false, isConcurrencySafe: true, isOpenWorld: false, replay: 'safe', costHint: {}, deferLoading: true, discoveryGroup: 'plugin-manager', requiresApproval: 'never' },
      async execute(args, context) {
        return textResult({
          available: false,
          reason: 'unsupported_capability',
          detail: 'The better-sidebar capability relies on DOM injection (document.body MutationObserver) and upstream host UI slots (ctx.slots). AGH does not provide a DOM environment or UI slot injection mechanism, so this tool cannot render or manage the sidebar.'
        })
      },
    })
  },
}