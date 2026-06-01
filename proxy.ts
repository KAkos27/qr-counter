import { type NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const authorization = request.headers.get('authorization')

  if (!authorization?.startsWith('Basic ')) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Dashboard", charset="UTF-8"' },
    })
  }

  const base64 = authorization.slice('Basic '.length)
  const decoded = Buffer.from(base64, 'base64').toString('utf-8')
  const colonIndex = decoded.indexOf(':')
  const user = decoded.slice(0, colonIndex)
  const pass = decoded.slice(colonIndex + 1)

  const expectedUser = process.env.ADMIN_USER
  const expectedPass = process.env.ADMIN_PASS

  if (user !== expectedUser || pass !== expectedPass) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Dashboard", charset="UTF-8"' },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/api/events', '/api/events/:path*'],
}
