import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from '../components/post'
import { InstantSearch, Hits, SearchBox } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

class BlogIndex extends React.Component {
  constructor () {
    super()
    this.state = {
      searchClient: algoliasearch('NTWU0EOBD1', 'f5b4f18b6bd0688bf560feff0699fbdc')
    }
  }
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    
    return (
      <InstantSearch indexName="blog2" searchClient={this.state.searchClient}>
        <Layout location={this.props.location} title={siteTitle}>
          <SEO
            title="All posts"
            keywords={[`blog`, `gatsby`, `javascript`, `react`]}
          />
          <Bio />
          <SearchBox />
          <Hits hitComponent={Post}/>
          
        </Layout>
      </InstantSearch>

    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
