import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled from 'styled-components';

const PostTime = styled.span`
  color: #737373;
`;

const BlogPost = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <>
      <Header />
      <main>
        <h1>{post.frontmatter.title}</h1>
        <PostTime>{post.frontmatter.date}</PostTime>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </main>
      <Footer />
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`

export default BlogPost;