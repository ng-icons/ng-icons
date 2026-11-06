var e=`---
title: Logging
section: Configuration
order: 12
lead: By default, warnings and errors are logged to the console, most commonly when an icon is used without being registered.
---

<p>For stricter checks, enable the exception logger. It throws an error instead of logging a warning, so a missing icon fails loudly in development and in tests.</p><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { provideNgIconsConfig, withExceptionLogger } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/core'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">bootstrapApplication</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(App, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  providers: [</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">provideNgIconsConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({}, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">withExceptionLogger</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">())],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">});</span></span></code></pre>
`;export{e as default};