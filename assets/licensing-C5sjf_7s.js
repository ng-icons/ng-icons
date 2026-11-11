var e=`---
title: Licensing
section: Icon sets
order: 15
lead: Each icon set carries the licence of the project it comes from. The core package is MIT.
---

<p><code>@ng-icons/core</code> is MIT licensed. Every icon set package inherits the licence of the project its SVGs come from, which is not always the same thing.</p><p>The licence for each set is listed on the <a href="/iconsets">icon sets page</a> and on every icon in the browser, so it is always visible next to the package name you are about to install.</p><blockquote>
<p>Check the licence of a set before shipping it. Attribution requirements differ between CC0, CC BY and Apache licensed sets, and one set (Iconsax) has its own custom terms.</p></blockquote>
<h2 id="primeicons-is-frozen">PrimeIcons is frozen</h2>
<p><code>@ng-icons/primeicons</code> is intentionally pinned to <code>primeicons@7.0.0</code> and will not receive further icon updates.</p><p>PrimeTek released <code>primeicons</code> 8.0.0 and later under the PrimeUI Community/Commercial License, which prohibits redistributing the icons. <code>7.0.0</code> is the last MIT licensed release, and PrimeTek has confirmed that existing MIT releases stay MIT. The package keeps working as it does today.</p><p>For new icons use <a href="/browse?sets=openng-icons"><code>@ng-icons/openng-icons</code></a>, the MIT licensed continuation built from <a href="https://github.com/openng-org/icons"><code>@openng/icons</code></a>. It has the same icons with an <code>openng</code> prefix instead of <code>prime</code>, so <code>primeAddressBook</code> becomes <code>openngAddressBook</code>, and both packages can be installed side by side while you migrate. See <a href="https://github.com/ng-icons/ng-icons/issues/268">ng-icons#268</a> for the discussion.</p>`;export{e as default};