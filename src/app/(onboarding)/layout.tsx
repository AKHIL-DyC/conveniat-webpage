import type { ReactNode } from 'react';
import React from 'react';

// These styles apply to every route in the application
import '@/app/globals.scss';
import { CeviLogo } from '@/components/svg-logos/cevi-logo';
import { getLocaleFromCookies } from '@/utils/get-locale-from-cookies';
import { Inter, Montserrat } from 'next/font/google';

interface LayoutProperties {
  children: ReactNode;
}

const montserrat = Montserrat({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

/**
 * This is the root layout for the app entrypoint.
 * This root layout is not localized and not in the app design as those cookies
 * are not set on the first rendering of the app.
 *
 * @constructor
 */
const AppEntrypointRootLayout: React.FC<LayoutProperties> = async ({ children }) => {
  const locale = await getLocaleFromCookies();

  return (
    <html className={`${montserrat.className} ${inter.className} overscroll-y-none`} lang={locale}>
      <body className="flex h-screen w-screen flex-col overflow-x-hidden overscroll-y-none bg-[#f8fafc]">
        <div className="absolute top-0 z-[-999] h-screen w-full p-[56px]">
          <CeviLogo className="mx-auto h-full w-full max-w-[384px] opacity-10 blur-md" />
        </div>
        {children}
      </body>
    </html>
  );
};

export default AppEntrypointRootLayout;

// configure the viewport and metadata
export { generateMetadata } from '@/utils/generate-metadata';
export { generateViewport } from '@/utils/generate-viewport';
