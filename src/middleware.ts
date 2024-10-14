import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// import { CTScanMiddleware, HospitalMiddleware, JanitorialMiddleware, MEPGMiddleware, PMUMiddleware, SecurityMiddleware } from 'utils/user';

const matches = [
  '/',

];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    cookieName: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : "next-auth.session-token",
  });

  if (!session && matches.includes(path)) {
    return NextResponse.redirect(new URL('/authentication/login', req.url));
  } else if (session && path === '/authentication/login') {
    return NextResponse.redirect(new URL('/', req.url));
  } else if (session) {
    // if (session.role === 'PMU' && PMUMiddleware.includes(path)) {
    //   return NextResponse.next();
    // }

    // if (session.role === 'HospitalRepAdminOfficer' && HospitalMiddleware.includes(path)) {
    //   return NextResponse.next();
    // }

    // if (session.role === UserRole.User) {
    //   if (session.type === 'Janitorial' && JanitorialMiddleware.includes(path)) {
    //     return NextResponse.next();
    //   }

    //   if (session.type === 'Security' && SecurityMiddleware.includes(path)) {
    //     return NextResponse.next();
    //   }

    //   if (session.type === 'CTScan' && CTScanMiddleware.includes(path)) {
    //     return NextResponse.next();
    //   }

    //   if (session.type === 'MEPG' && MEPGMiddleware.includes(path)) {
    //     return NextResponse.next();
    //   }
    // }

    // if (matches.includes(path)) {
    //   return NextResponse.redirect(new URL('/403', req.url));
    // }
  }

  return NextResponse.next();
}
