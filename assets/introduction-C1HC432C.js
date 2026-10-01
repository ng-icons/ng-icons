var e=`---
title: Introduction
section: Getting started
order: 1
lead: Angular Icons is the all-in-one icon library for Angular. It lets you use icons from dozens of icon sets through a single component, with more than 100,000 icons available.
---

<p>Every icon set is published as its own package. You install the core package once, add the sets you want, and register the individual icons you use. Nothing you do not register reaches your bundle.</p><h2 id="how-it-fits-together">How it fits together</h2>
<p>The core package provides the <code>NgIcon</code> component and the functions used to register icons and configure defaults. Icon set packages export each icon as a named constant containing its SVG.</p><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { NgIcon, provideIcons } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/core'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { featherAirplay } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/feather-icons'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { heroUsers } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> '@ng-icons/heroicons/outline'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span></code></pre>
<blockquote>
<p>Icons render as inline SVG. There are no icon fonts, sprite sheets or network requests unless you choose to load icons dynamically.</p></blockquote>
<h2 id="browser-support">Browser support</h2>
<p>Angular Icons relies on modern browser features and is designed to work on evergreen browsers. Older browsers such as IE11 are not supported.</p>`;export{e as default};