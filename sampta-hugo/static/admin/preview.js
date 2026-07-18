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
      background: '#fff8db', borderBottom: '1px solid #e6d97a',
      color: '#5c4d00', font: '13px/1.45 system-ui, -apple-system, sans-serif',
      padding: '8px 14px'
    }
  }, 'Editor preview — this narrow pane triggers the site’s mobile layout (e.g. tables stack into cards); the live desktop site is wider. Keep tables and other raw HTML in “Markdown” mode, since the rich-text editor can break them.');
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
CMS.registerPreviewTemplate("pages", PagePreview);
