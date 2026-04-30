import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Siddhartha Katiyar | Developer Blog'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #18181b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #18181b 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(9, 9, 11, 0.8)',
            padding: '60px 80px',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              borderRadius: '60px',
              backgroundColor: '#1e293b',
              border: '2px solid #3b82f6',
              marginBottom: '40px',
              fontSize: '48px',
              fontWeight: 700,
              color: '#f8fafc',
            }}
          >
            SK
          </div>
          <h1
            style={{
              fontSize: '84px',
              fontWeight: 800,
              color: '#f8fafc',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            Siddhartha Katiyar
          </h1>
          <p
            style={{
              fontSize: '32px',
              fontWeight: 500,
              color: '#94a3b8',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            Software Engineer specializing in infrastructure and security. 
          </p>
          <div
            style={{
              marginTop: '40px',
              padding: '12px 32px',
              backgroundColor: '#3b82f6',
              borderRadius: '100px',
              fontSize: '24px',
              fontWeight: 600,
              color: '#ffffff',
            }}
          >
            siddhartha.work
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
