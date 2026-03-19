const PagePreview = createClass({
  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || '';
    const body = entry.getIn(['data', 'body']) || '';
    const htmlBody = marked.parse(body);

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
