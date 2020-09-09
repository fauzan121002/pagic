import projectConfig from '/pagic.config.js';
var _a, _b;
export default {
    'prev': {
        "text": "主题",
        "link": "zh-CN/docs/themes.html"
    },
    'next': {
        "text": "部署",
        "link": "zh-CN/docs/deployment.html"
    },
    'sidebar': [
        {
            "text": "介绍",
            "link": "zh-CN/docs/introduction.html",
            "pagePath": "zh-CN/docs/introduction.md"
        },
        {
            "text": "基本用法",
            "link": "zh-CN/docs/usage.html",
            "pagePath": "zh-CN/docs/usage.md"
        },
        {
            "text": "配置文件",
            "link": "zh-CN/docs/config.html",
            "pagePath": "zh-CN/docs/config.md"
        },
        {
            "text": "页面内容",
            "link": "zh-CN/docs/content.html",
            "pagePath": "zh-CN/docs/content.md"
        },
        {
            "text": "_layout.tsx",
            "link": "zh-CN/docs/layout.html",
            "pagePath": "zh-CN/docs/layout.md"
        },
        {
            "text": "主题",
            "link": "zh-CN/docs/themes.html",
            "pagePath": "zh-CN/docs/themes.md"
        },
        {
            "text": "插件",
            "link": "zh-CN/docs/plugins.html",
            "pagePath": "zh-CN/docs/plugins.md"
        },
        {
            "text": "部署",
            "link": "zh-CN/docs/deployment.html",
            "pagePath": "zh-CN/docs/deployment.md"
        },
        {
            "text": "示例网站",
            "link": "zh-CN/docs/demos.html",
            "pagePath": "zh-CN/docs/demos.md"
        },
        {
            "text": "局限性",
            "link": "zh-CN/docs/limitations.html",
            "pagePath": "zh-CN/docs/limitations.md"
        }
    ],
    config: { "root": "/", ...projectConfig, ...(_b = (_a = projectConfig.i18n) === null || _a === void 0 ? void 0 : _a.overrides) === null || _b === void 0 ? void 0 : _b['zh-CN'] },
    'pagePath': "zh-CN/docs/plugins.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "zh-CN/docs/plugins.html",
    'title': "插件",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>插件</h1>\n<p>本章会介绍如何使用插件，以及如何开发插件。</p>\n<p>如果你想查看所有插件的列表及其说明文档，请访问<a href="/plugins/">插件列表</a>。</p>\n<h2 id="%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F">使用方式<a class="anchor" href="#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F">§</a></h2>\n<p>在 <code>pagic.config.ts</code> 中通过 <code>plugins</code> 来配置插件，它的类型是 <code>string[]</code>。</p>\n<p>按照插件的级别可以将插件分为内置插件、官方插件以及第三方插件。</p>\n<h3 id="%E5%86%85%E7%BD%AE%E6%8F%92%E4%BB%B6">内置插件<a class="anchor" href="#%E5%86%85%E7%BD%AE%E6%8F%92%E4%BB%B6">§</a></h3>\n<p>内置插件（也可称为默认插件）是最重要的插件，它们组成了 Pagic 的整个构建过程——换句话说，Pagic 的整个构建过程被拆分为了内置插件。</p>\n<p>内置插件包括：<code>[\'clean\', \'init\', \'md\', \'tsx\', \'script\', \'layout\', \'out\']</code>，Pagic 的构建过程也是按照这个次序来的：</p>\n<ol>\n<li><code>clean</code>: 清空 <code>dist</code> 目录</li>\n<li><code>init</code>: 初始化中间变量（<code>pagePropsMap</code>）</li>\n<li><code>md</code>: 解析 <code>md</code> 文件，更新中间变量</li>\n<li><code>tsx</code>: 解析 <code>tsx</code> 文件，更新中间变量</li>\n<li><code>script</code>: 编译 <code>tsx</code> 文件，生成 <code>pagic.config.js</code>, <code>index.js</code>, <code>*_props.js</code>, <code>*_content.js</code> 等文件</li>\n<li><code>layout</code>: 解析 <code>_layout.tsx</code> 文件，使用 <code>Layout</code> 组件来渲染</li>\n<li><code>out</code>: 生成 HTML 文件，复制静态资源</li>\n</ol>\n<blockquote>\n<p>其实第 1 步之前还有一些步骤：解析 <code>pagic.config.ts</code>、扫描项目目录、找出页面文件和模版文件。但是由于一些运行机制的原因，它们无法被拆分为插件。</p>\n</blockquote>\n<p>内置插件默认就是开启的，你不需要添加配置来启用。</p>\n<p>通过配置以 <code>-</code> 开头的项，可以删除掉默认的插件，比如配置：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'-script\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<p>此配置会删除掉默认的 <code>plugins</code> 中的 <code>script</code> 插件，这样生成的网站是没有 React 相关的 <code>&lt;script&gt;</code> 标签的，也失去了页面间跳转时的 SPA 能力。</p>\n<p>但是对于非常简单的网站——比如只有一个页面——采用此配置是非常合适的。</p>\n<p>删除掉默认插件后再添加第三方插件的话，我们甚至可以完全的更改 Pagic 的构建过程。比如我们可以删除掉 <code>md</code> 插件，然后添加一个第三方的解析 Markdown 的插件，来替换 Markdown 文件的解析过程。</p>\n<h3 id="%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">官方插件<a class="anchor" href="#%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">§</a></h3>\n<p>除了内置插件之外，我们还提供了一些常用的官方插件，它们包括：</p>\n<ul>\n<li><code>sidebar</code>: 侧边栏插件，用于解析 <code>pagic.config.ts</code> 中配置的 <code>sidebar</code>，解析完成后由主题来渲染</li>\n<li><code>prev_next</code>: 上一页下一页插件，会根据 <code>sidebar</code> 的配置决定链接，由主题渲染到页面的文章底部</li>\n<li><code>ga</code>: 谷歌分析插件，该插件会生成一个 <code>ReactElement</code>，由主题插入到页面的 <code>&lt;head&gt;</code> 中</li>\n<li><code>gitalk</code>: Gitalk 插件，给页面添加评论功能，该插件会生成一个 <code>ReactElement</code>，由主题插入到页面的文章底部</li>\n</ul>\n<p>这些插件的配置可以在<a href="./config.html#%E9%A1%B5%E9%9D%A2%E5%86%85%E5%AE%B9">配置文件</a>章节中查看。</p>\n<p>通过配置 <code>plugins</code> 可以添加官方插件。</p>\n<p>需要注意的是，用户配置的 <code>plugins</code> 不会替换掉默认的 <code>plugins</code>，而是以一种规则插入到默认的 <code>plugins</code> 中。</p>\n<p>以 <a href="https://github.com/xcatliu/pagic/blob/master/pagic.config.tsx"><code>pagic.org</code> 的配置</a>为例：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'sidebar\'</span><span class="token punctuation">,</span> <span class="token string">\'prev_next\'</span><span class="token punctuation">,</span> <span class="token string">\'ga\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<p>插入后的 <code>plugins</code> 为：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'clean\'</span><span class="token punctuation">,</span> <span class="token string">\'init\'</span><span class="token punctuation">,</span> <span class="token string">\'md\'</span><span class="token punctuation">,</span> <span class="token string">\'tsx\'</span><span class="token punctuation">,</span> <span class="token string">\'sidebar\'</span><span class="token punctuation">,</span> <span class="token string">\'prev_next\'</span><span class="token punctuation">,</span> <span class="token string">\'ga\'</span><span class="token punctuation">,</span> <span class="token string">\'script\'</span><span class="token punctuation">,</span> <span class="token string">\'layout\'</span><span class="token punctuation">,</span> <span class="token string">\'out\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<h4 id="%E9%82%A3%E4%B9%88%E8%BF%99%E9%87%8C%E6%98%AF%E4%BB%A5%E4%BB%80%E4%B9%88%E8%A7%84%E5%88%99%E6%8F%92%E5%85%A5%E7%9A%84%E5%91%A2%EF%BC%9F">那么这里是以什么规则插入的呢？<a class="anchor" href="#%E9%82%A3%E4%B9%88%E8%BF%99%E9%87%8C%E6%98%AF%E4%BB%A5%E4%BB%80%E4%B9%88%E8%A7%84%E5%88%99%E6%8F%92%E5%85%A5%E7%9A%84%E5%91%A2%EF%BC%9F">§</a></h4>\n<p>原来，每一个<strong>非内置</strong>插件都会有一个 <code>insert</code> 属性，它描述了插入时的位置，它的取值为 <code>before:xxx</code> 或 <code>after:xxx</code>，其中 <code>xxx</code> 为一个插件名。比如：</p>\n<ul>\n<li><code>sidebar</code> 的 <code>insert</code> 属性为 <code>after:tsx</code>，所以它会被插入到 <code>tsx</code> 后面</li>\n<li><code>prev_next</code> 的 <code>insert</code> 属性为 <code>after:sidebar</code>，所以它会被插入到 <code>sidebar</code> 后面</li>\n<li><code>ga</code> 的 <code>insert</code> 属性为 <code>before:script</code>，所以它会被插入到 <code>script</code> 前面</li>\n</ul>\n<p>得益于 Pagic 将构建过程拆分为了一个个内置插件，非内置插件可以很灵活的插入到构建的任何位置。这种设计比创建一些「钩子函数」来得更灵活也更容易理解。</p>\n<h3 id="%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6">第三方插件<a class="anchor" href="#%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6">§</a></h3>\n<p>当使用第三方插件时，数组中的项应为一个完整的入口文件链接：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'<a class="token url-link" href="https://raw.githubusercontent.com/xcatliu/pagic_plugin_custom/master/mod.ts">https://raw.githubusercontent.com/xcatliu/pagic_plugin_custom/master/mod.ts</a>\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<h2 id="%E5%A6%82%E4%BD%95%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6">如何开发插件<a class="anchor" href="#%E5%A6%82%E4%BD%95%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6">§</a></h2>\n<h3 id="%E6%8F%92%E4%BB%B6%E7%9A%84%E7%BB%93%E6%9E%84">插件的结构<a class="anchor" href="#%E6%8F%92%E4%BB%B6%E7%9A%84%E7%BB%93%E6%9E%84">§</a></h3>\n<p>一个插件必须有一个默认导出，类型如下：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">interface</span> <span class="token class-name"><span class="token maybe-class-name">PagicPlugin</span></span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n  insert<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>\n  <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token punctuation">(</span>ctx<span class="token operator">:</span> <span class="token maybe-class-name">Pagic</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token known-class-name class-name">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>其中：</p>\n<ul>\n<li><code>name</code> 是插件的名称，当其他插件需要插入到此插件前后时，会用到此名称</li>\n<li><code>insert</code> 是此插件插入的位置，取值为 <code>before:xxx</code> 或 <code>after:xxx</code>，其中 <code>xxx</code> 为一个插件名</li>\n<li><code>fn</code> 函数是插件的核心逻辑，它接受一个参数 <code>ctx</code>，其为 <code>Pagic</code> 的实例</li>\n</ul>\n<blockquote>\n<p>此命名规则是参考了 <a href="https://deno.land/manual/testing">Deno Testing 的设计</a></p>\n</blockquote>\n<h3 id="fn-%E5%87%BD%E6%95%B0"><code>fn</code> 函数<a class="anchor" href="#fn-%E5%87%BD%E6%95%B0">§</a></h3>\n<p><code>fn</code> 函数是插件的核心逻辑，由于它的参数 <code>ctx</code> 是 <code>Pagic</code> 当前运行的实例，所以它几乎可以做任何事情，包括但不限于：</p>\n<ul>\n<li>读取配置信息（<code>pagic.config.ts</code> 中的信息）</li>\n<li>获取静态资源列表</li>\n<li>获取页面列表</li>\n<li>修改页面的 <code>props</code></li>\n<li>写入文件到 <code>dist</code> 目录中</li>\n<li>导入第三方模块并运行</li>\n</ul>\n<p>比如，我们可以创建一个插件，它给所有页面的 <code>title</code> 加一个前缀：</p>\n<pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token maybe-class-name">PagicPlugin</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'<a class="token url-link" href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a>\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> prependTitle<span class="token operator">:</span> <span class="token maybe-class-name">PagicPlugin</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">\'prepend_title\'</span><span class="token punctuation">,</span>\n  insert<span class="token operator">:</span> <span class="token string">\'after:tsx\'</span><span class="token punctuation">,</span>\n  <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>pagic<span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> pagePath <span class="token keyword">of</span> pagic<span class="token punctuation">.</span><span class="token property-access">pagePaths</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">const</span> pageProps <span class="token operator">=</span> pagic<span class="token punctuation">.</span><span class="token property-access">pagePropsMap</span><span class="token punctuation">[</span>pagePath<span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n      pagic<span class="token punctuation">.</span><span class="token property-access">pagePropsMap</span><span class="token punctuation">[</span>pagePath<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n        <span class="token spread operator">...</span>pageProps<span class="token punctuation">,</span>\n        title<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Prefix </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>pageProps<span class="token punctuation">.</span><span class="token property-access">title</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>\n      <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> prependTitle<span class="token punctuation">;</span>\n</code></pre>\n<p>上例中，</p>\n<ul>\n<li><code>pagic.pagePaths</code> 是<strong>暂存的</strong>所有扫描出的页面路径</li>\n<li><code>pagic.pagePropsMap</code> 是所有页面的 <code>props</code></li>\n</ul>\n<p>我们通过 <code>for of</code> 循环遍历 <code>pagic.pagePaths</code>，并将每个页面的 <code>props</code> 重新赋值，这样就实现了给所有页面添加前缀了。</p>\n<p>除了这两个属性外，<code>pagic</code> 还有很多其他的属性，下面列出常用的 <code>pagic</code> 属性：</p>\n<table>\n<thead>\n<tr>\n<th>属性</th>\n<th>类型</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>config</code></td>\n<td><code>PagicConfig</code></td>\n<td>Pagic <strong>运行时</strong>的配置</td>\n</tr>\n<tr>\n<td><code>pagePaths</code></td>\n<td><code>string[]</code></td>\n<td><strong>暂存的</strong>所有扫描出的页面路径</td>\n</tr>\n<tr>\n<td><code>layoutPaths</code></td>\n<td><code>string[]</code></td>\n<td>所有扫描出的模版（包括主题）</td>\n</tr>\n<tr>\n<td><code>staticPaths</code></td>\n<td><code>string[]</code></td>\n<td><strong>暂存的</strong>所有扫描出的静态资源（包括主题）</td>\n</tr>\n<tr>\n<td><code>pagePropsMap</code></td>\n<td><code>{ [key:string]:any }</code></td>\n<td>所有页面的 <code>props</code></td>\n</tr>\n<tr>\n<td><code>writeFiles</code></td>\n<td><code>{ [key:string]:string }</code></td>\n<td>将会在 <code>out</code> 插件中被写入到 <code>dist</code> 目录中</td>\n</tr>\n<tr>\n<td><code>rebuilding</code></td>\n<td><code>boolean</code></td>\n<td><code>true</code> 表示重新构建，<code>false</code> 表示增量构建</td>\n</tr>\n</tbody>\n</table>\n<p>注意，<code>pagePaths</code> 和 <code>staticPaths</code> 都是<strong>暂存的</strong>，并不是全量的，也就是说，增量构建（构建时运行的 <code>--watch</code> 模式）时它们都只包含增量的文件。</p>\n<h3 id="%E5%8F%82%E8%80%83%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">参考官方插件<a class="anchor" href="#%E5%8F%82%E8%80%83%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">§</a></h3>\n<p>开发一个插件最佳的参考就是官方插件，你可以直接<a href="https://github.com/xcatliu/pagic/tree/master/src/plugins">查看官方插件的源码</a>。</p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "/i18n.js", type: "module" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { crossOrigin: "anonymous", src: "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F">使用方式</a><ol><li><a href="#%E5%86%85%E7%BD%AE%E6%8F%92%E4%BB%B6">内置插件</a></li><li><a href="#%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">官方插件</a><ol></ol></li><li><a href="#%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6">第三方插件</a></li></ol></li><li><a href="#%E5%A6%82%E4%BD%95%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6">如何开发插件</a><ol><li><a href="#%E6%8F%92%E4%BB%B6%E7%9A%84%E7%BB%93%E6%9E%84">插件的结构</a></li><li><a href="#fn-%E5%87%BD%E6%95%B0">fn 函数</a></li><li><a href="#%E5%8F%82%E8%80%83%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6">参考官方插件</a></li></ol></li></ol></nav>'
        } }),
    'language': "zh-CN"
};
