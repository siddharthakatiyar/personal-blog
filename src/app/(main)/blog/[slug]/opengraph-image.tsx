import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog'

export const alt = 'About Siddhartha Katiyar'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #18181b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #18181b 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '4px',
                backgroundColor: '#3b82f6',
                borderRadius: '2px',
              }}
            />
            <span
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#94a3b8',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Writing
            </span>
          </div>
          <h1
            style={{
              fontSize: '84px',
              fontWeight: 700,
              color: '#f8fafc',
              lineHeight: 1.1,
              marginBottom: '40px',
              maxWidth: '900px',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {post.meta.title}
          </h1>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '80px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #1e293b',
            paddingTop: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '32px',
                backgroundColor: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #334155',
                fontSize: '24px',
                fontWeight: 600,
                color: '#f8fafc',
              }}
            >
              SK
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontSize: '28px', fontWeight: 600, color: '#f8fafc' }}>
                Siddhartha Katiyar
              </span>
              <span style={{ fontSize: '20px', color: '#64748b' }}>
                Software Engineer
              </span>
            </div>
          </div>
          <span style={{ fontSize: '24px', fontWeight: 500, color: '#3b82f6' }}>
            siddhartha.work
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
