import * as React from 'react'
import Header from './../components/Header'
import './../assests/style/General.scss'
import { Link, graphql } from 'gatsby';

const BlogPage = ({data}) => {
  return (
    <>
      <Header />
      <main>
        <title>Blog</title>
        <h1>Blog</h1>
        <h4>Total posts: {data.allMarkdownRemark.totalCount}</h4>
        {
          data.allMarkdownRemark.edges.map(({node}) =>  (
            <div key={node.id}>
              <Link to={node.fields.slug}>
                <h3>
                  {node.frontmatter.title}
                  <span>
                    — {node.frontmatter.date}
                  </span>
                </h3>
              </Link>
              <p>{node.excerpt}</p>
            </div>
            )
          )
        }
      </main>
    </>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

export default BlogPage;