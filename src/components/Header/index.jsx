import React, { useCallback, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { ThemeContext } from '@/context/ThemeContext';
import ImageComponent from '../Image';

const Header = () => {
  const themeContext = useContext(ThemeContext);
  const { theme, toggleTheme } = themeContext;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchKey = searchParams.get('keyword');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(searchKey || '');
  }, [searchKey]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`${pathname}?${createQueryString('keyword', search)}`);
  };

  const handleHome = () => {
    router.push('/');
    removeDetail();
  };

  const removeDetail = useCallback(() => {
    if (pathname.includes('article')) {
      localStorage.removeItem('article');
    }
  }, [pathname]);

  return (
    <div className="sticky z-50 top-0">
      <Disclosure as="nav" className="bg-white h-20 border-b border-gray-2 dark:bg-dark-4 dark:border-dark-1">
        {() => (
          <>
            <div className="lg:px-10 px-5 py-[13px]">
              <div className="relative flex items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start gap-4">
                  <Link
                    href="/"
                    prefetch
                    className="text-2xl text-black font-medium dark:text-light-1 cursor-pointer flex gap-[5px] items-center"
                    onClick={handleHome}
                  >
                    NEWS
                  </Link>

                  {/* Search Bar */}
                  <div className="hidden sm:flex justify-center w-full">
                    <form className="w-full max-w-96 relative flex items-center" onSubmit={handleSearch}>
                      <input
                        type="text"
                        placeholder="Search company"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="shadow-1 border border-gray-2 p-4 rounded-3xl h-12 w-full focus-visible:outline-none text-sm font-light placeholder:text-grey-1 text-black dark:text-white dark:bg-dark-3 dark:border-dark-1 dark:placeholder:text-light-2"
                      />
                      <button
                        type="submit"
                        className="absolute border-none rounded-full bg-blue-1 p-2 w-8 h-8 grid place-items-center right-2 hover:bg-[#1f6ffd]"
                      >
                        <ImageComponent src="/img/search.svg" alt="Search" width={12} height={12} />
                      </button>
                    </form>
                  </div>

                  <div className="flex items-center space-x-6">
                    {/* Dark Mode Toggle */}
                    <button
                      className="relative overflow-hidden w-10 h-10 grid place-items-center rounded-3xl bg-gray-1 dark:bg-dark-2 dark:hover:bg-[#232324] hover:bg-[#ebebeb]"
                      onClick={toggleTheme}
                    >
                      {theme === 'dark' ? (
                        <ImageComponent src="/img/light-mode.svg" alt="darkmode" width={20} height={20} />
                      ) : (
                        <ImageComponent src="/img/dark-mode.svg" alt="lightmode" width={20} height={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Search Panel */}
            <Disclosure.Panel className="sm:hidden bg-white dark:bg-dark-3">
              <div className="space-y-1 p-5">
                <form className="w-full relative flex items-center" onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search company"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="shadow-1 border border-gray-2 p-4 rounded-3xl h-12 w-full focus-visible:outline-none text-sm font-light placeholder:text-grey-1 text-black dark:text-white dark:bg-dark-3 dark:border-dark-1 dark:placeholder:text-light-2"
                  />
                  <button type="submit" className="absolute border-none rounded-full bg-blue-1 p-2 w-8 h-8 grid place-items-center right-2">
                    <ImageComponent src="/img/search.svg" alt="Search" height={12} width={12} />
                  </button>
                </form>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Header;
