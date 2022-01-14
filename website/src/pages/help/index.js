import React from 'react';
import Markdown from 'markdown-to-jsx';
import Layout from '@theme/Layout';
import supportLinks from '@site/src/data/help';

function Help() {
  return (
    <Layout title="Help">
      <div className="container container--fluid padding-horiz--xl margin-top--lg">
        <h1>需要帮助？</h1>
        <p>
          你可以通过下面的方式获取关于single-spa的帮助
        </p>

        <div className="row text--center">
          {supportLinks.map(({ title, content }, idx) => (
            <div
              key={idx}
              className="col col--6 margin-vert--md padding-horiz--xl">
              <h2>{title}</h2>
              <p>
                <Markdown>{content}</Markdown>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Help;
