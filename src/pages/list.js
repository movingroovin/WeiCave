import React from 'react';
import { graphql } from 'gatsby';

const FileList = ({data}) => {
  console.log(data);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>名稱</th>
            <th>新增時間</th>
            <th>路徑</th>
            <th>檔案大小</th>
          </tr>
        </thead>
        <tbody>
          {data.allFile.edges.map(({ node }, index) => (
            <tr key={index}>
              <td>{node.name}</td>
              <td>{node.birthTime}</td>
              <td>{node.relativePath}</td>
              <td>{node.prettySize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          name
          birthTime
          relativePath
          prettySize
        }
      }
    }
  }
`;

export default FileList;