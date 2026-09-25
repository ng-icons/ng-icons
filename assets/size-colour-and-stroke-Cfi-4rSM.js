var e=`---
title: Size, colour and stroke
section: Usage
order: 6
lead: Icons inherit the current font size and text colour by default, so most of the time you do not need to set anything at all.
---

<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">ng-icon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"heroUsers"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2rem"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"var(--brand)"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /> &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">ng-icon</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"featherAirplay"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> strokeWidth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"1.5"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span></code></pre>
<h2 id="setting-defaults-globally">Setting defaults globally</h2>
<p><code>provideNgIconsConfig</code> sets the defaults used by every icon in the application. Add it where you bootstrap, usually <code>main.ts</code>:</p><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { provideNgIconsConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/core'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">bootstrapApplication</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(App, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  providers: [</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    provideNgIconsConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      size: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'1.5em'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      color: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'red'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">});</span></span></code></pre>
<blockquote class="warning">
strokeWidth only has an effect on icon sets drawn with strokes, such as Feather or Lucide. It does nothing on filled sets.
</blockquote>

<h2 id="colouring-with-css-classes">Colouring with CSS classes</h2>
<p>Setting <code>color</code> on the icon, or on anything above it, is enough for most cases. If you use Tailwind, colour icons with <code>text-*</code> utilities, which needs ng-icons&#39; cascade layer declared ahead of Tailwind&#39;s. See <a href="/docs/tailwind">Tailwind CSS</a>.</p>`;export{e as default};