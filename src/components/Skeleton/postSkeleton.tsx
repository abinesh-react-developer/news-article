import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLoading } from "../../context/LoadingContext";

const PostSkeletonLoaderPage: React.FC = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  const loaderItems = Array.from({ length: 9 });

  return (
    <SkeletonTheme baseColor="#ebebeb" highlightColor="#fff">
      <main className="min-h-screen 2xl:pt-6 pt-2 lg:px-10 px-5 max-w-screen-2xl m-auto dark:bg-dark-1">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
          {loaderItems.map((_, index) => (
            <div key={index} className="w-full break-inside-avoid h-fit">
              <a className="block mb-3 rounded-lg overflow-hidden">
                <Skeleton height={196} className="w-full" />
              </a>
              <div className="flex gap-2 items-center mb-2">
                <div className="ownCard-logo">
                  <Skeleton height={39} width={39} />
                </div>
                <div className="flex justify-between basis-full flex-col leading-normal gap-1">
                  <div className="flex justify-between items-center">
                    <a className="text-sm text-black font-medium block w-2/3">
                      <Skeleton />
                    </a>
                    <div className="flex gap-1 flex-nowrap">
                      {[...Array(3)].map((_, i) => (
                        <a key={i} className="w-3 h-3">
                          <Skeleton className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-baseline gap-1 w-2/4">
                      <span className="text-sm font-normal text-grey-3 w-2/4">
                        <Skeleton />
                      </span>
                      <span className="font-light text-sm m-0 text-grey-3 w-2/4">
                        <Skeleton />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-4 font-normal text-grey-3 mb-4 overflow-hidden line-clamp-2">
                <Skeleton count={2} />
              </p>
              <span className="text-yellow-1 rounded text-xs w-fit block leading-tight w-1/3">
                <Skeleton />
              </span>
            </div>
          ))}
        </section>
      </main>
    </SkeletonTheme>
  );
};

export default PostSkeletonLoaderPage;
