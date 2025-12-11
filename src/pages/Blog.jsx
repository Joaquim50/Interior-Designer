import React from 'react'
import Section from '../components/Section'

const Blog = () => {
    return (
        <div className="page-wrapper">
            <Section className="section-alt">
                <div className="container text-center">
                    <h1 className="heading-xl">Our Blog</h1>
                    <p className="text-lead" style={{ margin: '0 auto' }}>
                        Read our latest news and design insights.
                    </p>
                </div>
            </Section>
        </div>
    )
}

export default Blog
