const path = require('path');
const repoUrl = 'https://github.com/single-spa/zh-hans.single-spa.js.org';
const libRepoUrl = 'https://github.com/single-spa/single-spa';

const versions = require('./versions.json');

module.exports = {
  title: 'single-spa',
  tagline: '一个基于 javascript 的微前端框架',
  url: 'https://single-spa.github.io/zh-hans.single-spa.js.org',
  baseUrl: '/',
  projectName: 'single-spa',
  favicon: 'img/logo-blue-favicon.ico',
  organizationName: 'single-spa',
  customFields: {
    repoUrl,
    libRepoUrl,
    // replace this with own!
    githubTokenAccess: '57317aeaa31d4221296b9252c61b355bb2a98f6c',
  },
  scripts: [
    'https://unpkg.com/vanilla-back-to-top@7.2.1/dist/vanilla-back-to-top.min.js',
    'https://cdn.jsdelivr.net/npm/racial-equity-banner@1.0.3/racial-equity-banner-bottom.js',
    '/js/index.js',
  ],
  themeConfig: {
    algolia: {
      apiKey: '113e711177d63ab1ff28ef858cbcffa5',
      indexName: 'single_spa',
      algoliaOptions: {},
    },
    footer: {
      logo: {
        alt: 'single-spa',
        src: 'img/logo-white-bgblue.svg',
      },
      copyright: `Copyright © ${new Date().getFullYear()} single-spa.`,
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '常用问答',
              to: 'docs/faq/',
            },
            {
              label: '快速开始',
              to: 'docs/getting-started-overview/',
            },
            {
              label: 'API 文档',
              to: 'docs/api/',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: '用户展示',
              to: 'users/',
            },
            {
              label: '贡献者',
              to: 'contributors/',
            },
            {
              label: '联系我们',
              href:
                'https://join.slack.com/t/single-spa/shared_invite/enQtODAwNTIyMzc4OTE1LWUxMTUwY2M1MTY0ZGMzOTUzMGNkMzI1NzRiYzYwOWM1MTEzZDM1NDAyNWM3ZmViOTAzZThkMDcwMWZmNTFmMWQ',
            },
            {
              label: '推特',
              href: 'https://twitter.com/Single_spa/',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'GitHub',
              href: libRepoUrl,
            },
            {
              label: '捐赠',
              href: 'https://opencollective.com/single-spa',
            },
            {
              label: '博客',
              to: 'blog/',
            },
          ],
        },
      ],
    },
    image: 'img/docusaurus.png',
    navbar: {
      title: 'single-spa',
      logo: {
        alt: 'single-spa Logo',
        src: 'img/logo-white-bgblue.svg',
      },
      links: [
        {
          to: 'versions',
          label: versions[0],
          style: {
            whiteSpace: 'nowrap',
            padding: '0.25rem 0.5rem 0.2rem 0.25rem',
            fontSize: 'calc(0.9 * var(--ifm-font-size-base))',
            textDecoration: 'underline',
          },
        },
        { to: 'docs/faq/', label: '常见问答' },
        { to: 'docs/', label: '文档' },
        { to: 'help/', label: '帮助' },
        { to: 'blog/', label: '博客' },
        { href: 'https://opencollective.com/single-spa', label: '捐赠' },
        { href: 'https://github.com/single-spa/single-spa', label: 'GitHub' },
        { to: 'languages', label: '简Жहि Languages'},
      ],
    },
    googleAnalytics: {
      trackingID: 'UA-138683004-1',
    },
    prismTheme: require('prism-react-renderer/themes/vsDark'),
  },
  plugins: [
    [
      path.resolve(__dirname, './src/plugins/docusaurus-plugin-redirects'),
      {
        excludedPaths: ['/'],
      },
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.json'),
          editUrl: `${repoUrl}/blob/master/website/`,
          // sidebarCollapsible: false,
        },
        theme: {
          customCss: require.resolve('./static/css/custom.css'),
        },
      },
    ],
  ],
};
