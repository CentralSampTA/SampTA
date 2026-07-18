/* ============================================================
   SampTA — Master admin CMS preview (core pages)
   ------------------------------------------------------------
   Renders the CMS preview using the SAME markup structure and
   the SAME stylesheet as the live site, so what an editor sees
   matches what visitors get. Kept deliberately consistent with
   the organizers' CMS preview in the site-upcoming-content repo.

   Notes for maintainers:
   - We load the LIVE production stylesheet so preview == live.
   - Core pages render their content directly inside
     <main><div class="container">…</div></main> (see
     layouts/_default/single.html), with the title in a
     .page-header section. We mirror that exactly here.
   - Table/card styling is driven by classes on the raw HTML
     (e.g. .committee-table), so editors must keep that markup
     intact and stay in "Markdown" mode (the rich-text editor
     can mangle raw HTML).
   ============================================================ */

var SITE_CSS = "https://sampta.org/css/style.css";

function normalizeUrl(value) {
  return String(value || '').replace(/[\u0000-\u0020\u007f\s]+/g, '').toLowerCase();
}

function isSafeUrl(value) {
  var normalized = normalizeUrl(value);

  return (
    normalized === '' ||
    normalized.startsWith('#') ||
    normalized.startsWith('/') ||
    normalized.startsWith('./') ||
    normalized.startsWith('../') ||
    normalized.startsWith('http:') ||
    normalized.startsWith('https:') ||
    normalized.startsWith('mailto:') ||
    normalized.startsWith('tel:') ||
    normalized.startsWith('blob:') ||
    normalized.startsWith('data:image/')
  );
}

function sanitizeHtml(html) {
  var template = document.createElement('template');
  template.innerHTML = html;

  template.content.querySelectorAll('script, iframe, object, embed, form, input, button, textarea, select, meta, link, base').forEach(function (node) {
    node.remove();
  });

  template.content.querySelectorAll('*').forEach(function (element) {
    Array.from(element.attributes).forEach(function (attr) {
      var name = attr.name.toLowerCase();
      var value = attr.value;

      if (name.startsWith('on') || name === 'srcdoc') {
        element.removeAttribute(attr.name);
        return;
      }

      if (name === 'style' && /expression\s*\(|url\s*\(\s*['"]?\s*javascript:/i.test(value)) {
        element.removeAttribute(attr.name);
        return;
      }

      if ((name === 'href' || name === 'src' || name === 'xlink:href' || name === 'action' || name === 'formaction') && !isSafeUrl(value)) {
        element.setAttribute(attr.name, '#');
      }
    });
  });

  return template.innerHTML;
}

// A small, clearly-marked editor hint. Inline-styled so it never
// depends on (or is restyled by) the site CSS, and so it can't be
// mistaken for page content.
function editorHint() {
  return h('div', {
    style: {
      position: 'sticky', top: 0, zIndex: 20,
      display: 'flex', gap: '9px', alignItems: 'flex-start',
      background: '#fffaf0', borderBottom: '1px solid #ecd9a8',
      color: '#6b5416', font: '12.5px/1.5 system-ui, -apple-system, sans-serif',
      padding: '9px 76px 9px 16px'
    }
  },
    h('span', { 'aria-hidden': 'true', style: { color: '#b7791f', fontWeight: 700, flex: '0 0 auto' } }, 'ⓘ'),
    h('span', {}, 'Preview — the pane width can differ from a visitor’s screen, so responsive parts (like tables that stack into cards on phones) may look different here than on the live site. Keep tables and other raw HTML in “Markdown” mode, since the rich-text editor can break them.')
  );
}

const PagePreview = createClass({
  render: function () {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || '';
    const subtitle = entry.getIn(['data', 'subtitle']) || '';
    const body = entry.getIn(['data', 'body']) || '';
    const htmlBody = sanitizeHtml(marked.parse(body));

    return h('div', {},
      editorHint(),
      // Mirror layouts/_default/single.html: title in .page-header, then
      // content inside <main><div class="container">.
      h('section', { className: 'page-header' },
        h('div', { className: 'container' },
          h('h1', {}, title),
          subtitle ? h('p', { className: 'subtitle' }, subtitle) : null
        )
      ),
      h('main', {},
        h('div', { className: 'container' },
          h('div', { dangerouslySetInnerHTML: { __html: htmlBody } })
        )
      )
    );
  }
});

// Load the LIVE site stylesheet so the preview matches production.
CMS.registerPreviewStyle(SITE_CSS);

// "pages" is a FILE collection. Decap matches preview templates by FILE name
// (not the collection name), so register PagePreview for each file. If you add
// a new file to the "pages" collection in config.yml, add its name here too.
["pages", "index", "about", "conferences", "committee", "contact", "resources"].forEach(function (name) {
  CMS.registerPreviewTemplate(name, PagePreview);
});
