import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog'

export const alt = 'Blog Post Preview'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  const formattedDate = new Date(post.meta.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).toUpperCase()

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#09090b',
          color: '#f8fafc',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '80px',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#64748b',
              marginBottom: '24px',
              letterSpacing: '0.05em',
            }}
          >
            {formattedDate}
          </div>
          
          <h1
            style={{
              fontSize: '84px',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '32px',
              letterSpacing: '-0.02em',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {post.meta.title}
          </h1>

          <p
            style={{
              fontSize: '32px',
              lineHeight: 1.4,
              color: '#94a3b8',
              maxWidth: '900px',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {post.meta.description}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#111113',
            borderTop: '1px solid #1e293b',
            padding: '48px 64px 48px 80px',
            flexWrap: 'wrap',
          }}
        >
          {post.meta.tags.slice(0, 8).map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                padding: '10px 24px',
                backgroundColor: '#1e293b',
                borderRadius: '100px',
                border: '1px solid #334155',
                fontSize: '18px',
                fontWeight: 600,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: 1,
                marginRight: '16px',
                marginBottom: '16px',
              }}
            >
              {tag}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#3b82f6',
              display: 'flex',
            }}
          >
            siddhartha.<span style={{ fontStyle: 'italic', fontWeight: 500 }}>work</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
