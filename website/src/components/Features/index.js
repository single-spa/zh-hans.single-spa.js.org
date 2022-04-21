import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import classnames from 'classnames';

const data = [
  {
    content:
      '让多个框架如 React，Vue.js，Angular 和谐运行在一个 single-spa 构建的应用中',
    imageUrl: 'img/icons/148705-essential-collection/svg/paper-plane.svg',
    title: '框架无限制',
  },
  {
    content: `single-spa 允许新老项目共同存在一个应用中，仅在必要的时候将他们启动`,
    imageUrl: 'img/icons/148705-essential-collection/svg/download.svg',
    title: '应用懒加载',
  },
  {
    content:
      '聚合很多不同技术栈的微应用，支持这些应用敏捷的迭代发展',
    imageUrl: 'img/icons/148705-essential-collection/svg/settings-1.svg',
    title: '前端微服务',
  },
];

export const Features = () => {
  return (
    <section className={styles.features}>
      <div className="container text--center">
        <div className="row">
          {data.map(({ title, content, imageUrl }, idx) => (
            <div key={idx} className={classnames('col col--4', styles.feature)}>
              {imageUrl && (
                <div className="margin-bottom--lg">
                  <img
                    className={styles.featureImage}
                    src={useBaseUrl(imageUrl)}
                    alt={title}
                  />
                </div>
              )}
              <h2>{title}</h2>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
