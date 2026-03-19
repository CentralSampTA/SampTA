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

const PagePreview = createClass({
  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || '';
    const body = entry.getIn(['data', 'body']) || '';
    const htmlBody = sanitizeHtml(marked.parse(body));

    return h('div', { className: 'container', style: { padding: '2rem' } },
      h('article', { className: 'content-body' },
        h('h1', {}, title),
        h('div', { dangerouslySetInnerHTML: { __html: htmlBody } })
      )
    );
  }
});

// Load the actual site CSS into the preview pane for pixel-perfect accuracy
CMS.registerPreviewStyle("/css/style.css");
CMS.registerPreviewTemplate("pages", PagePreview);
