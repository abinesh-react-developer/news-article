import React, { useEffect, useState } from 'react';
import ImageComponent from '../Image';
import Link from 'next/link';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import instance from '../../../interceptor';
import { useRouter } from 'next/router';
import { NewsArticleApi } from '../api/article';
import NoDataFound from '@/utility/NoDataFound';

function PostList({ postList, slug }) {
    const router = useRouter();
    const keyword = router?.query?.keyword;

    const [articles, setArticles] = useState(postList || []);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = async () => {
        try {
            const endpoint = keyword
                ? `everything?q=${keyword}&page=${page}&pageSize=10`
                : `top-headlines?category=${slug}&page=${page}&pageSize=10`;

            const result = await instance.get(endpoint);

            if (result?.data?.status === 'ok') {
                setArticles((prev) => [...prev, ...result?.data?.articles]);
                setPage((prev) => prev + 1);
                setHasMore(result?.data?.articles.length === 10); 
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching more data:', error);
            setHasMore(false);
        } finally {

        }
    };

    useEffect(() => {
        if (keyword) {
            NewsArticleApi(setArticles, keyword);
        }
    }, [keyword]);

    const handleDetail = (post) => {
        localStorage.setItem("article", JSON.stringify(post));
    }

    return (
        <main className="min-h-screen 2xl:pt-6 pt-2 lg:px-10 px-5 max-w-screen-2xl m-auto dark:bg-dark-1">
            {slug && (
                <h1 className="text-black text-[26px] leading-normal pt-6 dark:text-light-1 capitalize">
                    {slug}
                </h1>
            )}
            {articles?.length > 0 ? <>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4 className="text-center text-gray-500 mt-8">Loading more articles...</h4>}
                    endMessage={
                        <p className="text-center text-gray-500 mt-8">
                            <b>No more articles to load</b>
                        </p>
                    }
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 pt-6">
                        {articles.map((post, index) => (
                            <div onClick={(e) => handleDetail(post)} key={post?.url || index} className="flex flex-col gap-4 group">
                                <Link href={`/article/${post?.title || '#'}`}>
                                    <ImageComponent
                                        src={post?.urlToImage}
                                        width={500}
                                        height={500}
                                        alt="Article Image"
                                        className="w-full rounded-lg c-image"
                                    />
                                </Link>
                                <div className="w-full">
                                    <p className="group-hover:text-activeblue-500 group-hover:underline text-black text-lightxl lg:text-2xl font-medium leading-7 line-clamp-2">
                                        {post?.title}
                                    </p>
                                    <p className="text-gray-500 font-light text-lightbase lg:text-base leading-5 mb-4 mt-2 line-clamp-3">
                                        {post?.description}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-black text-sm font-normal">{post?.author || 'Unknown'}</h3>
                                            <p className="text-gray-500 text-xs font-light">
                                                {moment(post?.publishedAt).format('MMM DD, YYYY')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </> : <>
                <NoDataFound />
            </>}
        </main>
    );
}

export default PostList;
