import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Header from '../components/Header'
import Footer from '../components/Footer'
import './../assests/style/General.scss'

// Components
const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `共有 ${totalCount} 篇關於「${tag}」的文章`;
  
  return (
    <div className='wrapper'>
      <Header />
      <main>
        <h1>{tagHeader}</h1>
        <ul>
          {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
            <Link to={slug}>{title}</Link>
            </li>
          )
          })}
        </ul>
        {/*
                This links to a page that does not yet exist.
                You'll come back to it!
                */}
        <Link to="/tags">All tags</Link>
      </main>
      <Footer />
    </div>
  )
}
Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
export default Tags
export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`