import * as React from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import './../assests/style/General.scss'
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

const PostArea = styled.div`
  border: 1px solid #e6e6e6;
  margin-bottom: 10px;
  padding: 3%;
  border-radius: 6px;
`;

const PostTime = styled.span`
  color: #737373;
`;

const BlogPage = ({data}) => {
  return (
    <div className='wrapper'>
      <Header />
      <main>
        <title>Blog</title>
        <h1>Blog</h1>
        <h4>Total posts: {data.allMarkdownRemark.totalCount}</h4>
        {
          data.allMarkdownRemark.edges.map(({node}) =>  (
            <PostArea key={node.id}>
              <Link to={node.fields.slug}>
                <h3>
                  {node.frontmatter.title}
                </h3>
              </Link>
              <PostTime>{node.frontmatter.date}</PostTime>
              <p>{node.excerpt}</p>
            </PostArea>
            )
          )
        }
      </main>
      <Footer />
    </div>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark (
      sort: {fields: frontmatter___date order: DESC}
    ) {
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